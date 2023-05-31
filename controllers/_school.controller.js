/* school crud */
const path = require('path');
const rawQueries = require('../config/raw.queries');
const asyncHandler = require('../middlewares/_asyncHandler');
const { QueryTypes } = require('sequelize');

const AppError = require('../utils/_appError');
const PQ = require('../utils/_features');
const factory = require('./factory');
const { School } = require('../databaseModels/AllModels');
exports.getAll = asyncHandler(async (req, res, next) => {
  const { prepared_statement } = new PQ(req.models.School, req.query).exec();

  const schools = await prepared_statement;
  res.status(200).json({
    status: 'success',
    data: schools,
    // pagination,
  });
});

exports.createSchool = factory.createOne(School);

exports.updateSchool = factory.updateOne(School);

exports.deleteSchool = factory.deleteOne(School);
// exports.getSchool = factory.getOne(School);

exports.getSchool = asyncHandler(async (req, res, next) => {
  const school = await req.models.School.findByPk(req.params.id, {
    include: [{ model: req.models.Hutulbur }],
  });
  const data2 = await req.sequelize.query(rawQueries.schoolMergejilCount, {
    replacements: [req.params.id],
    type: QueryTypes.SELECT,
  });
  if (!school) {
    throw new AppError(
      `Сургуулийн мэдээлэл олдсонгүй. Буруу ID ==> -- ${req.params.id} ирлээ`,
      404
    );
  }
  res.status(200).json({
    status: 'success',
    data: school,
    data2,
  });
});

exports.uploadSchoolPhoto = asyncHandler(async (req, res, next) => {
  if (!req.files.file) {
    throw new AppError('Та файл оруулах ёстой', 400);
  }
  const file = req.files.file;
  const school = await req.models.School.findByPk(req.params.id);
  if (!school) {
    throw new AppError(`${req.body} ${school}`, 404);
  }

  if (!file.mimetype.startsWith('image')) {
    throw new AppError('Та зураг оруулах ёстой', 400);
  }
  if (file.size > process.env.MAX_UPLOAD_SIZE) {
    throw new AppError('Зургийн хэмжээ хэтэрлээ', 400);
  }
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_FOLDER}/${file.name}`, (err) => {
    if (err) {
      throw new AppError('Файлыг хуулах явцад алдаа гарлаа.', 500);
    }
  });
  school.img = file.name;
  school.save();
  res.status(201).json({
    status: 'success',
    data: file.name,
  });
});

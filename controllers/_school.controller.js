/* school crud */
const path = require('path');
const rawQueries = require('../config/raw.queries');
const asyncHandler = require('../middlewares/_asyncHandler');
const { QueryTypes } = require('sequelize');

const AppError = require('../utils/_appError');
const PQ = require('../utils/_features');

exports.getAll = asyncHandler(async (req, res, next) => {
  const { prepared_statement } = new PQ(req.models.School, req.query).exec();

  const schools = await prepared_statement;
  res.status(200).json({
    status: 'success',
    data: schools,
    // pagination,
  });
});

exports.createSchool = asyncHandler(async (req, res, next) => {
  const school = await req.models.School.create(req.body);

  if (!school) {
    throw new AppError('Uusgeh uyd aldaa garlaa', 500);
  }
  res.status(201).json({
    status: 'success',
    data: school,
  });
});

exports.getSchool = asyncHandler(async (req, res, next) => {
  const school = await req.models.School.findByPk(req.params.id, {
    include: [{ model: req.models.Hutulbur }],
  });
  const data2 = await req.models.sequelize.query(rawQueries.schoolMergejilCount, {
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
exports.updateSchool = asyncHandler(async (req, res, next) => {
  const result = await req.models.School.update(req.body, {
    where: {
      Id: req.params.id,
    },
  });
  if (!result) {
    throw new AppError(`${req.body} ${result}`, 400);
  }
  res.status(201).json({
    status: 'success',
  });
});

exports.deleteSchool = asyncHandler(async (req, res, next) => {
  let doc = await req.models.School.findByPk(req.params.id);

  if (!doc) {
    throw new AppError(`${req.params.id} -тай Сургууль олдсонгүй`, 404);
  }
  await doc.destroy();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

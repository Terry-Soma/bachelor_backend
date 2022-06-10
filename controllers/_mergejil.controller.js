/* mergejil crud */
const AppError = require('../utils/_appError');
const asyncHandler = require('../middlewares/_asyncHandler');
const PQ = require('../utils/_features');
const { QueryTypes } = require('sequelize');
const rawQueries = require('../config/raw.queries');
exports.getAll = asyncHandler(async (req, res, next) => {
  if (Object.entries(req.params).length === 1) {
    let key = Object.keys(req.params);
    req.query.where = {
      [key]: req.params[key],
    };
  }
  const { prepared_statement } = new PQ(req.db.Mergejil, req.query).exec();
  const mergejil = await prepared_statement;

  res.status(200).json({
    status: 'success',
    data: mergejil,
  });
});

exports.createMergejil = asyncHandler(async (req, res, next) => {
  if (req.params) {
    let key = Object.keys(req.params);
    req.body[key] = req.params[key];
  }
  let result;
  const transaction = await req.db.sequelize.transaction();
  try {
    const {
      dataValues: { Id },
    } = await req.db.Mergejil.create(
      {
        name: req.body.name,
        mergeshil: req.body.mergeshil,
        description: req.body.description,
        hutulburId: req.body.hutulburId,
      },
      { transaction }
    );
    if (req.body.suuri_shalgalt === undefined)
      throw new AppError('suuri shalgaltiin medeelliig oruulna uu');

    const msh = req.body.suuri_shalgalt.map((el) => {
      return {
        ...el,
        MergejilId: Id,
      };
    });
    result = await req.db.MSH.bulkCreate(msh, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new AppError(error, 500);
  }

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.getMergejil = asyncHandler(async (req, res, next) => {
  // const mergejil = await req.db.Mergejil.findByPk(req.params.id, {
  //   include: [
  //     {
  //       model: req.db.MSH,
  //       attributes: ['shalguuriin_turul'],
  //       include: [{ model: req.db.Shalguur, attributes: ['name'] }],
  //     },
  //   ],
  //   attributes: {
  //     exclude: ['createdAt', 'updatedAt'],
  //   },
  // });
  const mergejil = await req.db.sequelize.query(rawQueries.mergejil_Shalgalt, {
    replacements: [req.params.id],
    type: QueryTypes.SELECT,
  });

  if (!mergejil.length > 0) {
    throw new AppError(`${req.params.id} тай мэдээлэл олдсонгүй`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: mergejil,
  });
});

exports.getMergejilWithMoreInfo = asyncHandler(async (req, res, next) => {
  const mergejil = await req.db.Mergejil.findByPk(req.params.id, {
    include: [
      {
        model: req.db.MSH,
        // attributes: ['shalguuriin_turul'],
        include: [
          {
            model: req.db.Shalguur,
            // attributes: ['name']
          },
        ],
      },
    ],
    // attributes: {
    //   exclude: ['createdAt', 'updatedAt'],
    // },
  });

  if (!mergejil) {
    throw new AppError(`${req.params.id} тай мэдээлэл олдсонгүй`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: mergejil,
  });
});

exports.updateMergejil = asyncHandler(async (req, res, next) => {
  const result = await req.db.Mergejil.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  if (!result) {
    throw new AppError(`${req.body} ${result}`, 404);
  }

  res.status(200).json({
    status: 'success',
  });
});

exports.deleteMergejil = asyncHandler(async (req, res, next) => {
  const mergejil = await req.db.Mergejil.findByPk(req.params.id);

  if (!mergejil) {
    throw new AppError(`${req.params.id} тэй мэргэжил олдсонгүй `, 404);
  }
  await mergejil.destroy();
  res.status(204).json({
    status: 'success',
  });
});

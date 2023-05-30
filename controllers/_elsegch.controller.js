const AppError = require('../utils/_appError');
const asyncHandler = require('../middlewares/_asyncHandler');
const PQ = require('../utils/_features');
const sendEmail = require('../utils/_email');
const rawQueries = require('../config/raw.queries');
const { QueryTypes, Op } = require('sequelize');
const { verifyToken } = require('../utils/_googleOAuth');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.getAll = asyncHandler(async (req, res, next) => {
  const data = await req.models.Elsegch.findAll();

  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.getAllElsegchWithMergejil = asyncHandler(async (req, res, next) => {
  const data = await req.sequelize.query(rawQueries.getAllBurtgel, {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.createElsegch = asyncHandler(async (req, res, next) => {
  const elsegch = await req.models.Elsegch.create(req.body);
  if (!elsegch) {
    throw new AppError(`Error with ${req.body}`, 400);
  }

  // const message = `<h1>Сайн байна уу ${elsegch.lname} овогтой ${elsegch.fname} таньд энэ өдрийн мэнд хүргэе </h1><br> Таны бүртгэлийг баталгаажууллаа. Та манай их сургуулийн мэргэжлүүдээс өөрийн элсэх боломжтой мэргэжлүүдийг харахыг хүсвэл <a target="_blank" href="">ЭНД ДАРНА УУ</a> <br> <p>Таныг хүссэн мэргэжлээ сонгоно гэж итгэж байна. Таньд амжилт хүсье.....</p>`;
  // try {
  //   await sendEmail({
  //     email: elsegch.email,
  //     subject: 'Бүртгэл амжилттай үүслээ',
  //     message,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   throw new AppError(error, 500);
  // }

  res.status(201).json({
    status: 'success',
    data: elsegch,
  });
});

exports.getElsegch = asyncHandler(async (req, res, next) => {
  const elsegch = await req.models.Elsegch.findByPk(req.params.id);

  if (!elsegch) {
    throw new AppError(`Id тай элсэгч олдсонгүй ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: elsegch,
  });
});
exports.chooseMergejil = asyncHandler(async (req, res, next) => {
  // const transaction = await req.models.sequelize.transaction();
  // console.log(req.body);
  // const col = await req.models.Burtgel.create(
  //   {
  //     elsegchId: req.body.burtgel_Id,
  //     ognoo: req.body.ognoo,
  //     Mergejil: req.body.mergejils,
  //     tulburId: req.body.tulburId,
  //   },
  //   { include: [{ model: req.models.Mergejil }] }
  // );
  let result;
  for (let index = 0; index < req.body.mergejils.length; index++) {
    result = await req.models.Burtgel.create({
      elsegchId: req.body.burtgel_Id,
      ognoo: req.body.ognoo,
      mergejilId: req.body.mergejils[index],
      tulburId: req.body.tulburId,
    });
  }
  if (!result) {
    throw new AppError('Sorry not working', 500);
  }
  res.status(201).json({
    status: 'success',
  });
  // try {
  //   await transaction.commit();
  // } catch (error) {
  //   await transaction.rollback();
  //   throw new AppError(error, 500);
  // }
});
exports.updateElsegch = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const result = await req.models.Elsegch.update(req.body, {
    where: {
      burtgel_Id: req.params.id,
    },
  });
  if (!result) {
    throw new AppError(`aldaa ${result}`, 404);
  }

  const html = `<h1>Сайн байна уу ${req.body.lname} овогтой ${req.body.fname} таньд энэ өдрийн мэнд хүргэе </h1><br> Таны бүртгэлийг баталгаажууллаа. Та манай их сургуулийн мэргэжлүүдээс өөрийн хүссэн мэргэжилд бүртгүүлэн ЭЕШ-ын дүн гарсны дараа элсэх боломжтой...   <br> <p>Таныг хүссэн мэргэжлээ сонгоно гэж итгэж байна. Таньд амжилт хүсье.....</p>`;
  const msg = {
    to: req.body.email,
    from: process.env.EMAIL_FROM,
    subject: 'Их Засаг олон улсын их сургууль',
    text: 'Таны бүртгэл амжилттай баталгаажлаа',
    html
  }
  try {
    await sgMail.send(msg);
    console.log("amjilttai")
  } catch (error) {
    console.log(error);
    throw new AppError(error, 500);
  }
  res.status(200).json({
    status: 'success',
    result
  });
});

exports.deleteElsegch = asyncHandler(async (req, res, next) => {
  const result = await req.models.Elsegch.findByPk(req.params.id);

  if (!result) {
    throw new AppError(`Id олдсонгүй ${req.params.id}`, 404);
  }
  await result.destroy();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getElsegchMergejil = asyncHandler(async (req, res, next) => {
  const mergejils = await req.models.Burtgel.findAll({
    where: {
      elsegchId: req.params.id,
    },
    attributes: ['mergejilId', 'elsegchId'],
    include: [
      {
        model: req.models.Mergejil,
        attributes: ['name'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    data: mergejils,
  });
});

exports.rememberMe = asyncHandler(async (req, res, next) => {
  let butDugaar = req.body.butDugaar;

  if (!butDugaar || isNaN(butDugaar)) {
    throw new AppError('БҮТ-ийн дугаараа зөв явуулна уу', 400);
  }

  butDugaar = await req.models.Elsegch.findByPk(butDugaar);
  too = await req.models.Burtgel.count({
    where: {
      elsegchId: {
        [Op.eq]: req.body.butDugaar
      }
    },
    group: ["elsegchId"],
  })
  if (!butDugaar) {
    butDugaar = +req.body.butDugaar;
  }
  // const mergejils = await req.models.Burtgel.findAll({
  //   attributes:[
  //     [req.models.sequelize.fn('GROUP_CONCAT',req.models.sequelize.col('mergejilId')),'mergejils']
  //   ],
  //   group :['elsegchId'],
  //   having : 
  // });
  const mergejils = await req.sequelize.query(rawQueries.getMergejils, {
    replacements: [req.body.butDugaar],
    type: QueryTypes.SELECT,
  });
  res.status(200).json({
    status: 'success',
    butDugaar,
    too,
    mergejils
  });
});

exports.googleAuth = asyncHandler(async (req, res, next) => {
  if (!req.body.token || !req.body.burtgel_Id) {
    throw new AppError(
      'Уучлаарай таны хүсэлтэнд хариулах зүйл алга. Мэдээллээ шалгаад дахин явуулна уу',
      400
    );
  }
  let { token } = req.body;

  const result = await verifyToken(token);

  if (!result.email_verified) {
    throw new MyError(
      'Уучлаарай та ямар нэгэн зүйл буруу хийж байна. Хаа саагүй нүд бий шүү',
      403
    );
  }
  const elsegch = await req.models.Elsegch.create({
    burtgel_Id: req.body.burtgel_Id,
    email: result.email,
  });
  if (!elsegch) {
    throw new AppError('Элсэгч үүсгэх үед алдаа гарлаа', 500);
  }
  // 
  const cookieOption = {
    expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
    httpOnly: true,
  };
  token = jwt.sign(
    {
      email: result.email,
      burtgel_Id: req.body?.burtgel_Id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRESIN,
    }
  );

  res.status(200).cookie('ADMIN_TOKEN', token, cookieOption).json({
    success: true,
    data: elsegch,
  });
});

exports.deleteElsegchMergejil = asyncHandler(async (req, res, next) => {
  let result = await req.models.Burtgel.destroy({
    where: {
      elsegchId: req.params.id,
      mergejilId: req.params.mergejilId
    }
  })
  if (!result) {
    throw new AppError(`олдсонгүй ${req.params.id}`, 404);
  }
  res.status(204).json({
    status: 'success',
  });
})
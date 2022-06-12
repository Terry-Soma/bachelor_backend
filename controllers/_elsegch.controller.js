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
  const data = await req.db.Elsegch.findAll();

  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.getAllElsegchWithMergejil = asyncHandler(async (req, res, next) => {
  const data = await req.db.sequelize.query(rawQueries.getAllBurtgel, {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.createElsegch = asyncHandler(async (req, res, next) => {
  const elsegch = await req.db.Elsegch.create(req.body);
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
  const elsegch = await req.db.Elsegch.findByPk(req.params.id);

  if (!elsegch) {
    throw new AppError(`Id тай элсэгч олдсонгүй ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: 'success',
    data: elsegch,
  });
});
exports.chooseMergejil = asyncHandler(async (req, res, next) => {
  // const transaction = await req.db.sequelize.transaction();
  // console.log(req.body);
  // const col = await req.db.Burtgel.create(
  //   {
  //     elsegchId: req.body.burtgel_Id,
  //     ognoo: req.body.ognoo,
  //     Mergejil: req.body.mergejils,
  //     tulburId: req.body.tulburId,
  //   },
  //   { include: [{ model: req.db.Mergejil }] }
  // );
  let result;
  for (let index = 0; index < req.body.mergejils.length; index++) {
    result = await req.db.Burtgel.create({
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

  const result = await req.db.Elsegch.update(req.body, {
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
  });
});

exports.deleteElsegch = asyncHandler(async (req, res, next) => {
  const result = await req.db.Elsegch.findByPk(req.params.id);

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
  const mergejils = await req.db.Burtgel.findAll({
    where: {
      elsegchId: req.params.id,
    },
    attributes: ['mergejilId', 'elsegchId'],
    include: [
      {
        model: req.db.Mergejil,
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

  butDugaar = await req.db.Elsegch.findByPk(butDugaar);
  too = await req.db.Burtgel.count({
    where: {
    elsegchId : { 
      [Op.eq] : req.body.butDugaar
    }
    },
    group: ["elsegchId"],
  })
  if (!butDugaar) {
    butDugaar = +req.body.butDugaar;
  }
  // const mergejils = await req.db.Burtgel.findAll({
  //   attributes:[
  //     [req.db.sequelize.fn('GROUP_CONCAT',req.db.sequelize.col('mergejilId')),'mergejils']
  //   ],
  //   group :['elsegchId'],
  //   having : 
  // });
  const mergejils = await req.db.sequelize.query(rawQueries.getMergejils, {
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
  const elsegch = await req.db.Elsegch.create({
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

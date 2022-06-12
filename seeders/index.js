const _asyncHandler = require('../middlewares/_asyncHandler');
const path = require('path');
const fs = require('fs');

const router = require('express').Router();

const school = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/school.json', 'utf-8')
);

const aimag = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/aimag.json', 'utf-8')
);

const hutulbur = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/hutulbur.json', 'utf-8')
);
const shalguur = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/shalguur.json', 'utf-8')
);
const mergejil = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/mergejil.json', 'utf-8')
);
const msh = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/mergejilShalgalt.json', 'utf-8')
);
let arr = msh.map(el=> {
  if(el["Id"])
    delete el["Id"]
  return el;
  });
  
const user = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/user.json', 'utf-8')
);
const alba = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/s_alba.json', 'utf-8')
);
const komis = JSON.parse(
  fs.readFileSync(__dirname + '/../dev_data/komis.json', 'utf-8')
);
const importData = _asyncHandler(async (req, res, next) => {
  await req.db.Aimag.bulkCreate(aimag);
  await req.db.Shalguur.bulkCreate(shalguur);
  await req.db.School.bulkCreate(school);
  await req.db.Hutulbur.bulkCreate(hutulbur);
  await req.db.Mergejil.bulkCreate(mergejil);
  await req.db.MSH.bulkCreate(arr);
  await req.db.User.bulkCreate(user);
  await req.db.SA.bulkCreate(alba);
  await req.db.Komis.bulkCreate(komis);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

const deleteData = _asyncHandler(async (req, res, next) => {
  await req.db.Aimag.destroy({ where: {} });
  await req.db.School.destroy({ where: {} });
  await req.db.Hutulbur.destroy({ where: {} });
  await req.db.Shalguur.destroy({ where: {} });
  await req.db.MSH.destroy({ where: {} });
  await req.db.Mergejil.destroy({ where: {} });

  res.status(204).json({
    data: null,
  });
});
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const email= async(req,res,next)=>{
  const msg = {
    to: 'test@example.com', // Change to your recipient
    from: 'test@example.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  try{
    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  }catch(err){

  }
}
router.route('/').get(importData).post(deleteData);
router.route('/ss').get(email);

module.exports = router;
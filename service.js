'use strict';

const fs = require('fs');
const path = require('path');
/*  */
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
// const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const logger = require('./utils/_logger');
// const {expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
/**
 * Өгөгдлийн баазын моделуудийг баазад үүсгэх
 */
const db = require('./config/db');
const initModels = require('./databaseModels/init-models')
initModels(db);

/*  config start */
const injectDB = require('./middlewares/_injectDB');
/* initial app */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* serve with static file  */
app.use(express.static(`${__dirname}/public`));
app.use(
  express.static(path.join(__dirname, "/public/build"))
);

const whitelist = [
  'http://localhost:3000',
  'http://localhost:1234',
  'https://ikh-zasag.netlify.app',
  'https://elselt.ikhzasag.edu.mn',
  'http://localhost:5173',
  "https://main--ikhzasag-test-front.netlify.app/"
];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (origin === undefined || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   allowedHeaders: 'Authorization, Set-Cookie, Content-Type',
//   methods: 'GET, POST, PUT,PATCH, DELETE',
//   credentials: true,
// };
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors())
// app.use(helmet());
// app.use(cors(corsOptions));
app.use(cookieParser());

/* routes */
const schoolRouter = require('./routes/schoolRoutes');
const userRouter = require('./routes/userRoutes');
const hutulburRouter = require('./routes/hutulburRoutes');
const mergejilRouter = require('./routes/mergejilRoutes');
const aimagRouter = require('./routes/aimagRoutes');
const surgaltAlbaRouter = require('./routes/saRoutes');

const shalguurRouter = require('./routes/shalguurRoutes');
const mergejilShalguurRouter = require('./routes/mergejilShalguurRoutes');
const elsegchRouter = require('./routes/elsegchRoutes');
const komisRouter = require('./routes/komisRoutes');
const viewRouter = require('./routes/viewRoutes');
const burtgelRouter = require('./routes/burtgelRoutes');
/* end routes */

const seederRouter = require('./seeders/index');
/* dev routes */
/* error handlers catchError etc ** */
const AppError = require('./utils/_appError');
const globalErrorHandler = require('./controllers/_errorHandler');
const rawQueries = require('./config/raw.queries');

/* end error handlers */

/* logger  */
app.use(fileUpload());
app.use(injectDB(db));
app.use(logger)

/* index */

/* StartRoutes */

app.use('/api/v1/aimag', aimagRouter);
app.use('/api/v1/s-alba', surgaltAlbaRouter);
app.use('/api/v1/school', schoolRouter);
app.use('/api/v1/hutulbur', hutulburRouter);
app.use('/api/v1/mergejil', mergejilRouter);
app.use('/api/v1/users', userRouter);


app.use('/api/v1/shalguur', shalguurRouter); /* shalguur route */
app.use('/api/v1/seeder', seederRouter);
app.use('/api/v1/mergejil-shalguur', mergejilShalguurRouter);
app.use('/api/v1/elsegch', elsegchRouter);
app.use('/api/v1/komis', komisRouter);
app.use('/api/v1/views', viewRouter);
app.use('/api/v1/burtgel', burtgelRouter);
app.get('/api/v1/createVIEW', async (req, res, next) => {
  try {
    await req.sequelize.query(
      `SELECT 
      MAX(CASE WHEN m1.shalguuriin_turul = 2 THEN s.name END) AS s_name,
      MAX(CASE WHEN m1.shalguuriin_turul = 2 THEN h.name END) AS h_name,
      MAX(CASE WHEN m1.shalguuriin_turul = 2 THEN m.name END) AS m_name,
      MAX(CASE WHEN m1.shalguuriin_turul = 2 THEN h.bosgo_onoo END) AS bosgo_onoo,
      MAX(CASE WHEN m1.shalguuriin_turul = 2 THEN m1.MergejilId END) AS MergejilId,
      MAX(CASE WHEN m1.shalguuriin_turul = 2 THEN m.mergeshil END) AS mergeshil,
      GROUP_CONCAT(CASE WHEN m1.shalguuriin_turul = 2 THEN s1.name END SEPARATOR ', ') AS shalgalt_2,
      GROUP_CONCAT(CASE WHEN m1.shalguuriin_turul = 1 THEN s1.name END SEPARATOR ', ') AS shalgalt_1
    FROM 
      school s
      JOIN hutulbur h ON s.id = h.schoolId
      JOIN mergejil m ON h.id = m.hutulburId
      JOIN mergejil_shalguur m1 ON m1.MergejilId = m.id
      JOIN shalguur_medeelel s1 ON m1.ShalguurId = s1.Id
    GROUP BY m.id;`
    );
    res.status(200).json({
      status: 'success',
      data: "created successfully",
    });
  } catch (error) {
    console.log('err'.red, error)

  }

});

/* EndROUTES */

app.use('/api/v1/', (req, res, next) => {
  res.sendFile(__dirname + '/build/index.html');
});


console.log('pro', process.env.NODE_ENV)
db.sync({}).then((res) => { console.log(`Өгөгдлийн сангийн холболтыг амжилттай холболоо...`.rainbow) }).catch(err => { console.log('first', err) });
// if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'production') {
//   console.log('production mode');
//   db.sync({ force: true }).then((res) => { console.log(`Өгөгдлийн сангийн холболтыг амжилттай холболоо...`.rainbow) }).catch(err => { console.log('first', err) });
// } else {
//   console.log('dev  mode'.america);
//   db.sync().then((res) => { console.log(`Өгөгдлийн сангийн холболтыг амжилттай холболоо...${ process.env.NODE_ENV }`.rainbow) }).catch(err => { console.log('first', err) });
// }

/* Unknown url or something
 404 page
  */
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/public/build/index.html")
  );
});



app.use(globalErrorHandler);


// if (process.env.NODE_ENV === 'force' || process.env.NODE_ENV === 'production') {
//   db.sequelize
//     .sync({ force: true })
//     .then((res) => {
//       console.log(`sync hiigdlee`);
//     })
//     .catch((err) => console.log(err));
// } else {
//   db.sequelize
//     .sync()
//     .then((res) => {
//       console.log(` -- -> sync hiigdlee`);
//     })
//     .catch((err) => console.log(err));
// }

module.exports = app;

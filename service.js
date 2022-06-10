'use strict';

const fs = require('fs');
const path = require('path');
/*  */
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
/*  config start */
const db = require('./config/db');
const injectDB = require('./middlewares/_injectDB');
/* initial app */
const app = express();

/*  */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* serve with static file  */
app.use(express.static(`${__dirname}/public`));
app.use(
  express.static(path.join(__dirname, "/public/build"))
);
app.use(helmet());
app.use(xss());

const whitelist = [
  'http://localhost:3000',
  'http://localhost:1234',
  'https://ikh-zasag.netlify.app',
  'https://elselt.ikhzasag.edu.mn',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: 'Authorization, Set-Cookie, Content-Type',
  methods: 'GET, POST, PUT,PATCH, DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
// app.options('*', cors());
app.use(cookieParser());

/* routes */
const schoolRouter = require('./routes/schoolRoutes');
const userRouter = require('./routes/userRoutes');
const hutulburRouter = require('./routes/hutulburRoutes');
const mergejilRouter = require('./routes/mergejilRoutes');
const aimagRouter = require('./routes/aimagRoutes');
const surgaltAlbaRouter = require('./routes/saRoutes');
const authRouter = require('./routes/authRoutes');
const shalguurRouter = require('./routes/shalguurRoutes');
const mergejilShalguurRouter = require('./routes/mergejilShalguurRoutes');
const elsegchRouter = require('./routes/elsegchRoutes');
const komisRouter = require('./routes/komisRoutes');
const viewRouter = require('./routes/viewRoutes');
const burtgelRouter = require('./routes/burtgelRoutes');
/* end routes */

const loginRoute = require('./routes/loginRoute');
const seederRouter = require('./seeders/index');
/* dev routes */
/* error handlers catchError etc ** */
const AppError = require('./utils/_appError');
const globalErrorHandler = require('./controllers/_errorHandler');
/* end error handlers */

/* logger  */
// if (process.env.NODE_ENV === 'dev') {
//   app.use(morgan('dev'));
//   app.use(
//     morgan('common', {
//       stream: fs.createWriteStream(path.join(__dirname, '/logs/access.log'), {
//         flags: 'a',
//       }),
//     })
//   );
// }
app.use(fileUpload());
app.use(injectDB(db));

/* index */

/* StartRoutes */

app.use('/api/v1/aimag', aimagRouter);
app.use('/api/v1/s-alba', surgaltAlbaRouter);
app.use('/api/v1/school', schoolRouter);
app.use('/api/v1/hutulbur', hutulburRouter);
app.use('/api/v1/mergejil', mergejilRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/loginfb', loginRoute);
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/shalguur', shalguurRouter); /* shalguur route */
app.use('/api/v1/seeder', seederRouter);
app.use('/api/v1/mergejil-shalguur', mergejilShalguurRouter);
app.use('/api/v1/elsegch', elsegchRouter);
app.use('/api/v1/komis', komisRouter);
app.use('/api/v1/views', viewRouter);
app.use('/api/v1/burtgel', burtgelRouter);
/* EndROUTES */
app.use('/api/v1/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

/* Unknown url or something
 404 page
  */
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/public/build/index.html")
  );
});


app.use(globalErrorHandler);

/* db modeling  */

db.School.hasMany(db.Hutulbur, { foreignKey: 'schoolId' });
db.Hutulbur.belongsTo(db.School, { foreignKey: 'schoolId' });

db.Hutulbur.hasMany(db.Mergejil, { foreignKey: 'hutulburId' });
db.Mergejil.belongsTo(db.Hutulbur, { foreignKey: 'hutulburId' });

db.Mergejil.belongsToMany(db.Shalguur, { through: { model: db.MSH,unique:false }});
db.Shalguur.belongsToMany(db.Mergejil, { through: {model : db.MSH , unique: false} });

db.Mergejil.hasMany(db.MSH);
db.MSH.belongsTo(db.Mergejil);
db.Shalguur.hasMany(db.MSH);
db.MSH.belongsTo(db.Shalguur);

db.User.hasMany(db.Komis, { foreignKey: 'userId' });
db.Komis.belongsTo(db.User, { foreignKey: 'userId' });

db.SA.hasMany(db.Komis, { foreignKey: 's_alba_id' });
db.Komis.belongsTo(db.SA, { foreignKey: 's_alba_id' });

db.Aimag.hasMany(db.Komis, { foreignKey: 'aimag_id' });
db.Komis.belongsTo(db.Aimag, { foreignKey: 'aimag_id' });

db.Aimag.hasMany(db.Elsegch, { foreignKey: 'aimag_id' });
db.Elsegch.belongsTo(db.Aimag, { foreignKey: 'aimag_id' });
db.Mergejil.hasMany(db.Burtgel, { foreignKey: 'mergejilId' });
db.Burtgel.belongsTo(db.Mergejil, { foreignKey: 'mergejilId' });

/* end db model association */

if (process.env.NODE_ENV === 'force' || process.env.NODE_ENV === 'production') {
  db.sequelize
    .sync({ force: true })
    .then((res) => {
      console.log(`sync hiigdlee`);
    })
    .catch((err) => console.log(err));
} else {
  db.sequelize
    .sync()
    .then((res) => {
      console.log(` --->sync hiigdlee`);
    })
    .catch((err) => console.log(err));
}

module.exports = app;

const express = require('express')
const router = require('./routes/diary');
const path = require('path')
const PORT = process.env.PORT || 5000
//const mongoose = require('mongoose');
//var bodyParser = require('body-parser')

var app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
    .use('/api/diary', router)
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


//routes 호출

//라우터 모듈 등록 (라우터 모듈안에 다이어리 스키마 모듈을 불러오고 있으므로 아래와 같이 라우터만!
//라우터 파일 경로
//const router = require('./routes/diary');

//사용할 api 호출 경로, 라우터 변수
//app.use('/api/diary', router);//여기서 /api/diary로 설정해주었기 때문에 routes/diary.js 에서 /만으로도 표현할 수 있다.
//위에 올려서 작성
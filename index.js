const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

var app = express();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

//body-parser 등록
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//DB연결
let url = "mongodb+srv://sangwon:"+ encodeURIComponent("tkddnjs8476!") + "@cluster0-0lced.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(url, {dbName: 'diary'}, function(err){
    console.log('err::' +err);
})

//다이어리 데이터 모델 설정
var Schema = mongoose.Schema;//언마샬링

//데이터 형테는 {date: "20200325", title: "hi", imgList: "", content: "hihello"}
var diarySchema = new Schema(
    {date: String, title: String, imgList: String, content: String}
)

//위와 같은 모델로 쓸 것이라고 변수 생성
var datas = mongoose.model('diary', diarySchema, 'diarycollection');

//다이리 데이터 모델에 기반하여 저장된 전체 데이터를 불러와서
datas.find(function(err, diary){
    if(err){
        console.log("error::" + err);
    }else{
        //항목별로 보기
        diary.forEach(function(row){
            console.log("data :: " + row.title);
        });
    }
});


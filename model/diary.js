//DB관련
const mongoose = require('mongoose')

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

//나를 호출할 때 이렇게 갖다써!
module.exports = mongoose.model('diary', diarySchema, 'diarycollection');

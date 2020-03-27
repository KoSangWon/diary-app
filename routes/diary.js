///model/dirary.js에서 mongoose.model~~을 호출하면 갖다 쓰도록 해주었다. 그것을 /routes/diary.js가 호출해서 쓴다.
//모델을 가져와서 사용

var express = require('express');
var data = require('../model/diary');       //다이어리 모델 스키마를 가져온다.
var bodyParser = require('body-parser');    //body의 json을 파싱해주는 모듈
var dateFormat = require('dateformat');     //날짜형식을 원하는 형태로 바꿔주는 모듈
var empty = require('is-empty');            //빈값 체크 모듈 *주의 : 0도 empty로 판단한다.
const stringify = require('json-stringify-pretty-compact')  //json 값을 문자열로 (보기좋게)변환해주는 모듈

var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//전체 데이터를 불러와서 항목별로 보기 : 실제 호출주소 http://~~/api/diary/
router.get('/', function(req, res){
    data.find(function(error, diary){
        var resultData = "";

        //에러가 없고, 결과값이 있다면
        if(!error && !empty(diary)){
            resultData = diary;
            //resultData = stringify(diary);
        }

        res.json({result: empty(error), error: error, data:resultData});
    });
});


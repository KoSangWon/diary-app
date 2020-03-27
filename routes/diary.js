///model/dirary.js에서 mongoose.model~~을 호출하면 갖다 쓰도록 해주었다. 그것을 /routes/diary.js가 호출해서 쓴다.
//모델을 가져와서 사용

var express = require('express');
var data = require('../model/diary');       //다이어리 모델 스키마를 가져온다.

var bodyParser = require('body-parser');    //body의 json을 파싱해주는 모듈

var dateFormat = require('dateformat');     //날짜형식을 원하는 형태로 바꿔주는 모듈
var empty = require('is-empty');            //빈값 체크 모듈 *주의 : 0도 empty로 판단한다.
const stringify = require('json-stringify-pretty-compact')  //json 값을 문자열로 (보기좋게)변환해주는 모듈

var router = express.Router();//Router는 API를 사용하면서 어떤 url 주소를 받았을 때 해당 내용을 보내주는 것이다.

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

//id 기반으로 조회하여 데이터를 1건 불러오기 : 실제 호출주소 http://~~/api/diary/id값
router.get('/:id', function(req, res){//:id가 있기 때문에 body를 사용하지 않는다.
    data.findOne({id:req.params.id}, function(error, diary){
        var resultData = "";
        if(!error && !empty(diary)){
            resultData = diary;
        }

        res.json({result: empty(error), error:error, data:resultData});
    });
});

//데이터를 추가히기 : 실제 호출주소 http://~~/api/diary/ + body데이터
router.post('/', function(req, res){수
    //보내는 것이기 때문에 body를 거쳐야한다.
    var title = req.body.title;//post로 보낼때는 body에 넣는다.
    var content = req.body.content;

    if(!empty(title) && !empty(content)){
        var diaryData = new data();
        diaryData.title = title;
        diaryData.content = content;
        var now = new Date();
        diaryData.date = dateFormat(now, "yyyymmdd");
        diaryData.imgList = "";

        //콘솔창을 통해서 로그를 확인해볼 수 있다.
        console.log("diary content diaryData :: " + diaryData);

        diaryData.save(function (error, resultData) {
            res.json({result:empty(error), error:error, data:resultData});
        });
    }
    else{
        res.json({result: false, error:null, data:null});
    }
});

//id로 데이터를 찾아서 수정 : 실제 호출주소 http://~~/api/diary/ + body 데이터
router.put('/:id', function(req, res){
    var title = req.body.title;
    var content = req.body.content;
    const id = req.params.id;

    if(!empty(id)){
        //findOneAndUpdate => mongoose에서 제공하는 함
        data.findOneAndUpdate({_id:id}, {$set:
                {title: title, content: content}
        }, {returnNewDocument: true}, (error, doc) => {
            res.json({result:!error, error:error});
        });
    }
    else{


        res.json({result:false, error:null, data:null});
    }
});

//id로 찾아서 삭제 : 실제 호출주소 http://~~/api/diary/id값
router.delete('/:id', function(req, res){
    const id = req.params.id;
    if(!empty(id)){수
        //remove => mongoose에서 지원하는 함
        data.remove({_id:id}, function(error, resultData){
            res.json({result:empty(error), error:error, data:resultData});
        });
    }
    else{
        res.json({result:false, error:null, data:null});
    }
});

module.exports = router;//누군가가 호출하면 router를 보내준다.
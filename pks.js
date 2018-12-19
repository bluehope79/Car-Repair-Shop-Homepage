var http = require('http');
var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./database.js');
var connection = mysql.createConnection(dbconfig);
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
const https = require('https')
app.io = io
var app = express();
require('date-utils');

// ADD THIS
var cors = require('cors');
app.use(cors());



const router = express.Router();

app.get('/login_em', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  console.log('in login_em')
  console.log(req.query);
  var id = req.query.id,
    password = req.query.password;
  console.log('ID' + id + '  password' + password);

  connection.query('SELECT * from 직원 WHERE 직원번호=?', [id], (e, r, f) => {
    if (r[0]) {
      if (e) {
        console.log('error : \n' + e)
        res.send({
          status: 'error',
          errMsg: '에러'
        })
      } else {
        console.log(r[0].비밀번호)
        if (r[0].비밀번호 == password) {
          console.log('login pass')
          res.send({
            status: 'success',
            result: JSON.parse(JSON.stringify(r)),
            field: f
          })
        } else {
          console.log('incorrect')
          res.send({
            status: "incorrect"
          })
        }
      }
    } else {
      console.log('no-user')
      res.send({
        status: "no-user"
      })
    }
  })
});

app.get('/', function(req, res) {
  res.send('Root');
});

app.get('/hello', function(req, res) {
  console.log('in /hello')
  ID=req.query.ID
  connection.query('SELECT * from 고객 where ID=?',ID, (e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if(!r[0]){
        console.log(e)
        res.send({
        status: '직원',
        errMsg: '에러',
      })

    }else{
    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
    }
  })
});



app.get('/login', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  console.log('in login_em')
  console.log(req.query);
  var id = req.query.id,
    password = req.query.password;
  console.log('ID' + id + '  password' + password);

  connection.query('SELECT * from 고객 WHERE ID=?', [id], (e, r, f) => {
    if(r[0]){
      if (e) {
        console.log('error : \n' + e)
        res.send({
          status: 'error',
          errMsg: '에러'
        })
      } else {
        console.log(r[0].비밀번호)
        if (r[0].비밀번호 == password) {
          console.log('login pass')
          res.send({
            status: 'success',
            result: JSON.parse(JSON.stringify(r)),
            field: f
          })
        } else {
          console.log('incorrect')
          res.send({
            status: "incorrect"
          })
        }
      }
    }else{
      console.log('no-user')
      res.send({
        status: "no-user"
	})
    }
  })
});

app.get('/request/join', function(req, res) {
   console.log('in /request/join')
   console.log(req.query);
   var ID = req.query.ID,
       NAME = req.query.NAME,
       PHONE = req.query.PHONE,
       PASSWORD = req.query.PASSWORD;

   connection.query('insert into 고객 values (?,?,?,?,?)',[ID,NAME,PHONE,PASSWORD,0],(e,r,f) =>{
   console.log(connection.query);
 res.setHeader('Content-Type', 'text/plain');
     if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});

app.get('/request/join_em', function(req, res) {
   console.log('in /request/join_em')
   console.log(req.query);
   var ID = req.query.ID,
       NAME = req.query.NAME,
       PHONE = req.query.PHONE,
       PASSWORD = req.query.PASSWORD;
       START= req.query.START;
       SUPER= req.query.SUPER;
   console.log(ID);
   console.log(NAME);
   console.log(PHONE);
   console.log(PASSWORD);
   console.log(SUPER);
   if(SUPER==''){
	   connection.query('insert into 직원 values (?,NULL,?,?,?,?)',[ID,NAME,PHONE,START,PASSWORD],(e,r,f) =>{
	   console.log(connection.query);
	 res.setHeader('Content-Type', 'text/plain');
     if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })

   }else{

   connection.query('insert into 직원 values (?,?,?,?,?,?)',[ID,SUPER,NAME,PHONE,START,PASSWORD],(e,r,f) =>{
   console.log(connection.query);
 res.setHeader('Content-Type', 'text/plain');
     if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
}
});


app.get('/call/review', function(req, res) {
   console.log('in call/review')
   connection.query('SELECT * from 후기', (e, r, f) => {

   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
 })
});

app.get('/request/review', function(req, res) { //게시글 등록
   var newDate = new Date(); // 현재 시각 받아옴
   var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
   console.log(req.query);
   var context = req.query.내용,
       id = req.query.ID;
       num = req.query.접수번호;
   connection.query('insert into 후기 values (?,?,?,?)',[context,time,num,id],(e,r,f) =>{
        res.setHeader('Content-Type', 'text/plain');
            if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});


app.get('/call/notcommentedquestion', function(req, res) {
  console.log('in /call/notcommentedquestion')

  connection.query('SELECT * from 질문게시판 where 질문번호 NOT IN (select 질문번호 from 답변댓글)', (e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
  })
});


app.get('/call/comment', function(req, res) {
  console.log('in call/comment')
  console.log(req.query);
  var NUM = req.query.질문번호;

  connection.query('SELECT 이름,작성시간,내용 from 답변댓글 natural join 직원 where 질문번호=?', NUM,(e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
  })
});


app.get('/call/question', function(req, res) {
  console.log('in call/question')
  //  res.send('hell0');

  connection.query('SELECT * from 질문게시판', (e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
  })
});

app.get('/request/question', function(req, res) { //등록
   var newDate = new Date(); // 현재 시각 받아옴
   var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
   console.log(req.query);
   var context = req.query.질문내용,
       id = req.query.ID;
   connection.query('insert into 질문게시판 values (0,?,?,?)',[context,time,id],(e,r,f) =>{
   console.log(connection.query);
	res.setHeader('Content-Type', 'text/plain');
	    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});

app.get('/call/reservation', function(req, res) {
  console.log('in call/reservation')
  console.log(req.query);
  var id_reserv = req.query.ID
  console.log(id_reserv)

    connection.query('SELECT * FROM 예약 WHERE ID = ?', [id_reserv], (e, r, f) => {
    console.log(connection.query)
      if (e) {
        console.log('에러'+e)
        res.send({
          status: 'error',
          errMsg: '에러'
        })
      }else{
      if (r[0]){
	console.log(r[0].ID)
        if (r[0].ID == id_reserv) {
            res.send({
              status:'success',
	      result: JSON.parse(JSON.stringify(r)),

            })
          }

      }else {
          res.send({
            status: 'noexist',
            errMsg: '에러'
          })
        }
      }
    })
});


app.get('/reserv_em', function(req, res) {
  console.log('in reserv_em')
  connection.query('SELECT * from 예약 where 예약승인 = ?',['0'],(e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
  })
});

app.get('/call/reserv_em', function(req, res) {
  console.log('in call/reserv_em')
  console.log(req.query);
  var id = req.query.id;
  connection.query('UPDATE 예약 SET 예약승인=? where 예약번호 = ?',['1',id], (e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
  })
});

app.get('/log', function(req, res) {
   console.log('in log')
   console.log(req.query);
   var id_log = req.query.ID;
   connection.query('SELECT 접수번호,문제점,금액,수리상태,수리시작날짜,수리완료날짜,직원번호,차량번호 from 수리기록 WHERE ID = ?',id_log, (e, r, f) => {
   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
 })
});

app.get('/detail/log', function(req, res) {
   console.log('in detail/log')
   console.log(req.query);
   var ID = req.query.ID;
   connection.query('SELECT 모델번호,부품명,시리얼번호 from 사용_부품 NATURAL JOIN 부품 WHERE 접수번호 = ?',[ID], (e, r, f) => {
   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
 })
});

app.get('/log_em', function(req, res) {
   console.log('in log')
   console.log(req.query);
   var id_log = req.query.ID;
   connection.query('SELECT 접수번호,문제점,수리상태,금액,수리시작날짜,수리완료날짜,차량번호 from 수리기록 WHERE 직원번호 = ?',id_log, (e, r, f) => {
   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
 })
});


app.get('/editStart/log_em', function(req, res) {
   console.log('in editStart/log_em')
   console.log(req.query);
   var id_log = req.query.ID;
   var newDate = new Date();
   var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
   connection.query('update 수리기록 set 수리시작날짜=? WHERE 접수번호 = ?',[time,id_log], (e, r, f) => {
   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
    }
 })
});

app.get('/editState/log_em', function(req, res) {
   console.log('in editState/log_em')
   console.log(req.query);
   var id_log = req.query.ID;
   connection.query('select 수리상태 from 수리기록 WHERE 접수번호 = ?',[id_log], (e, r, f) => {
   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      if(r[0].수리상태=='0') var state ='1'
      else if(r[0].수리상태=='1') var state = '2'
      else if(r[0].수리상태=='2') var state = '2'
      connection.query('update 수리기록 set 수리상태=? WHERE 접수번호 = ?',[state,id_log], (e2, r2, f) => {
      res.setHeader('Content-Type', 'text/plain');
      if (e2) {
         console.log(e2)
         res.send({
           status: 'error',
           errMsg: '에러',
         })
       } else {
         res.send({
           status: 'success'
         })
       }
    })
    }
 })
});

app.get('/editFinish/log_em', function(req, res) {
   console.log('in editFinish/log_em')
   console.log(req.query);
   var id_log = req.query.ID;
   var year = req.query.year;
   var month = req.query.month;
   var day = req.query.day;
   var finish = year+'-'+month+'-'+day
   connection.query('update 수리기록 set 수리완료날짜=? WHERE 접수번호 = ?',[finish,id_log], (e, r, f) => {
   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
    }
 })
});

app.put('/editPay/log_em', function(req, res) {
   console.log('in editPay/log_em')
   console.log(req.query)
   var id_log = req.query.num
   var val = req.query.val
   connection.query('update 수리기록 set 금액=? WHERE 접수번호 = ?',[val,id_log], (e, r, f) => {
   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
    }
 })
});

app.get('/call/review_detail', function(req, res) {
  console.log('in /call/review_detail')
  console.log(req.query)
  var num = req.query.num
  console.log(num)
  connection.query('SELECT 이름,문제점,수리시작날짜,수리완료날짜 from 수리기록 NATURAL JOIN 직원 WHERE 접수번호 = ?',[num], (e, r, f) => {
  res.setHeader('Content-Type', 'text/plain');
  if (e) {
     console.log(e)
     res.send({
       status: 'error',
       errMsg: '에러',
     })
   } else {
     res.send({
       status: 'success',
       result: JSON.parse(JSON.stringify(r)),
       fields: f
     })
   }
 })
});

app.get('/delete/review', function(req, res) {
  console.log('in /delete/review')
  console.log(req.query);
  var id_log = req.query.ID;

  connection.query('delete from 후기 where 접수번호=?',id_log ,(e,r,f) => {
     console.log(connection.query);
     res.setHeader('Content-Type', 'text/plain');
     if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});



app.get('/delete/quesiton', function(req, res) {
  console.log('in /call/review_detail')
  console.log(req.query);
  var id_log = req.query.id;

  connection.query('delete from 질문게시판 where 질문번호=?',id_log ,(e,r,f) =>{
     console.log(connection.query);
     res.setHeader('Content-Type', 'text/plain');
     if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});


app.get('/receipt', function(req, res) {
  console.log('in /receipt')
  console.log(req.query);
  var id = req.query.id;
  var em_id = req.query.em_id;
  var num = req.query.차량번호;
  var prob = req.query.문제점;
  var newDate = new Date(); // 현재 시각 받아옴
  var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  connection.query('select 사수_번호 from 직원 where 직원번호=?',[em_id],(e,r,f) =>{
     console.log(connection.query);
     if (e) {
       console.log(e)
       res.send({
         status: 'error',
         errMsg: '에러'
       })
     }else{
       console.log(r)
       console.log(r[0].사수_번호)
       console.log('연결 성공')
       if(r[0].사수_번호 == null ){
         console.log('사수가 없습니다')
         res.send({
           status: '거절',
           errMsg: '사수없음',
         })
       }else{
         console.log('사수가 있습니다')

         connection.query('insert into 수리기록 (접수번호,접수시간,문제점,수리상태,수리시작날짜,직원번호,ID,차량번호) values (0,?,?,?,?,?,?,?)',[time,prob,'0','2018-12-17', em_id,id,num],(e,r,f) =>{
            console.log(connection.query);
            res.setHeader('Content-Type', 'text/plain');
            if (e) {
             console.log(e)
             res.send({
               status: 'error',
               errMsg: '에러',
             })
           } else {
             console.log(id)
             connection.query('SELECT 서비스이용횟수 FROM 고객 WHERE ID = ?',id,(e1,r1,f1) =>{
                console.log(connection.query);
                if(e1){
                  console.log(e1)
                }else{
                  var serv_num = r1[0].서비스이용횟수
                  serv_num *= 1;
                  connection.query('UPDATE 고객 SET 서비스이용횟수 = ? WHERE ID = ?',[serv_num+1,id],(e2,r2,f2) =>{
                     console.log(connection.query);
                     if(e2){
                       console.log(e2)
                     }else{
                       console.log('success')
                       res.send({
                         status: 'success'
                       })
                     }
                   })
                }
              })
          }
         })

       }
     }
   })
});


//검사안함.
app.get('/create/car', function(req, res) {
  console.log('in /receipt')
  console.log(req.query);
  var id = req.query.id;
  var years = req.query.years;
  var num = req.query.num;
  var model = req.query.model;

  connection.query('insert into 차량 values (?,?,?,?)',[num,model,years,id],(e,r,f) =>{
     console.log(connection.query);
     res.setHeader('Content-Type', 'text/plain');
     if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});

app.get('/data/car', function(req, res) {
  console.log('in /data/car')
  console.log(req.query);
  var id = req.query.id;
  connection.query('select * from 차량 where ID=?',[id],(e,r,f) =>{
     console.log(connection.query);
     res.setHeader('Content-Type', 'text/plain');
     if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success',
        result: r
      })
   }
  })
});

app.get('/delete/car', function(req, res) {
  console.log('in /data/car')
  console.log(req.query);
  var id = req.query.id;
  connection.query('delete from 차량 where 차량번호=?',[id],(e,r,f) =>{
     console.log(connection.query);
     res.setHeader('Content-Type', 'text/plain');
     if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
     }
    })
  });

app.get('/request/reservation', function(req, res) {
  console.log('in /request/reservation')
  console.log(req.query);
  var id = req.query.id;
  var date = req.query.date;
  var loc = req.query.loc;
  if(loc == ''){
    console.log(0)
    connection.query('insert into 예약 (예약번호,희망날짜,ID,예약승인) values(0,?,?,?)',[date,id,'0'],(e,r,f) =>{
       console.log(connection.query);
       res.setHeader('Content-Type', 'text/plain');
       if (e) {
        console.log(e)
        res.send({
          status: 'error'
        })
      } else {
        res.send({
          status: 'success'
        })
       }
      })
  }else{
    console.log(loc)
    connection.query('insert into 예약 (예약번호,희망날짜,픽업장소,ID,예약승인) values(0,?,?,?,?)',[date,loc,id,'0'],(e,r,f) =>{
       console.log(connection.query);
       res.setHeader('Content-Type', 'text/plain');
       if (e) {
        console.log(e)
        res.send({
          status: 'error'
        })
      } else {
        res.send({
          status: 'success'
        })
       }
      })
  }
  console.log(loc)
});

app.get('/request/comment', function(req, res) { //게시글 등록
   var newDate = new Date(); // 현재 시각 받아옴
   var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
   console.log(req.query);
   var context = req.query.내용,
       id = req.query.직원번호;
       num = req.query.질문번호;
   connection.query('insert into 답변댓글 values (?,?,?,?)',[context,time,num,id],(e,r,f) =>{
        res.setHeader('Content-Type', 'text/plain');
            if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});


app.get('/delete/reservation', function(req, res) {
  console.log('in /delete/reservation')
  console.log(req.query);
  var id = req.query.ID;
    connection.query('delete from 예약 where 예약번호 = ?',[id],(e,r,f) =>{
       console.log(connection.query);
       res.setHeader('Content-Type', 'text/plain');
       if (e) {
        console.log(e)
        res.send({
          status: 'error'
        })
      } else {
        res.send({
          status: 'success'
        })
       }
      })
});


// configuration ===============================================================
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'),
  function() {
    console.log('Express server listening on port ' + app.get('port'));
  });

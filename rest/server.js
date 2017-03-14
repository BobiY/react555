const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized :true,
  name:"qqqq"
}))
app.get("/",function (req,res) {
  console.log(req.cookies.qqqq)
  console.log(req.session.id );
  console.log(req.cookies.qqq == req.session.id )
  if(req.session.id && req.session.login ==1 ){
    res.send("欢迎" + req.session.name);
  }else{
     res.send("你还没有登录");
  }
});

app.get("/login",function (req,res) {
  console.log(req.session.name);
  if(req.session.name == req.query.name && req.session.login ==1 ){
    res.send("欢迎" + req.session.name);
    //res.redirct("/");
  }else{
    console.log(req.query.name);
    req.session.login = 1;
    req.session.name = req.query.name;
    res.cookie("name",req.query.name,{maxAge:80*1000});
    res.send("你已经登录成功");
  }

});



app.listen(3000);

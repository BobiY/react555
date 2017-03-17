//第一步连接数据库,这个过程只需要调用一次
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
/*调试模式是mongoose提供的一个非常实用的功能，用于查看mongoose模块对mongodb操作的日志，一般开发时会打开此功能，以便更好的了解和优化对mongodb的操作。*/
mongoose.set('debug', true);
const db = mongoose.connect("mongodb数据库的地址");
db.connect.on("error",function (err) {
	console.log("连接数据库失败" + err);
});
db.connect.on("open",function(){
	console.log("连接数据库成功");
});

//第二步，生成模式和模型
require("./connect");
//创建学生模型
const studentSchema = mongoose.Schema({
	name:String
});
//创建学生模型
const Student = mongoose.modle("Student(这个参数是存放学生数据的表)",studentSchema);
//实例化学生模型进行数据操作
//增
const student = Student({name:"小明"});
student.save(function(err){
	if(err){
		console.log(err)
	}else{
		console.log("保存成功")
	}
});

//删
student.remove({name:"小明"},function(err){
	if(err){
		console.log(err)
	}else{
		console.log("删除成功")
	}
});

//改(如果不写set语句则是整条覆盖)；
student.update({name:"小明"},{$set:{name:"韩梅梅"}},function(err){
	if(err){
		console.log(err)
	}else{
		console.log("修改成功")
	}
});
//查
//1.查全部
student.find({},function(err){
	if(err){
		console.log(err)
	}else{
		console.log("查询全部成功")
	}
});

//2.查一条
student.findOne({name:"小明"},function(err){
	if(err){
		console.log(err)
	}else{
		console.log("查询一条成功")
	}
})



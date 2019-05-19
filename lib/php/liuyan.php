<?php  
	date_default_timezone_set('PRC');//设置默认时区
	header("Content-Type: text/html;charset=utf8");
	
	// $pdo = new PDO("mysql:host=localhost;dbname=ly;charset=utf8", "root", "root");//使用pdo链接mysql数据库

	// if($_SERVER['REQUEST_METHOD'] == 'POST'){
		
	// 	//向数据库添加留言信息
	// 	$insert_sql = "insert into ly(date,uname,content) values('$date','$uname','$lyContent')";//定义insert语句
	// 	$pdo->exec($insert_sql);//执行insert_sql语句
	// }
	$lyContent = $_GET['lyConten'];//从表单获取留言内容
	$uname = $_GET['username'];
	$date = date('Y-m-d H:i:s',time());//获取当前时间
	$conn = mysqli_connect('127.0.0.1','root','root','ly',3306);
    $sql = "insert into ly(date,uname,content) values('$date','$uname','$lyContent')";
	$ret = mysqli_query($conn,$sql);
	if($lyContent==''&&$uname==''){
		echo "NO";
	}else{
		if($ret){
			echo "OK";
		}else{
			echo "NO";
		}
	}
    

?>
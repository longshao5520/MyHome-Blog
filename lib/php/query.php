<?php  
	date_default_timezone_set('PRC');//设置默认时区
	header("Content-Type: text/html;charset=utf8");

	//$T=$_GET['uname'];
	
	$pdo = new PDO("mysql:host=localhost;dbname=ly;charset=utf8", "root", "root");//使用pdo链接mysql数据库

    $query_sql = "select * from ly order by date desc";//定义查询语句查询ly数据表里所有内容
	$result = $pdo->query($query_sql);//执行query_sql语句
	while($row = $result->fetch(PDO::FETCH_ASSOC)){
		$a[] = $row;
		}
	//if($T == "xiao"){
		echo json_encode($a);
	//}else{
	//	echo "数据错误";
	//}
?>
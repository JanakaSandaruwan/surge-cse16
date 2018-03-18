<?php
	session_start();

	$_SESSION=array();//session variable become empty array

	if(isset($_COOKIE[session_name()])){//deletin cokies in browser
		setcookie(session_name(),'',time()-86000,'/');
	}

	session_destroy();

	header('Location: login.php');
?>
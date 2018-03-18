<?php session_start(); ?>
<?php require_once('inc/connection.php'); ?>

<?php 

  if(isset($_POST['submit'])){//check whether user submit
    
    $errors=array();
    if(!isset($_POST['u']) || strlen(trim($_POST['u']))<1){
        $errors[]='Username is Missing';
        
    }
    if(!isset($_POST['password']) || strlen(trim($_POST['password']))<1){
        $errors[]='Password is Missing';
        
    }

    if(empty($errors)){
      
      $u=mysqli_real_escape_string($connection,$_POST['u']);
      $password=mysqli_real_escape_string($connection,$_POST['password']);

      $query="SELECT * FROM teacher WHERE name='{$u}' AND password='{$password}' LIMIT 1";
      
      $result_set=mysqli_query($connection,$query);

      if($result_set){
        if(mysqli_num_rows($result_set)==1){
          

          $user=mysqli_fetch_assoc($result_set);//catch user info 
         // $_SESSION['userid']=$user['index'];
          $_SESSION['username']=$user['name'];
          
          header('Location: index.php'); 
        
        }else{
          $errors[]='Invalid Username password';
          
        }
      }else{
        $errors[]='Database query failed';
        
      }

    }
  }
?>

<!DOCTYPE html>
<html>
<head>
	<title>
		LearnOrb.com/Login
	</title>
	<link rel="stylesheet" href="css/animate.css">
	<link rel="shortcut icon" href="orbit.png" type="image/x-icon" />
		<style type="text/css">
			.item{
				
	width:400px;
	height: 320px;
	position: absolute;
	z-index: 15;
	top: 50%;
	left: 50%;
	margin: -150px 0 0 -200px; 
	background-color: #fff;
	box-shadow: 0px 10px 60px #5DADE2;
	overflow: hidden;
	border-radius: 10px;

			}
		</style>
</head>
<body background="img/ab.jpg">
	<div>
		<header align = "center" class="animated zoomIn" style="font-family:'Courier New'; font-size:90px; color:#FFFFFF;">
			Welcome to SurgeOrb
		</header>
		<hr width="1400">
	</div>
	<div class="item animated fadeInDown" >
		<form align="center" style="font-family:'Times New Roman';" action="login.php" method="post">
			<h1>Log in</h1>
			<p>Username</p><input type="text" name="u" size="20" >
			<p>Password </p><input type="password" name="password" ><br>
			<input type="checkbox" name="vehicle" value="Bike">Remember username<br>
			<br><button name="submit" type="sumbit" class="button" style="border-radius: 10px;background-color: #3498DB;font-size: 30px;">Log in</button>
		</form>
	</div>
</body>
</html>

<?php mysqli_close($connection) ?>


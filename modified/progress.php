<?php session_start(); ?>

<?php require_once('inc/connection.php'); ?>


<?php 

  if(isset($_POST['submit'])){//check whether user submit
    
    $errors=array();
    if(!isset($_POST['search']) || strlen(trim($_POST['search']))<1){
        $errors[]='Username is Missing';
        
    }

    if(empty($errors)){
      
      
      $search=mysqli_real_escape_string($connection,$_POST['search']);

      $query1="SELECT * FROM mark1 WHERE id='{$search}' ";
      $query2="SELECT * FROM mark2 WHERE id='{$search}' ";
      
      $result_set1=mysqli_query($connection,$query1);
      $result_set2=mysqli_query($connection,$query2);

      if($result_set1 ){
        
        if(mysqli_num_rows($result_set1)==1){// && mysqli_num_rows($result_set2)==1 ){
          

          $user=mysqli_fetch_assoc($result_set1);//catch user info 
         
          
          header("Location: std_progress.php?id={$user['id']}"); 
        
        }else{
         
          $errors[]='Invalid';
          
        }
      }else{
        
        $errors[]='Database query failed';

        
      }

    }
  }else{ echo "3";}
?>



<?php
  //check if usser logged in
  if(!isset($_SESSION['username'])){
    header('Location: login.php');
  }
?>

<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/progress1.css">
  <!-- Latest compiled and minified CSS -->

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <!-- jQuery library -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

    <!-- Latest compiled JavaScript -->

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="css/examstyle.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
    body {
  padding-top: 50px;
  overflow: hidden;
}
#wrapper {
  min-height: 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 35px;
  left: 0;
  display: inline-block;
  background-color: #D6EAF8;
}
#main-wrapper {
  height: 100%;
  overflow-y: auto;
  padding: 50px 0 0px 0;
}
#main {
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding: 0 15px;
}
#sidebar-wrapper {
  height: 100%;
  padding: 50px 0 0px 0;
  position: fixed;
  border-right: 1px solid gray;
  background-color: tan;
}
#sidebar {
  position: relative;
  height: 100%;
  overflow:hidden;
}
#sidebar .list-group-item {
      border-radius: 0;
      border-left: 0;
      border-right: 0;
      border-top: 0;
      background-color: tan;
      color : white;
}
@media (max-width: 992px) {
  body {
      padding-top: 0px;
  }
}
@media (min-width: 992px) {
  #main-wrapper {
      float:right;
  }
}
@media (max-width: 992px) {
  #main-wrapper {
      padding-top: 0px;
  }
}
@media (max-width: 992px) {
  #sidebar-wrapper {
      position: static;
      height:auto;
      max-height: 300px;
    border-right:0;
}
}
.footer {
  background-color:#ffffff;
bottom:0;
  position:fixed;
  padding:10px;
}


    </style>
    <title>
    LearnOrb.com/progress
  </title>
</head>
<body>
  <div id="header" class="navbar navbar-default navbar-fixed-top" style="height:90; background:url(img/ab.jpg)"; >
      <div class="navbar-header" >
          <img src="img/nt.png" style="height:70;"/>
      </div>
      <nav class="collapse navbar-collapse" style="color:white;">
          <ul class="nav navbar-nav">
              <li>
                  <h1 style="font-family:'Courier New';">Welcome to SurgeOrb!</h1>
              </li>
              <!--<li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Navbar Item 2<b class="caret"></b></a>
                  <ul class="dropdown-menu">
                      <li><a href="#">Navbar Item2 - Sub Item 1</a></li>
                  </ul>
              </li>
              <li>
                  <a href="#">Navbar Item 3</a>
              </li>-->
          </ul>
          <ul class="nav navbar-nav pull-right">
              <li class="dropdown1">
                  <img src="img/149071.png" width="30px" style="margin-left:3rem; margin-top:0.25rem;"/>
                  
                  <div class="dropdown">
                  <button onclick="myFunction()" class="dropbtn" ><?php echo $_SESSION['username'] ?><img src="img/drop.png" style="width: 10px; height: 10px"></button>
                    <div id="myDropdown" class="dropdown-content">
                      <a href="logout.php">Logout</a>
                      
                    </div>
                  </div>
                
              </li>
          </ul>
      </nav>
  </div>
  <div id="wrapper">
    <div id="sidebar-wrapper" class="col-md-1" style="background:url(mgcss/ab.jpg); width: 150px">
              <div id="sidebar" style="background:url(img/ab.jpg)";>
                  
                    <div class="btn-group">
  <button class="button" onclick="window.location.href='index.php'">Home</button>
  <button class="button" onclick="window.location.href='progress.php'">Progress Check</button>
  <button class="button">Notices</button>
  <button class="button">Leave Application</button>
</div>
                      <!--<li>
                          <a class="button" href="#" style="background:url(ab.jpg); height: 85px; padding-top: 33px"><i class="icon-home icon-1x"></i>Sidebar Item 1</a>
                      </li>
                      <li>
                          <a class="list-group-item" href="#" style="background:url(ab.jpg); height: 85px; padding-top: 33px"><i class="icon-home icon-1x"></i>Sidebar Item 2</a>
                      </li>
                      
                      <li>
                          <a class="list-group-item" href="#" style="background:url(ab.jpg); height: 85px; padding-top: 33px"><i class="icon-home icon-1x"></i>Sidebar Item 1</a>
                      </li>
                      <li>
                          <a class="list-group-item" href="#" style="background:url(ab.jpg); height: 85px; padding-top: 33px"><i class="icon-home icon-1x"></i>Sidebar Item 1</a>
                      </li>
                      <li>
                          <a class="list-group-item" href="#" style="background:url(ab.jpg); height: 85px; padding-top: 33px"><i class="icon-home icon-1x"></i>Sidebar Item 1</a>
                      </li>-->
                 
              </div>
          </div>
         <!-- <div class="item" style="top: 220px; left:370px; width:1320px; height:125px" >
            <p style="padding-left: 150px; padding-top: 10px; font-size: 50"><img src="voc.jpg" style="height: 100px ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RIVEROAK VOCATIONAL CENTER</p>
            

          </div>-->
          <div id="main-wrapper" class="col-md-11 pull-right">
              <div id="main" style="padding-left: 50px;">
                <div class="page-header">
                  <h3 style="font-weight: bold; font-family:'Courier New'; padding-top: 10px">Progress Check</h3>
                </div>
                <div class="frame">
                  <form method="post" action="progress.php">
                    <fieldset >
                      <legend id="state">Select a student</legend>
                      <label for="search">Index Number</label>
                      <input type="text" name="search" b id="search">
                      <button type="submit" name="submit">Go</button>
                    </fieldset>

                  </form>

                 
                </div>
                
                 <hr>
                  <div class="full">
                    <a href="progresslist.php" >Display full summary of students</a>
                  </div>

                  <div class="full">
                    <a href="acodemiclist.php" >Display acodemic feable student list</a>
                  </div>

                  <div class="item1" style="top: 2150px; left:223px; width:1367px; height:150px;background-image: url(img/footer.jpg);" ><p style="padding-left:1140px;padding-top: 75px;font-family:'Courier New'; font-weight: bold;"><img src="img/surge.png" style="width: 30px;height: 30px"> By TEAM SURGE</p></div>
               </div>

              </div>


          </div>
  </div>
  <script>
          function myFunction() {
              document.querySelector('.dropdown-content').classList.toggle('show');
          }

              
                window.onclick = function(e) {
                  if (!e.target.matches('.dropbtn')) {
                    var myDropdown = document.querySelector('.dropdown-content');
                      if (myDropdown.classList.contains('show')) {
                        myDropdown.classList.remove('show');
                      }
                  }
                }
</script>
</body>
</html>

<?php mysqli_close($connection) ?>
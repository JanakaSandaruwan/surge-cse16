
<?php
/**
 * Created by PhpStorm.
 * User: Janaka Sandaruwan
 * Date: 1/25/2018
 * Time: 8:18 PM
 */
$connection=mysqli_connect('localhost','root','','institute');
if(mysqli_connect_errno()){
    die('Database connection fail!!!'.mysqli_connect_error());
}else{
    //echo "connection succesful";
}
?>
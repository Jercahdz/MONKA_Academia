<?php
session_start(); 

$_SESSION = array();


session_destroy();


header("Location: ../login.html"); // Change this to your desired location
exit();
?>
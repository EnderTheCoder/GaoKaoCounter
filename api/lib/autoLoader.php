<?php
spl_autoload_register(function ($name) {
    require_once "../lib/" . $name . ".php";
});
ini_set("display_errors", "On");
header("Content-type: application/json; charset=utf-8");
require_once "../lib/customFunctions.php";
header('Access-Control-Allow-Methods:POST');
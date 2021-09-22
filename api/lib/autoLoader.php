<?php
spl_autoload_register(function ($name) {
    require_once "../lib/" . $name . ".php";
});
require_once "../lib/customFunctions.php";

header('Access-Control-Allow-Methods:POST');
header("Content-type: application/json; charset=utf-8");

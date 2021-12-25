<?php

//require_once "../lib/debugOn.php";
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();

$mysql->bind_query("SELECT * FROM sentence");
$data = $mysql->fetchLine(null, rand(0, $mysql->getRowNum() - 1));

$return->setType("success");
$return->setData($data);
$return->setVal("count", $mysql->getRowNum());

$return->run();
<?php
//require_once "../lib/debugOn.php";

require_once "../lib/autoLoader.php";
$return = new returnCore();
$mysql = new mysqlCore();

$fields = array(
    1 => $_POST['host_name'],
);

$mysql->bind_query("SELECT * FROM script WHERE host_name = ?", $fields);

$return->setType("success");
$return->setData($mysql->fetch());
$return->run();
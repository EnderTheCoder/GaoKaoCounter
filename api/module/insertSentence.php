<?php
//require_once "../lib/debugOn.php";
require_once "../lib/autoLoader.php";


$return = new returnCore();
$mysql = new mysqlCore();
//var_dump(file_get_contents("php://input"));
//parse_str(file_get_contents("php://input"), $_POST);
if (isEmpty($_POST['sentence']) || isEmpty($_POST['class']) || isEmpty($_POST['sentence_from']))
    $return->retMsg('emptyParam');

$params = array(
    1 => $_POST['sentence'],
    2 => $_POST['class'],
    3 => time(),
    4 => $_POST['sentence_from'],
);
$mysql->bind_query('insert into sentence (sentence, class, insert_time, sentence_from) values (?, ?, ?, ?);', $params);

$return->setType("success");
$return->run();
<?php
require_once "../lib/debugOn.php";
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();

if (isEmpty($_POST['class'])) $return->retMsg("emptyParam");
var_dump((int)$_POST['class']);

$fields = array(
    1 => $_POST['class']
);

$mysql->bind_query("SELECT * FROM class_data WHERE class_num = ?", $fields);
if ($mysql->getRowNum() > 0) {
    $return->setData($mysql->fetchLine(null));
    $return->setType("success");
    $return->run();
} else {
    $return->retMsg("noResult");
}
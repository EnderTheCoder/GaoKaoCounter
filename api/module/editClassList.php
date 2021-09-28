<?php
require_once "../lib/debugOn.php";
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();

if (isEmpty($_POST['class'])) $return->retMsg("emptyParam");

$fields = array(
    1 => $_POST['class']
);
$mysql->bind_query("SElECT * FROM class_data WHERE class_num = ?", $fields);
if ($mysql->getRowNum() == 0) {
    $fields = array(
        1 => $_POST['class'],
        2 => json_encode($_POST['class_list']),
    );
    $mysql->bind_query("INSERT INTO class_data (class_num, class_list) VALUES (?, ?)", $fields);

} else {
    $mysql->update("class_data", "class_list", json_encode($_POST['class_list']), "class_num", $_POST['class']);
}
if ($mysql->isError()) $return->retMsg("dbErr");
$return->retMsg("success");
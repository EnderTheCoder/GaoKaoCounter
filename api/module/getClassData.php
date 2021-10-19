<?php
require_once "../lib/debugOn.php";
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();

if (isEmpty($_POST['class'])) $return->retMsg("emptyParam");

$fields = array(
    1 => $_POST['class']
);

$mysql->bind_query("SELECT class_num, class_list FROM class_data WHERE class_num = ?", $fields);
if ($mysql->getRowNum() > 0) {
    $return->setType("success");
    $data = $mysql->fetchLine(null);
    $data['class_list'] = json_decode($data['class_list']);
    $return->setData($data);
    $return->run();
} else {
    $return->retMsg("noResult");
}
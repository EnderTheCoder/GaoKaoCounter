<?php
//require_once "../lib/debugOn.php";
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();

if (isEmpty($_POST['class'])) $return->retMsg("emptyParam");

$fields = array(
    1 => $_POST['class']
);

$mysql->bind_query("SELECT * FROM settings_data WHERE class_num = ?", $fields);
if ($mysql->getRowNum() > 0) {
    $return->setType("success");
    $data = $mysql->fetchLine(null);
    $data['settings'] = json_decode($data['settings']);
    $return->setData($data);
    $return->run();
} else {
    $return->retMsg("noResult");
}
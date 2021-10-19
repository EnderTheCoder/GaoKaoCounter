<?php
require_once "../lib/debugOn.php";
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();

if (isEmpty($_POST['class'])) $return->retMsg("emptyParam");

$fields = array(
    1 => $_POST['class']
);
$mysql->bind_query("SElECT * FROM settings_data WHERE class_num = ?", $fields);
if ($mysql->getRowNum() == 0) {
    $fields = array(
        1 => $_POST['class'],
        2 => json_encode($_POST['settings']),
        3 => time()
    );
    $mysql->bind_query("INSERT INTO settings_data (class_num, settings, last_update) VALUES (?, ?, ?)", $fields);

} else {
    $mysql->update("settings_data", "settings", json_encode($_POST['settings']), "class_num", $_POST['class']);
    $mysql->update("settings_data", "last_update", time(), "class_num", $_POST['class']);
}
if ($mysql->isError()) $return->retMsg("dbErr");
$return->retMsg("success");
<?php

//require_once "../lib/debugOn.php";
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();
$param = array(
    1 => $_POST['class']
);
$mysql->bind_query("SELECT name_list FROM class_data where class_num = ?", $param);
$data = $mysql->fetchLine("class_num");
$data = json_decode($data);
$temp = array();
$counter = 0;
for ($i = 0; $i < sizeof($data); $i++) {
    for ($j = 0; $j < $data[$i]['weight']; $j++) {
        $temp[$counter] = $data[$i]['name'];
        $counter++;
    }
}

$name = $temp[rand(0, sizeof($temp))];

$return->setType("success");
$return->setData($name);

$return->run();
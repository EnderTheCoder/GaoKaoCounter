<?php
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();
$totalwords = file_get_contents("3500.txt");
$words = explode("\n",$totalwords);

$sql = "INSERT INTO words (word, insert_time, list_belonged_to) VALUES (?,?,?)";
for ($i = 0;$i < count($words);$i++) {
    if (is_int($i/3)) {
        $params = array(
            1 => $words[$i],
            2 => time(),
            3 => 1
        );
        $mysql->bind_query($sql, $params);
        echo "OK<BR>";
    }
}
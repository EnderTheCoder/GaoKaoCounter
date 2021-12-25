<?php
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();

switch ($_GET['action']) {
    case "delete":
    {
        $param = array(
            1 => $_POST['id'],
        );
        $mysql->bind_query("DELETE FROM sentence WHERE id = ?", $param);
        $return->retMsg("success");
    }
    case "add":
    {
        if (isEmpty($_POST['sentence']) || isEmpty($_POST['class']) || isEmpty($_POST['sentence_from']))
            $return->retMsg('emptyParam');
        $param = array(
            1 => $_POST['sentence'],
        );
        $mysql->bind_query("SELECT * FROM sentence WHERE sentence = ?", $param);
        if ($mysql->getRowNum()) $return->retMsg("dupVal");
        $params = array(
            1 => $_POST['sentence'],
            2 => $_POST['class'],
            3 => time(),
            4 => $_POST['sentence_from'],
        );
        $mysql->bind_query('insert into sentence (sentence, class, insert_time, sentence_from) values (?, ?, ?, ?);', $params);

        $return->setType("success");
        $return->run();
    }
    case "edit":
    {

    }
    case "random":
    {
        $mysql->bind_query("SELECT * FROM sentence");
        $data = $mysql->fetchLine(null, rand(0, $mysql->getRowNum() - 1));
        $data = mb_convert_encoding($data, "UTF-8");

        $return->setType("success");
        $return->setData($data);
        $return->setVal("count", $mysql->getRowNum());

        $return->run();
    }
    case "grant_based_random":
    {

    }
    case "all":
    {
        $mysql->bind_query("select * from sentence order by id desc");
        $return->setType("success");
        $return->setData(mb_convert_encoding($mysql->fetch(), 'UTF-8'));
        $return->run();
    }
    case "select_by_class":
    {

    }
    default:
    {
        $return->retMsg("emptyParam");
    }
}
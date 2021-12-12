<?php
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();
switch ($_GET['action']) {
    case "delete":
    {

    }
    case "add":
    {

    }
    case "edit":
    {

    }
    case "random":
    {

    }
    case "all":
    {
        $mysql->bind_query("select * from sentence order by id desc limit 100");
        $return->setType("success");
        $return->setData($mysql->fetch());
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
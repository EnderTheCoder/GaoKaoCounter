<?php
spl_autoload_register(function ($name) {
    require_once "../lib/" . $name . ".php";
});

header("Content-type: application/json; charset=utf-8");
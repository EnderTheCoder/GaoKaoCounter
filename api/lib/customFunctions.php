<?php

function countX($array)
{
    if (!$array) return 0;
    else return count($array);
}

function isEmpty($str)
{
    return !(!empty($str) && isset($str));
}
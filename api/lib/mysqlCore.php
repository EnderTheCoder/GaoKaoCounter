<?php

class mysqlCore
{
    const DB_HOST = '192.168.10.120';

    const DB_USERNAME = 'counterDB';

    const DB_PASSWORD = 'Feng,HK,4778!';

    const DB_NAME = 'counterDB';

    private $con;
    private $isError = false;
    private $ErrorMsg;
    private $result;
    private $row;

    //在实例化对象时连接数据库
    public function __construct()
    {
        $this->connect();
    }

    //检测是否已经连接数据库。如果已经连接就返回连接，如果没有就进行连接。
    private function connect()
    {
        if ($this->con != null) return $this->con;
        $dsn = 'mysql:host=' . self::DB_HOST . ';dbname=' . self::DB_NAME;
        $con = new pdo($dsn, self::DB_USERNAME, self::DB_PASSWORD);
        $this->con = $con;
        $con->query('set names utf8');
        return $this->con;
    }

    //改变使用的数据库
    public function changeDB($dbName)
    {
        $sql = 'use ' . $dbName;
        $conn = $this->connect();
        $conn->query($sql);
    }

    //执行不带有用户输入的sql语句
    public function query($sql)
    {
        $conn = $this->connect();
        $conn->query($sql);
        return true;
    }

    //使用绑定参数执行带有输入的sql语句,$sql是sql语句,$params是参数数组
    public function bind_query($sql, $params = null, $debug = false)
    {
        if ($params != null && !is_array($params)) $params = array(0 => $params);
        try {
            $conn = $this->connect();
            $stmt = $conn->prepare($sql);
            if ($params && empty($params))
                for ($i = 1; $i <= count($params); $i++)
                    $stmt->bindValue($i, $params[$i], PDO::PARAM_STR);
            $stmt->execute();
            $this->result = $stmt->fetchAll();
            $this->row = countX($this->result);
            return $this->result;
        } catch (PDOException $exception) {
            if ($debug) {
                $this->isError = true;
                $this->ErrorMsg = '数据库查询错误,错误代码：' . $exception->getCode() . '错误信息：' . $exception->getMessage();
                return $this->ErrorMsg;
            } else {
                $return = new returnCore();
                $return->retMsg('dbErr', '数据库查询错误,错误代码：' . $exception->getCode() . '错误信息：' . $exception->getMessage());
                return false;
            }
        }
    }

//    public function insert($table, $data)
//    {
//        $fields = "";
//        $values = "";
//        foreach ($data as $field => $value) {
//            $fields .= $field . ", ";
////            $values .= $value . ", ";
//        }
//        $fields = substr($fields, 0, strlen($fields) - 3);
////        $values = substr($values, 0, strlen($values) - 3);
//
//        $sql = 'INSERT INTO ' . $table . ' (' . $fields . ') VALUES ( ' . ' )';
//    }

    function update($table, $key, $value, $c_key, $c_value, $c_function = '=')
    {
        $sql = 'UPDATE `' . $table . '` SET `' . $key . '` = ? WHERE `' . $c_key . '` ' . $c_function . ' ?';
        $params = array(
            1 => $value,
            2 => $c_value
        );
        $this->bind_query($sql, $params);
    }

    function change($table, $key, $function, $value, $c_key, $c_value, $c_function = '=')
    {
        $sql = 'UPDATE `' . $table . '` SET `' . $key . '` = ? ' . $function . ' `' . $key . '` WHERE `' . $c_key . '` ' . $c_function . ' ?';
        $params = array(
            1 => $value,
            2 => $c_value
        );
        $this->bind_query($sql, $params);
    }

    public function fetch($enableRowNums = false)
    {
        if ($enableRowNums) $this->result['row'] = countX($this->result);
        return $this->result;
    }

    public function fetchLine($key, $line = 0)
    {
        if ($key === null) return $this->result[$line];
        return $this->result[$line][$key];
    }

    public function getRowNum()
    {
        return $this->row;
    }

    //debug函数，判断是否发生错误
    public function isError()
    {
        return $this->isError;
    }

    //debug函数，获取错误信息
    public function getError()
    {
        return $this->ErrorMsg;
    }

    //获取上一次插入所产生的自增id
    public function getId()
    {
        $conn = $this->connect();
        return $conn->lastInsertId();
    }

    //关闭数据库连接
    public function close()
    {
        $this->con = null;
    }

}
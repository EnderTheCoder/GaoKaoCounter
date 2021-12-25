<?php
require_once "../lib/autoLoader.php";

$return = new returnCore();
$mysql = new mysqlCore();

function curl_get($url){

    $header = array(
        'Accept: application/json',
    );
    $curl = curl_init();
    //设置抓取的url
    curl_setopt($curl, CURLOPT_URL, $url);
    //设置头文件的信息作为数据流输出
    curl_setopt($curl, CURLOPT_HEADER, 0);
    // 超时设置,以秒为单位
    curl_setopt($curl, CURLOPT_TIMEOUT, 1);

    // 超时设置，以毫秒为单位
    // curl_setopt($curl, CURLOPT_TIMEOUT_MS, 500);

    // 设置请求头
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    //设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    //执行命令
    $data = curl_exec($curl);

    // 显示错误信息
    if (curl_error($curl)) {
        return false;
    } else {
        return $data;
    }
}

switch ($_GET['action']) {
    case "random":
    {
        $param = array(
            1 => $_POST['word_list']
        );
        $mysql->bind_query("SELECT * FROM words WHERE (list_belonged_to = ? AND visible = 1) ORDER BY RAND() LIMIT 1", $param);

        $return->setType("success");
        $return->setData($mysql->fetchLine());
        $return->run();
    }
    case "add":
    {

    }
    case "delete":
    {

    }
    case "all":{

    }
    case "get_translate":
    {
//        if (!$_POST['word']) $return->retMsg("emptyParam");

//        if (!$_POST['word']) $_POST['word'] = "null";


        $target = "http://dict.youdao.com/jsonapi?jsonversion=2&client=mobile&q=".$_GET["word"]."&dicts=%7B%22count%22%3A99%2C%22dicts%22%3A%5B%5B%22ec%22%2C%22ce%22%2C%22newcj%22%2C%22newjc%22%2C%22kc%22%2C%22ck%22%2C%22fc%22%2C%22cf%22%2C%22multle%22%2C%22jtj%22%2C%22pic_dict%22%2C%22tc%22%2C%22ct%22%2C%22typos%22%2C%22special%22%2C%22tcb%22%2C%22baike%22%2C%22lang%22%2C%22simple%22%2C%22wordform%22%2C%22exam_dict%22%2C%22ctc%22%2C%22web_search%22%2C%22auth_sents_part%22%2C%22ec21%22%2C%22phrs%22%2C%22input%22%2C%22wikipedia_digest%22%2C%22ee%22%2C%22collins%22%2C%22ugc%22%2C%22media_sents_part%22%2C%22syno%22%2C%22rel_word%22%2C%22longman%22%2C%22ce_new%22%2C%22le%22%2C%22newcj_sents%22%2C%22blng_sents_part%22%2C%22hh%22%5D%2C%5B%22ugc%22%5D%2C%5B%22longman%22%5D%2C%5B%22newjc%22%5D%2C%5B%22newcj%22%5D%2C%5B%22web_trans%22%5D%2C%5B%22fanyi%22%5D%5D%7D&keyfrom=mdict.7.2.0.android&model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800&ssid=superman&network=wifi&abtest=2&xmlVersion=5.1";
        $data = json_decode(curl_get($target), true);
//        var_dump($data);
        $translate = $data["ec"]['word'][0]['trs'];

        $data = "";
        foreach($translate as $value){
            $temp = $value;
            while (is_array($temp)) {
                $temp = array_shift($temp);
            }
            $data .= $temp;
        }
        $return->setType("success");
        $return->setData($data);
        $return->run();
    }
    default:
    {
        $return->retMsg("emptyParam");
    }
}
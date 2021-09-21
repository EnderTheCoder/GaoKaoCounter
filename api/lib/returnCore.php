<?php

class returnCore
{
    protected $code = array(
        'success' => array(
            'code' => 100,
            'msg' => '请求成功',
        ),
        'jump' => array(
            'code' => 101,
            'msg' => '请求成功，即将跳转'
        ),
        'signErr' => array(
            'code' => 201,
            'msg' => '不错的尝试'
        ),
        'dbErr' => array(
            'code' => 202,
            'msg' => '数据库错误',
        ),
        'emptyParam' => array(
            'code' => 203,
            'msg' => '参数不完整',
        ),
        'stateUnavailable' => array(
            'code' => 204,
            'msg' => '状态不正确',
        ),
        'limReached' => array(
            'code' => 205,
            'msg' => '邮箱请求次数达到上限',
        ),
        'signOvertime' => array(
            'code' => 206,
            'msg' => '签名已经失效'
        ),
        'passErr' => array(
            'code' => 207,
            'msg' => '认证未通过',
        ),
        'emailServerErr' => array(
            'code' => 208,
            'msg' => '邮件服务器发生错误或邮件地址错误'
        ),
        'smsServerErr' => array(
            'code' => 209,
            'msg' => '短信服务发生错误'
        ),
        'captchaErr' => array(
            'code' => 210,
            'msg' => '验证码错误'
        ),
        'dupVal' => array(
            'code' => 211,
            'msg' => '重复的值',
        ),
        'formatErr' => array(
            'code' => 212,
            'msg' => '格式错误'
        ),
        'requestTooFast' => array(
            'code' => 213,
            'msg' => '请求速度过快',
        ),
        'entryErr' => array(
            'code' => 214,
            'msg' => '登入点错误',
        ),
        'paramErr' => array(
            'code' => 215,
            'msg' => '参数格式错误'
        ),
        'noResult' => array(
            'code' => 216,
            'msg' => '结果不存在',
        ),
        'apiClosed' => array(
            'code' => 217,
            'msg' => '接口已被关闭'
        ),
        'fileErr' => array(
            'code' => 218,
            'msg' => '文件上传错误！',
        ),
        'tokenFailed' => array(
            'code' => 219,
            'msg' => 'token已失效或不存在',
        ),
        'dbgMsg' => array(
            'code' => 300,
            'msg' => '预留调试代码',
        ),
    );

    protected $returnValue;

    public function setType($type)
    {
        $this->returnValue = $this->code[$type];
    }

    public function setMsg($msg)
    {
        $this->returnValue['msg'] = $msg;
    }

    public function setData($value)
    {
        $this->returnValue['data'] = $value;
    }

    public function setVal($key, $value)
    {
        $this->returnValue['data'][$key] = $value;
    }

    public function attachParams($params)
    {
        $this->returnValue = array_merge($this->returnValue, $params);
    }

    public function setCount($count)
    {
        $this->returnValue['count'] = $count;
    }

    public function run()
    {
        $this->jsonReturn($this->returnValue);
    }

    public function retMsg($type, $data = null, $msg = null)
    {
//        if (isEmpty($this->code[$type])) $ret = $this->code['dbgMsg'];
//        else $ret = $this->code[$type];
        $ret = isEmpty($this->code[$type]) ? $this->code['dbgMsg'] : $this->code[$type];
        if ($data)
            $ret['data'] = $data;
        else $ret['data'] = array();
        if ($msg) $ret['msg'] = $msg;
        $this->jsonReturn($ret);
    }

    private function jsonReturn($res)
    {
        echo json_encode($res);
        exit;
    }
}
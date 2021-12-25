let qrCodeText = encodeURI((window.location.href).replace("index", "sentenceReceiver"));
$(".sentence-roller-left img").attr("src", "https://api.nbhao.org/v1/qrcode/make?s=200&text=" + qrCodeText)

let sentenceRollInterval = 60;
let nowSecond = 0;
let sentenceData = [];
init();
function init() {
    getSentence();
    change();
    setInterval(change, 1000);
}

function getSentence() {
    $.ajax({
        //请求方式
        type : "POST",
        contentType: "application/json;charset=UTF-8",
        url : "api/module/randomSentenceRoller.php",
        success : function(result) {
            sentenceData = Object.values(result);
            sentenceData = sentenceData[2];
            // console.log(sentenceData['sentence']);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function getClassName(num) {
    return num + "班提交";
}

function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function change() {
    if (getUrlParam("class") === "2") {
        sentenceData['sentence'] = "人若有所向往，何惧道阻且长！";
        sentenceData['class'] = "2";
        sentenceData['sentence_from'] = "赵永江";
    }
    getSentence();
    if (nowSecond === sentenceRollInterval) $(".sentence-roller-right p").html(sentenceData['sentence'] + "——[" + getClassName(sentenceData['class']) + "]" + sentenceData['sentence_from'])
    if (nowSecond < sentenceRollInterval) nowSecond += 1;
    else {
        nowSecond = 0;
    }
    $(".sentence-counter span").html(sentenceRollInterval - nowSecond);
}

let qrCodeText = encodeURI((window.location.href).replace("index", "sentenceReceiver"));
$(".sentence-roller-left img").attr("src", "https://api.nbhao.org/v1/qrcode/make?s=200&text=" + qrCodeText)

let sentenceRollInterval = 60;
let nowSecond = 0;
let sentenceData;
init();
function init() {
    getSentence();
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

function change() {
    getSentence();
    if (nowSecond === sentenceRollInterval) $(".sentence-roller-right p").html(sentenceData['sentence'] + "——[" + getClassName(sentenceData['class']) + "]" + sentenceData['sentence_from'])
    if (nowSecond < sentenceRollInterval) nowSecond += 1;
    else {
        nowSecond = 0;
    }
    $(".sentence-counter span").html(sentenceRollInterval - nowSecond);
}

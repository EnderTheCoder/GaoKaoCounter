let timePreFix = 0;
let classStartSchedule =
    [[5, 40], [7, 0], [8, 0], [8, 55], [10, 10], [11, 5], [14, 15], [15, 5], [15, 55], [16, 45], [17, 35], [18, 40], [19, 55], [21, 0]];
let classEndSchedule =
    [[6, 30], [7, 50], [8, 45], [9, 40], [10, 55], [11, 50], [14, 55], [15, 45], [16, 35], [17, 25], [18, 10], [19, 45], [20, 50], [21, 50]];
let classIntervalName = ["早一", "早二", "上一", "上二", "上三", "上四", "下一", "下二", "下三", "下四", "课活", "晚一", "晚二", "晚三"];

let classList = [
    ["无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入"],

    ["无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入"],

    ["无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入"],

    ["无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入"],

    ["无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入"],

    ["无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入"],

    ["无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入","无数据请录入"],
];

classList[34] =
    [
        [['早读'], ['语文'], ['语文'], ['语文'], ['生物'], ['生物'], ['数学'], ['数学'], ['数学'], ['数学'], ['新闻周刊'], ['自习'], ['自习'], ['自习']],
        [['早读'], ['生物'], ['生物'], ['语文'], ['语文'], ['化学'], ['英语'], ['英语'], ['化学'], ['数学'], ['数学'], ['物理'], ['物理'], ['自习']],
        [['早读'], ['英语'], ['化学'], ['化学'], ['物理'], ['体育'], ['语文'], ['语文'], ['生物'], ['数学'], ['数学'], ['生物'], ['生物'], ['自习']],
        [['早读'], ['化学'], ['数学'], ['数学'], ['生物'], ['生物'], ['英语'], ['英语'], ['体育'], ['物理'], ['自习/生/化'], ['语文'], ['语文'], ['自习']],
        [['早读'], ['物理'], ['物理'], ['英语'], ['英语'], ['体育'], ['语文'], ['语文'], ['生物'], ['生物'], ['化学'], ['数学'], ['数学'], ['自习']],
        [['早读'], ['化学'], ['物理'], ['物理'], ['语文'], ['语文'], ['生物'], ['生物'], ['生物'], ['数学'], ['数学'], ['英语'], ['英语'], ['自习']],
        [['早读'], ['学习'], ['学习'], ['学习'], ['学习'], ['学习'], ['学习'], ['学习'], ['学习'], ['学习'], ['学习'], ['学习'], ['学习'], ['自习']]
    ];
classList[2] =
    [
        [['自习'], ['自习'], ['英语'], ['英语'], ['历史'], ['历史'], ['数学'], ['数学'], ['数学'], ['数学'], ['自习'], ['自习'], ['自习'], ['自习']],
        [['英语/语文'], ['政史地'], ['语文'], ['语文'], ['地理'], ['政治'], ['历史'], ['数学'], ['英语'], ['英语'], ['地理'], ['数学'], ['政治/历史'], ['语文']],
        [['英语/语文'], ['政史地'], ['数学'], ['数学'], ['历史'], ['语文'], ['地理'], ['政治'], ['英语'], ['英语'], ['地理'], ['数学'], ['政治/历史'], ['语文']],
        [['英语/语文'], ['政史地'], ['历史'], ['英语'], ['政治'], ['地理'], ['数学'], ['语文'], ['体育'], ['英语'], ['地理'], ['数学'], ['政治/历史'], ['语文']],
        [['英语/语文'], ['政史地'], ['语文'], ['英语'], ['数学'], ['数学'], ['地理'], ['历史'], ['政治'], ['英语'], ['地理'], ['数学'], ['政治/历史'], ['语文']],
        [['英语/语文'], ['政史地'], ['语文'], ['英语'], ['英语'], ['数学'], ['历史'], ['地理'], ['政治'], ['英语'], ['地理'], ['数学'], ['政治/历史'], ['语文']],
        [['英语/语文'], ['政史地'], ['地理'], ['地理'], ['政治'], ['政治'], ['语文'], ['语文'], ['语文'], ['新闻周刊'], ['放荡不羁爱自由'], ['数学'], ['政治/历史'], ['语文']]
    ];
classList[4] =
    [
        [['自习'], ['自习'], ['英语'], ['英语'], ['物理'], ['物理'], ['数学'], ['数学'], ['数学'], ['数学'], ['自习'], ['自习'], ['自习'], ['自习']],
        [['英语/语文'], ['化学/生物'], ['物理'], ['英语'], ['语文'], ['语文'], ['化学'], ['数学'], ['生物'], ['英语'], ['化学'], ['数学'], ['物理'], ['语文']],
        [['英语/语文'], ['化学/生物'], ['数学'], ['数学'], ['物理'], ['语文'], ['英语'], ['生物'], ['化学'], ['英语'], ['化学'], ['数学'], ['物理'], ['语文']],
        [['英语/语文'], ['化学/生物'], ['化学'], ['物理'], ['语文'], ['英语'], ['数学'], ['生物'], ['体育'], ['英语'], ['化学'], ['数学'], ['物理'], ['语文']],
        [['英语/语文'], ['化学/生物'], ['语文'], ['英语'], ['数学'], ['数学'], ['化学'], ['物理'], ['生物'], ['英语'], ['化学'], ['数学'], ['物理'], ['语文']],
        [['英语/语文'], ['化学/生物'], ['数学'], ['语文'], ['英语'], ['英语'], ['物理'], ['化学'], ['生物'], ['英语'], ['化学'], ['数学'], ['物理'], ['语文']],
        [['英语/语文'], ['化学/生物'], ['生物'], ['生物'], ['化学'], ['化学'], ['语文'], ['语文'], ['语文'], ['新闻周刊'], ['放荡不羁爱自由'], ['数学'], ['物理'], ['语文']]
    ];
let gapName = ["皇上用膳", "课间", "课间", "伸胳膊拉腿", "课间", "进食+午休+听力", "课间", "课间", "课间", "课间", "满汉全席", "课间", "课间", "神庙逃亡"];
let classListHeadTemplate = "<th>时间</th><th>%DAY%</th>";
let classListBodyTemplate = "<tr><td>%CLASS_INTERVAL_NAME%</td><td>%CLASS_NAME%</td></tr>";
let classProgress;
classListInit();

function classListInit() {
    getCurrentClassClassList(parseInt(getUrlParam("class")));
    changeClassList();
    changeTimePost();
    setInterval(changeClassList, 600000);
    setInterval(changeTimePost, 1000);
    return true;
}

function getCurrentClassClassList(classID) {
    if (classID === null) return;

    if (classID === 3 || classID === 35 || classID === 5) {
        classList = classList[classID - 1];
        return;
    }
    let postData = {};
    postData.class = classID;
    $.ajax({
        //请求方式
        type : "POST",
        data: postData,
        dataType: 'json',
        url : "api/module/getClassData.php",
        success : function(result) {
            if (result.code === 200) {
                classList = Object.values(result);
                classList = classList["class_list"];
                console.log("class_list");
            } else console.log(result);
        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function getWeekDate() {
    let now = new Date();
    let day = now.getDay();
    let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weeks[day];
}

function changeClassList() {
    $(".class-list thead tr").html(classListHeadTemplate.replace("%DAY%", getWeekDate));
    let now = new Date();
    let day = now.getDay();
    let body = $(".class-list tbody");
    body.html("");
    for (let i = 0; i < classList[day].length; i++) {
        body.append((classListBodyTemplate.replace("%CLASS_NAME%", classList[day][i])).replace("%CLASS_INTERVAL_NAME%", classIntervalName[i]));
    }
}

function addZeroToTime(time) {
    return (time < 10) ? "0" + time : time;
}

function changeTimePost() {
    let onClassMark = false;
    let now = new Date();
    let min = now.getHours() * 60 + now.getMinutes() + timePreFix;
    for (let i = 0; i < classStartSchedule.length; i++) {
        if (classStartSchedule[i][0] * 60 + classStartSchedule[i][1] <= min &&
            classEndSchedule[i][0] * 60 + classEndSchedule[i][1] > min) {
            $(".going-class").html(classList[now.getDay()][i][0]);
            $(".start-time").html("" + addZeroToTime(classStartSchedule[i][0]) + ":" + addZeroToTime(classStartSchedule[i][1]));
            $(".end-time").html("" + addZeroToTime(classEndSchedule[i][0]) + ":" + addZeroToTime(classEndSchedule[i][1]));
            classProgress = ((min - classStartSchedule[i][0] * 60 - classStartSchedule[i][1]) / (classEndSchedule[i][0] * 60 + classEndSchedule[i][1] - (classStartSchedule[i][0] * 60 + classStartSchedule[i][1])));
            onClassMark = true;


            break;
        }
    }
    if (!onClassMark) {
        let offClassMark = false;
        for (let i = 0; i < classStartSchedule.length - 1; i++) {
            let endTime = classStartSchedule[i + 1][0] * 60 + classStartSchedule[i + 1][1];
            let startTime = classEndSchedule[i][0] * 60 + classEndSchedule[i][1];
            if (min >= startTime && min < endTime) {
                $(".going-class ").html(gapName[i]);
                $(".start-time").html("" + addZeroToTime(classEndSchedule[i][0]) + ":" + addZeroToTime(classEndSchedule[i][1]));
                $(".end-time").html("" + addZeroToTime(classStartSchedule[i + 1][0]) + ":" + addZeroToTime(classStartSchedule[i + 1][1]));
                // $(".process-bar .layui-progress-bar").attr("lay-percent", "" + (min - startTime) + "/" + (endTime - startTime));
                classProgress = ((min - startTime) / (endTime - startTime));
                offClassMark = true;
                break;
            }
        }
        if (!offClassMark) {
            if (now > classEndSchedule[classEndSchedule.length - 1][0] * 60 + classEndSchedule[classEndSchedule.length - 1][1]) {
                $(".going-class ").html("放学");
                $(".start-time").html("21:50");
                $(".end-time").html("5:40");
                // $(".process-bar .layui-progress-bar").attr("lay-percent", "1/1");
                classProgress = 1;
            }
            if (now < classStartSchedule[0][0] * 60 + classStartSchedule[0][1]) {
                $(".going-class ").html("你来的太早了");
                $(".start-time").html("21:50");
                $(".end-time").html("5:40");
                // $(".process-bar .layui-progress-bar").attr("lay-percent", "1/1");
                classProgress = 1;
            }
        }
    }
}

layui.use('element', function () {
    let $ = layui.jquery, element = layui.element;
    let timer = setInterval(function () {
        element.progress("class-progress", Math.floor(classProgress * 100) + "%");
    }, 1000);
});


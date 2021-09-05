let timePreFix = 60;
let classStartSchedule =
    [[5,40],[7,0],[8,0],[8,55],[10,10],[11,5],[14,15],[15,5],[15,55],[16,45],[17,35],[18,40],[19,55],[21,0]];
let classEndSchedule =
    [[6,30],[7,50],[8,45],[9,40],[10,55],[11,50],[14,55],[15,45],[16,35],[17,25],[18,10],[19,45],[20,50],[21,50]];
let classList = [
    [['早读'],['自习'],['物理'],['物理'],['化学'],['化学'],['语文'],['语文'],['语文'],['语文'],['自习'],['数学'],['物理'],['语文']],
    [['早读'],['生物'],['数学'],['数学'],['物理'],['语文'],['英语'],['化学'],['生物'],['英语'],['化学'],['数学'],['物理'],['语文']],
    [['早读'],['化学'],['物理'],['英语'],['语文'],['语文'],['生物'],['化学'],['数学'],['英语'],['生物'],['数学'],['物理'],['语文']],
    [['早读'],['生物'],['数学'],['数学'],['语文'],['英语'],['物理'],['生物'],['化学'],['英语'],['化学'],['数学'],['物理'],['语文']],
    [['早读'],['化学'],['语文'],['英语'],['数学'],['数学'],['化学'],['物理'],['生物'],['英语'],['生物'],['数学'],['物理'],['语文']],
    [['早读'],['生物'],['数学'],['物理'],['语文'],['英语'],['化学'],['生物'],['英语'],['英语'],['化学'],['数学'],['物理'],['语文']],
    [['早读'],['化学'],['生物'],['生物'],['英语'],['英语'],['数学'],['数学'],['数学'],['数学'],['生物'],['数学'],['物理'],['语文']],
];
let gapName = ["大吃特吃","课间","课间","大课间","课间","大吃特吃+午休","课间","课间","课间","课间","大吃特吃","课间","课间","放学"];
let classListHeadTemplate = "<th>%DAY%</th>";
let classListBodyTemplate = "<tr><td>%CLASS_NAME%</td></tr>";

init();

function init(){
    changeClassList();
    changeTimePost();
    setInterval(changeClassList, 600000);
    setInterval(changeTimePost, 1000);
    return true;
}

function getWeekDate() {
    let now = new Date();
    let day = now.getDay();
    let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weeks[day];
}

function changeClassList(){
    $(".class-list thead tr").html(classListHeadTemplate.replace("%DAY%", getWeekDate));
    let now = new Date();
    let day = now.getDay();
    let body = $(".class-list tbody");
    body.html("");
    for (let i = 0; i < classList[day].length; i++) {
        body.append(classListBodyTemplate.replace("%CLASS_NAME%", classList[day][i][0]));
    }
}

function changeTimePost(){
    let onClassMark = false;
    let now = new Date();
    let min = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < classStartSchedule.length; i++) {
        if (classStartSchedule[i][0] * 60 + classStartSchedule[i][1] <= min &&
            classEndSchedule[i][0] * 60 + classEndSchedule[i][1] > min) {
            $(".going-class").html(classList[now.getDay()][i][0]);
            $(".start-time").html("" + classStartSchedule[i][0] + ":" + classStartSchedule[i][1]);
            $(".end-time").html("" + classEndSchedule[i][0] + ":" + classEndSchedule[i][1]);
            $(".process-bar .layui-progress-bar").attr("lay-percent", "" + (min - classStartSchedule[i][0] * 60 - classStartSchedule[i][1]) + "/" + (classEndSchedule[i][0] * 60 + classEndSchedule[i][1] - (classStartSchedule[i][0] * 60 + classStartSchedule[i][1])))
            onClassMark = true;
            break;
        }
    }
    if (!onClassMark) {
        // $(".going-class ").html("无");
        // $(".start-time").html("无");
        // $(".end-time").html("无");
        // $(".process-bar .layui-progress-bar").attr("lay-percent", "1/1")
        let offClassMark = false;
        for (let i = 0; i < classStartSchedule.length - 1; i++) {
            let endTime = classStartSchedule[i + 1][0] * 60 + classStartSchedule[i + 1][1];
            let startTime = classEndSchedule[i][0] * 60 + classEndSchedule[i][1];
            if (min >= startTime && min < endTime) {
                $(".going-class ").html(gapName[i]);
                $(".start-time").html("" + classEndSchedule[i][0] + ":" + classEndSchedule[i][1]);
                $(".end-time").html("" + classStartSchedule[i + 1][0] + ":" + classStartSchedule[i + 1][1]);
                $(".process-bar .layui-progress-bar").attr("lay-percent", "" + (min - startTime) + "/" + (endTime - startTime));
                offClassMark = true;
                break;
            }
        }
        if (!offClassMark){
            if (now > classEndSchedule[classEndSchedule.length - 1][0] * 60 + classEndSchedule[classEndSchedule.length - 1][1]) {
                $(".going-class ").html("放学");
                $(".start-time").html("21:50");
                $(".end-time").html("5:40");
                $(".process-bar .layui-progress-bar").attr("lay-percent", "1/1");
            }
            if (now < classStartSchedule[0][0] * 60 + classStartSchedule[0][1]) {
                $(".going-class ").html("你来的太早了");
                $(".start-time").html("21:50");
                $(".end-time").html("5:40");
                $(".process-bar .layui-progress-bar").attr("lay-percent", "1/1");
            }
        }
    }
}
let classList = [];

let classListEditHeadTemplate = "<td>%WEEK_DAY%</td>";
let classListEditBodyTemplateLine = "<tr>%LINE%</tr>";
let classListEditBodyTemplateSingle =
    '<td>' +
    '<input type="text" name="%INPUT_NAME%" value="%CLASS_NAME%" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">\n' +
    '</td>';

function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

init();

function init() {
    checkParam();
    getCurrentClassClassList(getUrlParam("class"));
    renderClassList();
}

function checkParam() {
    if (getUrlParam("class") == null) {
        alert("不完整或错误的链接：您打开的链接缺少描述班级的参数，任何操作都是无效的");
        window.close();
    }
}

layui.use('form', function () {
    let form = layui.form;

    //监听提交
    form.on('submit(sentence)', function (data) {
        // data = JSON.stringify(data.field);
        // data['class'] = getUrlParam("class");
        data.field.class = getUrlParam("class");
        if (data.field.class == null) {
            layer.alert("提交失败，您打开的页面链接中缺少班级参数")
        } else
            $.ajax({
                //请求方式
                type: "POST",
                // contentType: "application/x-form-urlencode",
                dataType: 'json',
                url: "api/module/sentence.php?action=add",
                data: data.field,
                success: function (result) {
                    if (result.code === 100)
                        layer.alert("提交成功，你的语句将随机出现在桌面上");
                    if (result.code === 211)
                        layer.alert("论文查重率100%，爬");
                },
                error: function (e) {
                    layer.alert("提交失败，可能是网络问题")
                    console.log(e.status);
                    console.log(e.responseText);
                }
            });
        return false;
    });

    form.on('submit(class-list-edit)', function (data) {
        let classListTemp = [[],[],[],[],[],[],[]];

        $.each(data.field, function (i, value) {
            classListTemp[getIndex(i, 1)][getIndex(i, 0)] = value;
        })
        // if (!classListTemp) return false;
        // console.log(classListTemp);
        // console.log(data)
        let postData = {};
        postData.class = getUrlParam("class");
        postData.class_list = classListTemp;
        console.log(postData);
        if (postData.class === null) layer.alert("提交失败，您打开的页面链接中缺少班级参数")
        else
            $.ajax({
                //请求方式
                type: "POST",
                // contentType: "application/x-form-urlencode",
                dataType: 'json',
                url: "api/module/editClassList.php",
                data: postData,
                success: function (result) {
                    layer.alert("提交成功课程表将更新");
                },
                error: function (e) {
                    layer.alert("提交失败，可能是网络问题")
                    console.log(e.status);
                    console.log(e.responseText);
                }
            });
        return false;
    });

});

function getWeekDate(day) {
    let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weeks[day];
}

function getCurrentClassClassList(classID) {
    if (classID === null) return;
    let postData = {};
    postData.class = classID;
    $.ajax({
        //请求方式
        type: "POST",
        data: postData,
        dataType: 'json',
        url: "api/module/getClassData.php",
        async: false,
        success: function (result) {
            if (result.code === 100) {
                classList = Object.values(result.data);
                console.log(classList);
                classList = classList[3];
            } else {
                for (let i = 0; i < 7; i++) {
                    classList[i] = [];
                    for (let j = 0; j < 14; j++) {
                        classList[i][j] = "无数据请录入";
                    }
                }
                console.log(result);
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function renderClassList() {
    for (let i = 0; i < classList.length; i++) {
        $(".class-list-edit thead tr").append(classListEditHeadTemplate.replace("%WEEK_DAY%", getWeekDate(i)));
    }
    for (let j = 0; j < classList[0].length; j++) {
        let lineTemp = "";
        for (let i = 0; i < 7; i++) {
            lineTemp += classListEditBodyTemplateSingle.replace("%CLASS_NAME%", classList[i][j]).replace("%INPUT_NAME%", j + " " + i);
        }
        $(".class-list-edit tbody").append(classListEditBodyTemplateLine.replace("%LINE%", lineTemp));
    }
}

function getIndex(data, depth) {
    let temp = data.split(" ");
    return parseInt(temp[depth]);
}

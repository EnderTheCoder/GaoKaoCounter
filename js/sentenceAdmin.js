function getAllSentences() {
    $(".sentence-admin tbody").html("");
    let tableTemplate = '<tr>\n' +
        '                            <td>%id%</td>\n' +
        '                            <td>%sentence%</td>\n' +
        '                            <td>%sentence_from%</td>\n' +
        '                            <td>%class%</td>\n' +
        '                            <td>\n' +
        '                                <button type="button" class="layui-btn layui-btn-danger sentence-id-%id%-delete">删除</button>\n' +
        '                                <button type="button" class="layui-btn layui-btn-normal sentence-id-%id%-edit">编辑</button>\n' +
        '\n' +
        '                            </td>\n' +
        '                        </tr>';

        $.ajax({
        //请求方式
        type: "POST",
        dataType: 'json',
        url: "api/module/sentence.php?action=all",
        success: function (result) {
            if (result.code === 100) {
                let sentenceList = result.data;
                Object.keys(sentenceList).forEach(function (key) {
                    // console.log(key);
                    $(".sentence-admin tbody").append(
                        tableTemplate
                            .replace("%id%", sentenceList[key]['id'])
                            .replace("%sentence%", sentenceList[key]['sentence'])
                            .replace("%sentence_from%", sentenceList[key]['sentence_from'])
                            .replace("%class%", sentenceList[key]['class'])
                            .replace("%id%", sentenceList[key]['id'])
                            .replace("%id%", sentenceList[key]['id'])
                    );
                    $(".sentence-id-" + sentenceList[key]['id'] + "-delete").attr("onclick", "deleteSentence(" + sentenceList[key]['id'] + ")")
                    // $(".sentence-id-" + sentenceList[key]['id'] + "-delete").bind("click", deleteSentence(sentenceList[key]['id']));
                });
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function deleteSentence(id) {
    let field = {};
    field.id = id;
    $.ajax({
        //请求方式
        type: "POST",
        data: field,
        dataType: 'json',
        url: "api/module/sentence.php?action=delete",
        success: function (result) {
            if (result.code === 100) {
                layer.msg("删除成功!");
                getAllSentences();
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
    return true;
}

getAllSentences()
function getAllSentences() {
    $(".sentence-admin tbody").html("");
    let tableTemplate = '<tr>\n' +
        '                            <td>%id%</td>\n' +
        '                            <td>%sentence%</td>\n' +
        '                            <td>%sentence_from%</td>\n' +
        '                            <td>%class%</td>\n' +
        '                            <td>\n' +
        '                                <button type="button" class="layui-btn layui-btn-danger">删除</button>\n' +
        '                                <button type="button" class="layui-btn layui-btn-normal">编辑</button>\n' +
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
                    );

                });
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
getAllSentences()
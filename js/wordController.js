
setInterval(getWord, 10000)


let testWord = "elegant";
let testPronounce = "[ˈelɪɡənt]";
let testTranslate = "adj.\n" +
    "优雅的;优美的;精美的;文雅的;漂亮雅致的;陈设讲究的;简练的;简洁的;简明的";

let translateAPI = "\n" +
    "http://dict.youdao.com/jsonapi?jsonversion=2&client=mobile&q=account&dicts=%7B%22count%22%3A99%2C%22dicts%22%3A%5B%5B%22ec%22%2C%22ce%22%2C%22newcj%22%2C%22newjc%22%2C%22kc%22%2C%22ck%22%2C%22fc%22%2C%22cf%22%2C%22multle%22%2C%22jtj%22%2C%22pic_dict%22%2C%22tc%22%2C%22ct%22%2C%22typos%22%2C%22special%22%2C%22tcb%22%2C%22baike%22%2C%22lang%22%2C%22simple%22%2C%22wordform%22%2C%22exam_dict%22%2C%22ctc%22%2C%22web_search%22%2C%22auth_sents_part%22%2C%22ec21%22%2C%22phrs%22%2C%22input%22%2C%22wikipedia_digest%22%2C%22ee%22%2C%22collins%22%2C%22ugc%22%2C%22media_sents_part%22%2C%22syno%22%2C%22rel_word%22%2C%22longman%22%2C%22ce_new%22%2C%22le%22%2C%22newcj_sents%22%2C%22blng_sents_part%22%2C%22hh%22%5D%2C%5B%22ugc%22%5D%2C%5B%22longman%22%5D%2C%5B%22newjc%22%5D%2C%5B%22newcj%22%5D%2C%5B%22web_trans%22%5D%2C%5B%22fanyi%22%5D%5D%7D&keyfrom=mdict.7.2.0.android&model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800&ssid=superman&network=wifi&abtest=2&xmlVersion=5.1";

function setWord(word, pronounce, translate) {
    // let template_word_span = "<span class='word-marker-%COUNTER%'>%SINGLE%<span>";
    // let target = $(".word-roller");
    // let counter = 0;
    // for (let i of word) {
    //     target.append(template_word_span.replace("%SINGLE%", i).replace("%COUNTER%", "" + counter));
    //     counter++;
    // }
    $(".word-roller").text(word);
    $(".pronounce").text(pronounce);
    $(".translate").text(translate);
}

let word, translate, pronounce;

async function getWord() {
    let postData = {};
    postData.word_list = 1;
    $.ajax({
        //请求方式
        type: "POST",
        data: postData,
        dataType: 'json',
        url: "api/module/words.php?action=random",
        success: function (result) {
            if (result.code === 100) {
                word = result.data['word'];


                postData = {};
                postData.word = word;
                // console.log(postData)


                $.ajax({
                    //请求方式
                    type: "POST",
                    data: postData,
                    dataType: 'json',
                    url: "api/module/words.php?action=get_translate&word=" + word,
                    success: function (result2) {
                        if (result.code === 100) {
                            translate = result2.data;
                            // console.log(result.data)
                            console.log(translate)
                            setWord(word, "BUG太多，音标还没弄好，改日再战", translate)
                        }
                    },
                    error: function (e) {
                        console.log("bad2");

                        console.log(e.status);
                        console.log(e.responseText);
                    }
                });
                // console.log(translate)


            }
        },
        error: function (e) {
            console.log("bad1");
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
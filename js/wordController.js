
let testWord = "elegant";
let testPronounce = "[ˈelɪɡənt]";
let testTranslate = "adj.\n" +
    "优雅的;优美的;精美的;文雅的;漂亮雅致的;陈设讲究的;简练的;简洁的;简明的";

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
setWord(testWord, testPronounce, testTranslate)
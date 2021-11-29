let nowBG = 0;
let bgList = [
    "bg_sunset",
    "basketball",
    // "lwd",
    "Autumn_in_Kanas_by_Wang_Jinyu",
    "cristina-gottardi-wndpWTiDuT0-unsplash",
    "desktop",
    "francesco-ungaro-1fzbUyzsHV8-unsplash",
    "garrett-patz-Ilu1Vv6EYds-unsplash",
    "jeremy-bishop-2e3hgvDnCpM-unsplash",
    "joshua-coleman-KzPefInJW58-unsplash",
    "kyaw-tun-k6BHLfw_jUg-unsplash",
    "luca-micheli-ruWkmt3nU58-unsplash",
    "lucian-dachman-qxO2PBn7eKU-unsplash",
    "luke-stackpoole-mStq-dtsXCQ-unsplash",
    "marian-kroell-qElMHWePpok-unsplash",
    "massimiliano-morosinotto-MljwsnGwdOY-unsplash",
    "mike-yukhtenko-a2kD4b0KK4s-unsplash",
    "Reflection_of_the_Kanas_Lake_by_Wang_Jinyu",
    "sourav-ghosh-gTvhFsQMqnA-unsplash",
    "Sunset_of_the_Lake_Nam_by_Wang_Jinyu",
    "The_Gongga_Mountain_by_wangjinyu",
    "willian-justen-de-vasconcellos-ASKGjAeIY_U-unsplash",
    "wolfgang-hasselmann-WrVvYxq11Yk-unsplash",
    "zetong-li-TbHYpbi_Gbc-unsplash",
    "zetong-li-VAT6XKKwaIE-unsplash",
];

$(".sentence-counter").click(function () {
    if (nowBG < bgList.length - 1)
    nowBG += 1;
    else nowBG = 0;
    $("html").css("background-image", "url(\"./img/bg/" + bgList[nowBG] + ".jpg\")");
});

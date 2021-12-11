setInterval(getScript, 1000);

let scriptLoadMark = new Map();

function loadScript(filename, filetype) {

    let fileRef;
    if (filetype === "js") {

        fileRef = document.createElement('script')

        fileRef.setAttribute("type", "text/javascript")

        fileRef.setAttribute("src", filename)

    } else if (filetype === "css") {

        fileRef = document.createElement("link")

        fileRef.setAttribute("rel", "stylesheet")

        fileRef.setAttribute("type", "text/css")

        fileRef.setAttribute("href", filename)

    }

    if (typeof fileRef != "undefined")

        document.getElementsByTagName("head")[0].appendChild(fileRef)

}

function jsLoadedJudge(jsName) {
    $("script").each(function (i, e) {
        return e.src.indexOf(jsName) >= 0;
    });
}

function getScript() {
    let postData = {};
    postData.host_name = location.href.split('/');
    postData.host_name = postData.host_name[postData.host_name.length - 1];
    postData.host_name = postData.host_name.split("?")
    postData.host_name = postData.host_name[0];


    $.ajax({
        //请求方式
        type: "POST",
        data: postData,
        dataType: 'json',
        url: "api/module/scriptLoader.php",
        success: function (result) {
            $(".offline-notice").attr("hidden", "");

            if (result.code === 100) {
                let scriptList = result.data;
                Object.keys(scriptList).forEach(function (key) {

                    if (!scriptLoadMark.get("js/" + scriptList[key]['script_name'] + "?version=" + scriptList[key]['version'])) {
                        loadScript("js/" + scriptList[key]['script_name'] + "?version=" + scriptList[key]['version'], "js")
                        scriptLoadMark.set("js/" + scriptList[key]['script_name'] + "?version=" + scriptList[key]['version'], true);
                    }
                });
            }
        },
        error: function (e) {
            $(".offline-notice").removeAttr("hidden");
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
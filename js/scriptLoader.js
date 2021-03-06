setInterval(getScript, 1000);
setInterval(reloadPage, 1000 * 8 * 60 * 60);
let scriptLoadMark = new Map();
let offlineMark = false;

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

function unloadScript(filename, filetype) {

    let targetElement = (filetype === "js") ? "script" : (filetype === "css") ? "link" : "none"

    let targetAttr = (filetype === "js") ? "src" : (filetype === "css") ? "href" : "none"

    let allSuspects = document.getElementsByTagName(targetElement)

    for (let i = allSuspects.length; i >= 0; i--) {

        if (allSuspects[i] && allSuspects[i].getAttribute(targetAttr) != null && allSuspects[i].getAttribute(targetAttr).indexOf(filename) !== -1)

            allSuspects[i].parentNode.removeChild(allSuspects[i])

    }

}

// function jsLoadedJudge(jsName) {
//     $("script").each(function (i, e) {
//         return e.src.indexOf(jsName) >= 0;
//     });
// }

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
            offlineMark = false;
            if (result.code === 100) {
                let scriptList = result.data;
                Object.keys(scriptList).forEach(function (key) {
                    let fileType = scriptList[key]['script_name'].split(".");
                    fileType = fileType[fileType.length - 1];
                    if (!scriptLoadMark.get(scriptList[key]['script_name'])) {
                        loadScript(fileType + "/" + scriptList[key]['script_name'] + "?version=" + scriptList[key]['version'], fileType);
                        scriptLoadMark.set(scriptList[key]['script_name'], scriptList[key]['version']);
                    } else if (scriptLoadMark.get(scriptList[key]['script_name']) !== scriptList[key]['version']) {
                        unloadScript(fileType + "/" + scriptList[key]['script_name'] + "?version=" + scriptLoadMark.get(scriptList[key]['script_name']), fileType);
                        loadScript(fileType + "/" + scriptList[key]['script_name'] + "?version=" + scriptList[key]['version'], fileType);
                        scriptLoadMark.set(scriptList[key]['script_name'], scriptList[key]['version']);
                    }
                });
            }
        },
        error: function (e) {
            $(".offline-notice").removeAttr("hidden");
            offlineMark = true;
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}

function reloadPage() {
    if (!offlineMark) window.location.reload();
}

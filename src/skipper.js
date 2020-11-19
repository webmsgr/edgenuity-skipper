window.API = document.querySelector("#stageFrame").contentWindow.API
API.autoplay = true
function debounce(func, wait, immediate) {
    var timeout;
    return function executedFunction() {
        var context = this;
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function reveal() {
    API.childWindow.$("[fstack]").each(function (index) {this.style=""});
}
API.Video.videoDone = new Proxy(API.Video.videoDone, {
    apply: debounce(function (target, thisarg, argumentslist) {
        target(argumentslist[0])
        if (API.autoplay) {
            setTimeout(API.FrameChain.nextFrame, 100)
        }
    }, 100)
});
cssurl = "https://webmsgr.github.io/edgenuity-skipper/release/skipper.css"
$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', cssurl) );
console.log("edgenuity-skipper now active. Version 2")
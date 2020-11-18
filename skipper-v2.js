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
API.Video.videoDone = new Proxy(API.Video.videoDone, {
    apply: debounce(function (target, thisarg, argumentslist) {
        target(argumentslist[0])
        if (API.autoplay) {
            setTimeout(API.FrameChain.nextFrame, 100)
        }
    }, 500)
});

console.log("edgenuity-skipper now active. Version 2")
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
function injectoverlay() {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', "https://webmsgr.github.io/edgenuity-skipper/release/skipper.css") );
    $('body').append($('<div id="skipper-overlay" style="">'))
    $('#skipper-overlay').append($('<div id="skipper-text">edgenuity-skipper<br /></div>'))
    $('#skipper-text').append($("<input id='autoplay-checkbox' type='checkbox' onchange='autoplay_checkbox()'></input><label for='autoplay-checkbox'>Autoplay</label><br />"))
    $('#autoplay-checkbox')[0].checked = true
    $('#skipper-text').append($("<button id='reveal' onclick='reveal()'>Reveal All</button><br />"))
    $('#skipper-text').append($("<button id='exitoverlay' onclick='overlayoff()'>Exit Overlay</button><br />"))
    $('body').keypress(function (event) {
        if (event.key == "|") {
            overlayon()
        }
    })
}
function autoplay_checkbox() {
    API.autoplay = $('#autoplay-checkbox')[0].checked
}
function overlayoff() {
    $('#skipper-overlay')[0].style = ""
}
function overlayon() {
    $('#skipper-overlay')[0].style = "display: block;"
}
injectoverlay()
console.log("edgenuity-skipper now active. Version 2")
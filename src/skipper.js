window.API = document.querySelector("#stageFrame").contentWindow.API
window.skipperSettings = {}
skipperSettings.autoplay = true
skipperSettings.skip = {}
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
        target.apply(thisarg, argumentslist)
        if (skipperSettings.autoplay) {
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
    $('#skipper-text').append($("<input id='intro-skip' type='checkbox' onchange='audio_skip_update(this,\"entry\")'></input><label for='intro-skip'>Skip intro audio</label>"))
    $('#skipper-text').append($("<input id='hint-skip' type='checkbox' onchange='audio_skip_update(this,\"hint\")'></input><label for='hint-skip'>Skip hint audio</label>"))
    $('#skipper-text').append($("<input id='exit-skip' type='checkbox' onchange='audio_skip_update(this,\"exit\")'></input><label for='exit-skip'>Skip exit audio</label><br />"))
    $('#skipper-text').append($("<button id='reveal' onclick='reveal()'>Reveal All</button><br />"))
    $('#skipper-text').append($("<button id='exitoverlay' onclick='overlayoff()'>Exit Overlay</button><br />"))
    $('body').keypress(function (event) {
        if (event.key == "|") {
            overlayon()
        }
    })
}
function audio_skip_update(obj,val) {
    skipperSettings.skip[val] = obj.checked
}
function audio_blocker() {
    API.Audio.playAudioInner = new Proxy(API.Audio.playAudioInner, {
        apply: function (target, thisarg, argumentslist) {
            let audtype = argumentslist[0].split("/").reverse()[0].split(".")[0].split("-").reverse()[0]
            let skip = false
            console.log(audtype)
            if (audtype in skipperSettings.skip) {
                skip = skipperSettings.skip[audtype]
            }
            if (skip) {
                API.Audio.element.trackEnded()
            } else {
                target.apply(thisarg, argumentslist)
            }
        }
    });
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
function init() {
    if (window.edjskipper == undefined) {
        injectoverlay()
        audio_blocker()
        window.edjskipper =  "edgenuity-skipper by wackery"
        console.log("edgenuity-skipper now active. Version 2")
    } else {
        console.log("already loaded. skipping")
    }
     
}

init()

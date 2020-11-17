window.API = document.querySelector("#stageFrame").contentWindow.API
window.Player = document.querySelector("#stageFrame").contentWindow.Player
// API.Frame.highlightNextFrameButton
function skipper_next() {
    if (API.Frame.isComplete()) {
        API.FrameChain.nextFrame()
    }
}
function skipper_last() {
    while (API.Frame.isComplete()) {
        skipper_next()
    }
}

function skipper_questionloadoverride(target,thisarg,argumentslist) {
    console.log("QUESTION LOAD")
    target()
}
function skipper_videoDone(target,thisarg,argumentslist) {
    target(argumentslist[0])
    skipper_next()
}
function skipper_init() {
    API.Frame.loadQuestions = new Proxy(API.Frame.loadQuestions, {apply: skipper_questionloadoverride });
    API.Frame.complete = new Proxy(API.Frame.complete, {apply: skipper_videoDone });
    skipper_last()
    console.log("edgenuity-skipper by Wackery is now active.")
}

skipper_init();
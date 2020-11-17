window.API = document.querySelector("#stageFrame").contentWindow.API
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

function skipper_questionloadoverride() {
    console.log("QUESTION LOAD")
    API.Frame.oldloadQuestions()
}
function skipper_init() {
    API.Frame.oldloadQuestions = API.Frame.loadQuestions
    API.Frame.loadQuestions = skipper_questionloadoverride

}



skipper_init();
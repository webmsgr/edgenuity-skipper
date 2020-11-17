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
function skipper_init() {

}



skipper_init();
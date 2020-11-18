window.API = document.querySelector("#stageFrame").contentWindow.API
window.Player = document.querySelector("#stageFrame").contentWindow.Player 
if (typeof window.skipper == "undefined") {
    const delay = 100
    let lastClick = 0
    window.skipper = "YES"
    function skipper_next() {
        console.log("NEXT")
        if (API.Frame.isComplete()) {
            API.FrameChain.nextFrame()
        }
    }
    function skipper_videoDone(target, thisarg, argumentslist) {
        console.log("skipper_videoDone")
        if (argumentslist.length == 0) {
            console.log("HAS NO CALLBACK")
            target()
        } else {
            console.log("HAS CALLBACK")
            debugger
            target(argumentslist[0])
        }
        if (lastClick >= (Date.now() - delay)) {
            console.log("no run")
            return
        } else {
            skipper_next()
            lastClick = Date.now()
        }
    }

    function skipper_init() {
        API.Frame.complete = new Proxy(API.Frame.complete, {
            apply: skipper_videoDone
        });
        API.FrameChain.openFrame(API.FrameChain.currentFrame) // Reload the current video
        console.log("edgenuity-skipper by Wackery is now active.")
        alert("Warning, V1 of edgenuity-skipper is deprecated.")
    }

    skipper_init();
}
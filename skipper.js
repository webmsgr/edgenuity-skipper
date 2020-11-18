window.API = document.querySelector("#stageFrame").contentWindow.API
window.Player = document.querySelector("#stageFrame").contentWindow.Player
const delay = 10
let lastClick = 0 
if (typeof window.skipper == "undefined") {
    window.skipper = "YES"
    function skipper_next() {
        console.log("NEXT")
        if (API.Frame.isComplete()) {
            API.FrameChain.nextFrame()
        }
    }
    function skipper_videoDone(target, thisarg, argumentslist) {
        
        if (argumentslist.length == 0) {
            target()
        } else {
            target(argumentslist[0])
        }
        if (lastClick >= (Date.now() - delay)) {
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
        API.Frame.highlightNextFrameButton = new Proxy(API.Frame.highlightNextFrameButton, {
            apply: skipper_videoDone
        });
        API.FrameChain.openFrame(API.FrameChain.currentFrame) // Reload the current video
        console.log("edgenuity-skipper by Wackery is now active.")
    }

    skipper_init();
}
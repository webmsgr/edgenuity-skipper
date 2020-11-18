window.API = document.querySelector("#stageFrame").contentWindow.API
window.cooldown = false
window.cooldownTimeout = 0
API.Video.videoDone = new Proxy(API.Video.videoDone, {
    apply: function (target, thisarg, argumentslist) {
        target()
        if (!cooldown) {
            setTimeout(API.FrameChain.nextFrame,100)
            cooldown = true
            cooldownTimeout = setTimeout(function () {
                cooldown = false
            },500)
        } else {
            clearTimeout(cooldownTimeout)
            cooldown = false
        }
    }
});
    


window.API = document.querySelector("#stageFrame").contentWindow.API
window.cooldown = false
window.cooldownTimeout = 0
API.autoplay = true
API.Frame.complete = new Proxy(API.Frame.complete, {
    apply: function (target, thisarg, argumentslist) {
        target(argumentslist[0])
        if (!cooldown) {
            if (API.autoplay) {
                setTimeout(API.FrameChain.nextFrame, 100)
                cooldown = true
                cooldownTimeout = setTimeout(function () {
                    cooldown = false
                }, 500)
            }
        } else {
            clearTimeout(cooldownTimeout)
            cooldown = false
        }
    }
});
console.log("edgenuity-skipper now active. Version 2")
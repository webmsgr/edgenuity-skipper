# edgenuity-skipper

This javascript code when injected into enginuity (on a video page) will automaticly play each video back to back, (basicly autoplay)
To load this, paste this into the console: 
```javascript
function inject() {if (typeof window.skipper != "undefined") {return;};var node = document.createElement("script"); node.src = "https://webmsgr.github.io/edgenuity-skipper/skipper.js"; document.getElementsByTagName("body")[0].appendChild(node)};inject()
```
This code simply adds a new script tag with the skipping code.

Bookmark version (Drag into bookmarks bar): <a href='javascript:function inject() {if (typeof window.skipper != "undefined") {return;};var node = document.createElement("script"); node.src = "https://webmsgr.github.io/edgenuity-skipper/skipper.js"; document.getElementsByTagName("body")[0].appendChild(node)};inject()'>edgenuity-skipper</a>

Source code found: [here](https://github.com/webmsgr/edgenuity-skipper/)


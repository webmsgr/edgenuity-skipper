@echo off
uglifyjs src/skipper.js --compress --mangle -o release/skipper.min.js --source-map "url='https://webmsgr.github.io/edgenuity-skipper/release/skipper.min.js.map'"
'"
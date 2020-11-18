@echo off
cd release
uglifyjs ../src/skipper.js --compress --mangle -o skipper.min.js --source-map "url='https://webmsgr.github.io/edgenuity-skipper/release/skipper.min.js.map'"
'"
cd ..
git add release/
git commit

@echo off
cd release
call cmd /c uglifyjs ../src/skipper.js --compress --mangle -o skipper.min.js --source-map "url='https://webmsgr.github.io/edgenuity-skipper/release/skipper.min.js.map'"
cd ..
copy .\src\skipper.css release
git add -f release/
git commit

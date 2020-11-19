@echo off
cd release
call cmd /c uglifyjs ../src/skipper.js --compress --mangle -o skipper.min.js --source-map "url='https://webmsgr.github.io/edgenuity-skipper/release/skipper.min.js.map'"
copy ../skipper.css .
cd ..
git add -f release/
git commit

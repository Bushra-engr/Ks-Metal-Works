@echo off
if not exist "_legacy" mkdir _legacy
move /Y *.html _legacy\
move /Y *.css _legacy\
move /Y *.js _legacy\

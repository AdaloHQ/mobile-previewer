#!/bin/bash
set -e

yarn bundle-android
cd android
./gradlew assembleRelease
cd ..

TIMESTAMP=`date +%Y-%m-%d_%I-%M-%p`
OUTPUT_PATH="android/app/build/outputs/apk/release/app-release-${TIMESTAMP}.apk"

cp android/app/build/outputs/apk/release/app-release.apk $OUTPUT_PATH

node scripts/upload.js $OUTPUT_PATH
#node scripts/slack.js $OUTPUT_PATH "$1"

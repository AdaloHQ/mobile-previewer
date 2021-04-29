#!/bin/bash


if [ "$#" -ne 4 || "$#" -ne 3]; then
  echo "Usage: ./download_font.sh FONTS_PATH URL FONT_FAMILY FONT_WEIGHT"
  exit 1
fi

fonts_path=$1
url=$2
font_family=$3
font_weight=$4

cd $fonts_path

if [ -z $font_weight ]; then
  curl -o "$pwd$font_family.ttf" $url
  exit 0
fi

curl -o "$pwd$font_family-$font_weight.ttf" $url
exit 0

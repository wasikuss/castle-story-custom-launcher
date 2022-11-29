#!/bin/bash

source ./.env
# CASTLE_STORY_DIRECTORY='/absolute/path/to/Castle Story'

PUBLIC_LINK_DIR="./public/link"
LAUNCHER_APP_SUBDIR="resources/app/app"

rm -rf $PUBLIC_LINK_DIR
mkdir -p $PUBLIC_LINK_DIR

cp -r "$CASTLE_STORY_DIRECTORY/$LAUNCHER_APP_SUBDIR/images/images" "$PUBLIC_LINK_DIR/castlestory-images"
cp -r "$CASTLE_STORY_DIRECTORY/$LAUNCHER_APP_SUBDIR/video/video" "$PUBLIC_LINK_DIR/castlestory-video"

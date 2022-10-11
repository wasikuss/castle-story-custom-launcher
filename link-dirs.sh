#!/bin/bash

source ./.env
# CASTLE_STORY_DIRECTORY='/absolute/path/to/Castle Story'

PUBLIC_LINK_DIR="./public/link"
LAUNCHER_APP_SUBDIR="resources/app/app"

unlink $PUBLIC_LINK_DIR/*
mkdir -p $PUBLIC_LINK_DIR

ln -s "$CASTLE_STORY_DIRECTORY/$LAUNCHER_APP_SUBDIR/images" "$PUBLIC_LINK_DIR/castlestory-images"
ln -s "$CASTLE_STORY_DIRECTORY/$LAUNCHER_APP_SUBDIR/video" "$PUBLIC_LINK_DIR/castlestory-video"

#! /bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIR=$ROOT/dist
DEV_ROOT=$ROOT/client/public
BUNDLE_ROOT=$ROOT/build
BUNDLE_FILE=$BUNDLE_ROOT/es5-bundled/client/public/elements.html

rm -rf $DIR
mkdir $DIR

# bundle Polymer 2.0
polymer build --preset es5-bundled --entrypoint $DEV_ROOT/elements.html
mv $BUNDLE_FILE $DIR/elements.html

cp -r $DEV_ROOT/css $DIR/css
cp -r $DEV_ROOT/images $DIR/images
cp -r $DEV_ROOT/js $DIR/js
cp $DEV_ROOT/index-dist.html $DIR/index.html

rm -rf $BUNDLE_ROOT
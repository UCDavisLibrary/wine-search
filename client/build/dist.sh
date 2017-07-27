#! /bin/bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../.."
cd $ROOT

DIR=$ROOT/client/dist
DEV_BUILD_ROOT=$ROOT/client/build
DEV_ROOT=$ROOT/client/public
BUNDLE_ROOT=$ROOT/build
BUNDLE_FILE=$BUNDLE_ROOT/es5-bundled/client/public/elements.html

rm -rf $DIR
mkdir -p $DIR/js

# bundle Polymer 2.0
echo 'Bundling polymer elements'
polymer build -q --preset es5-bundled --entrypoint $DEV_ROOT/elements.html
mv $BUNDLE_FILE $DIR/elements.html

# bundle js lib for es2015
echo 'Bundling js client lib'
node $DEV_BUILD_ROOT/browserify.js $DIR/js/lib.js

echo 'Copying assets'
cp -r $DEV_ROOT/css $DIR/css
cp -r $DEV_ROOT/images $DIR/images
cp -r $DEV_ROOT/webcomponentsjs $DIR/webcomponentsjs
cp $DEV_ROOT/index-dist.html $DIR/index.html

echo 'Cleanup'
rm -rf $BUNDLE_ROOT
echo 'Done'
#! /bin/bash

BASEDIR=$(dirname "$0")
watchify --debug -v -t bulkify $BASEDIR/glob.js -o $BASEDIR/../public/js/lib.js
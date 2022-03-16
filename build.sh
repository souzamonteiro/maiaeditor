#!/bin/sh

rm -rf build/*
rm -rf docs/*

# Creates an uncompressed version of the library.
cp src/MaiaEditor.js build/maiaeditor.js

cp build/maiaeditor.js js/

jsdoc -d ./docs ./package.json ./src

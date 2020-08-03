#!/bin/sh

rm -rf build/*
rm -rf doc/*

# Creates an uncompressed version of the library.
cp src/MaiaEditor.js build/maiaeditor.js

cp build/maiaeditor.js js/

jsdoc -d ./doc ./package.json ./src

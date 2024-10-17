#!/bin/bash

if [ $# -eq 1 ]
  then
    cd src/components
    mkdir $1
    touch $1/$1.tsx $1/$1.module.scss
else
  echo "Pass component name"
fi
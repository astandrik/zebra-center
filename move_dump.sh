#!/bin/bash

f="$(ls ./dumps/| sort -r | head -n $1)"
cp ./dumps/$f ./backup.backup


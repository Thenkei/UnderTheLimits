#!/bin/bash
echo -e "\033[0;31m --- INSTALLING NODE_MODULES --- \033[0m"
cd client && rm -rf build && yarn
echo -e "\033[0;31m --- BUILDING APP --- \033[0m"
SKIP_PREFLIGHT_CHECK=true yarn build # TODO fix ugly
echo -e "\033[0;31m --- MOVING BUILD --- \033[0m"
mkdir -p ../../build
cp -R build ../..
cd ..
rm -rf ./*
echo -e "\033[0;31m --- CHECKOUT GH-PAGES --- \033[0m"
git checkout gh-pages
echo -e "\033[0;31m --- COPYING TO GH-PAGES --- \033[0m"
rm -rf precache-*
rm -rf static
cp -R ../build/ .
echo -e "\033[0;31m --- STATUS --- \033[0m"
git status
read -p "Please check status then press any key, or CTRL+C to abord `echo $'\n> '`" -n1 -s
RUN=0
git diff --no-ext-diff --quiet --exit-code || RUN=1
if [ $RUN = 0 ]; then
  RUN=`git ls-files --exclude-standard --others| wc -l`
fi

if [ $RUN = 0 ]; then
  echo -e "\033[0;31m --- NO CHANGE NOTICED - GOING BACK ON MASTER --- \033[0m"
  rm -rf ../build
  git checkout master
  exit 0;
fi
echo -e "\033[0;31m --- FILES CHANGED - You can now commit and push to gh-pages --- \033[0m"

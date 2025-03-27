#!/bin/sh

if [[ $(git status --porcelain --untracked-files=no) != '' ]]; then
  echo
  echo 'There are uncommitted changes!'
  echo 'Please make sure to commit or revert any changes before publishing.'
  echo
  exit 1
fi

pnpm test --silent
rm -r ./dist
pnpm build

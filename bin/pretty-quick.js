#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const mri = require('mri');

const prettyQuick = require('..').default;

const args = mri(process.argv.slice(2));

const identity = x => x;
const bold = process.platform === 'win32' ? identity : chalk.bold;

prettyQuick(
  process.cwd(),
  Object.assign({}, args, {
    onFoundSinceRevision: (scm, revision) => {
      console.log(
        `🔍  Finding changed files since ${bold(scm)} revision ${bold(
          revision
        )}.`
      );
    },

    onFoundChangedFiles: changedFiles => {
      console.log(
        `🎯  Found ${bold(changedFiles.length)} changed ${
          changedFiles.length === 1 ? 'file' : 'files'
        }.`
      );
    },

    onWriteFile: file => {
      console.log(`✍️  Fixing up ${bold(file)}.`);
    },
  })
);

console.log('✅  Everything is awesome!');

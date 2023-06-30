#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

const projectDir = path.resolve(process.cwd(), projectName);
fs.mkdirSync(projectDir, { recursive: true });
 
const templateDir = path.resolve(__dirname, 'template');
fs.cpSync(templateDir, projectDir, { recursive: true });

fs.renameSync(
  path.join(projectDir, 'gitignore'),
  path.join(projectDir, '.gitignore')
);

fs.renameSync(
  path.join(projectDir, 'eslintrc.cjs'),
  path.join(projectDir, '.eslintrc.cjs')
);

const projectPackageJson = require(path.join(projectDir, 'package.json'));

projectPackageJson.name = projectName;

fs.writeFileSync(
  path.join(projectDir, 'package.json'),
  JSON.stringify(projectPackageJson, null, 2)
);

console.log(`cd ${projectName}`);
console.log(`yarn`);
console.log(`yarn dev`);
console.log(projectDir);

/**
 * get project name from user
 * create a folder in current directory as the name of the project
 * copy template into that folder
 * rename gitignore and eslint file and add dot before it
 * get package json file and content in a variable
 * change name property to the project's name
 * paste the data to package json and if file is not there add the file
 * project is ready
*/
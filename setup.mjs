#!/usr/bin/env zx
// To run me, type `npx zx setup.js`

console.log("Setting up your project...");

// Set up espanso
// ---------------
const espansoConfig = await $`espanso path`;
const configPath = espansoConfig.stdout.split("\n")[0].split(":")[1].trim();

// Check if the config directory exists
const configDirExists = await $` find -d ${configPath}`;

if (configDirExists) {
  // First, let's focus on the matches file, which lives in configPath/match/default.yml.
  const matchesFileExists = await $`find ${configPath}/match/default.yml`;
  if (!matchesFileExists) {
    await $`ln -s ./espanso_matches.yml ${configPath}/match/default.yml`;
    // Can I do this?
    return;
  }
  const matchesFileIsASymLink = await $``;
}

// Either way, delete the config file so we can start fresh
// await $`rm -rf ${configPath}`

// If not, delete what's already there

// Either way, link our files to there

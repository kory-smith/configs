import { $ } from "bun";
import chalk from "chalk";
import os from "node:os";

console.debug = (...input) => {
  if (Bun.argv.includes("--debug")) {
    console.log(chalk.green(...input));
  }
};

const absolutePath = await $`pwd`.text();

const user = (await $`whoami`.quiet()).text().trim();

async function setupEspanso(isDryRun: boolean): Promise<void> {
  console.log("Setting up Espanso configs...");
  const configDirPath = `/Users/${user}/Library/Application Support/espanso`;

  const { exitCode } = await $` find -d ${configDirPath}`.nothrow().quiet();
  const configDirExists = exitCode === 0;

  const matchesPath = "match/packages/base.yml";
  if (configDirExists) {
    console.debug("Config directory exists. Setting up symlinks...");
    const { exitCode: matchesExitCode } =
      await $`find ${configDirPath}/${matchesPath}`.quiet();
    console.debug("Matches exit code", matchesExitCode);
    const matchesFileExists = matchesExitCode === 0;
    if (!matchesFileExists) {
      console.debug("Matches file does not exist. Creating symlink...");
      if (!isDryRun) {
        await $`ln -s ${absolutePath}/espanso_matches.yml ${configDirPath}/${matchesPath}`;
      } else {
        console.log("Dry run. Skipping symlink creation for matches file...");
      }
    } else {
      console.debug("Matches file exists. Checking if it's a symlink...");
      // Otherwise it DOES exist
      const matchesFileIsASymLink =
        (await $`test -L ${configDirPath}/${matchesPath}`.nothrow().quiet())
          .exitCode === 0;
      if (matchesFileIsASymLink) {
        console.log("Matches file is already a symlink. Skipping...");
        // Otherwise, it's a static file
      } else {
        console.debug(
          "Matches file is not a symlink. Removing initial file and creating symlink..."
        );
        if (!isDryRun) {
          await $`rm ${configDirPath}/${matchesPath}`;
          await $`ln -s ${absolutePath}/espanso_matches.yml ${configDirPath}/${matchesPath}`;
        } else {
          console.log("Dry run. Skipping symlink creation for matches file...");
        }
      }
    }

    const configPath = "config/default.yml";
    const { exitCode: configExitCode } =
      await $`find ${configDirPath}/${matchesPath}`.quiet();
    const configFileExists = configExitCode === 0;
    console.debug("Config file exists", configFileExists);
    if (!configFileExists) {
      if (!isDryRun) {
        await $`ln -s ${absolutePath}/espanso_config.yml ${configDirPath}/${configPath}`;
      } else {
        console.log("Dry run. Skipping symlink creation for config file...");
      }
    } else {
      // Otherwise it DOES exist
      const configFileIsASymLink =
        (await $`test -L ${configDirPath}/${configPath}`.nothrow().quiet())
          .exitCode === 0;
      console.debug("Config file is a symlink", configFileIsASymLink);
      if (configFileIsASymLink) {
        console.log("Config file is already a symlink. Skipping...");
        // Otherwise, it's a static file
      } else {
        if (!isDryRun) {
          await $`rm ${configDirPath}/${configPath}`;
          await $`ln -s ${absolutePath}/espanso_config.yml ${configDirPath}/${configPath}`;
        } else {
          console.log("Dry run. Skipping symlink creation for config file...");
        }
      }
    }
  }
}

async function setupZsh(isDryRun: boolean): Promise<void> {
  const computerName = os.hostname();
  const isWorkComputer = computerName === "OF060D91LFYXMHG";

  if (isWorkComputer) {
  } else {
  }
}

async function main() {
  console.log("Setting up your project...");

  const isDryRun = Bun.argv.includes("--dry-run");

  await setupEspanso(isDryRun);

  await setupZsh(isDryRun);
}

await main();

import { $ } from "bun";

// /Users/ks61347/Gits/configs/setup.ts -> /Users/ks61347/Gits/configs
const absolutePath = import.meta.path.split("/").slice(0, -1).join("/");

const user = (await $`whoami`.quiet()).text().trim();

async function setupEspanso(isDryRun: boolean): Promise<void> {
  console.log("Setting up Espanso configs...");
  const configDirPath = `/Users/${user}/Library/Application Support/espanso`

  const { exitCode } = await $` find -d ${configDirPath}`.nothrow().quiet();
  const configDirExists = exitCode === 0;

  const matchesPath = "match/packages/base.yml";
  if (configDirExists) {
    const { exitCode: matchesExitCode } =
      await $`find ${configDirPath}/${matchesPath}`.quiet();
    const matchesFileExists = matchesExitCode === 0;
    if (!matchesFileExists) {
      await $`ln -s ${absolutePath}/espanso_matches.yml ${configDirPath}/${matchesPath}`;
    } else {
      // Otherwise it DOES exist
      const matchesFileIsASymLink =
        (await $`test -L ${configDirPath}/${matchesPath}`.nothrow().quiet())
          .exitCode === 0;
      if (matchesFileIsASymLink) {
        console.log("Matches file is already a symlink. Skipping...");
        // Otherwise, it's a static file
      } else {
        await $`rm ${configDirPath}/${matchesPath}`;
        await $`ln -s ${absolutePath}/espanso_matches.yml ${configDirPath}/${matchesPath}`;
      }
    }

    const configPath = "config/default.yml";
    const { exitCode: configExitCode } =
      await $`find ${configDirPath}/${matchesPath}`.quiet();
    const configFileExists = configExitCode === 0;
    if (!configFileExists) {
      await $`ln -s ${absolutePath}/espanso_config.yml ${configDirPath}/${configPath}`;
    } else {
      // Otherwise it DOES exist
      const configFileIsASymLink =
        (await $`test -L ${configDirPath}/${configPath}`.nothrow().quiet())
          .exitCode === 0;
      if (configFileIsASymLink) {
        console.log("Config file is already a symlink. Skipping...");
        // Otherwise, it's a static file
      } else {
        await $`rm ${configDirPath}/${configPath}`;
        await $`ln -s ${absolutePath}/espanso_config.yml ${configDirPath}/${configPath}`;
      }
    }
  }
}

async function setupZsh(isDryRun: boolean): Promise<void> {
  // todo
}

async function main() {
  console.log("Setting up your project...");

  const isDryRun = Bun.argv.includes("--dry-run");

  await setupEspanso(isDryRun);

  await setupZsh(isDryRun);
}

await main();

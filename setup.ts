import { $ } from "bun";
import path from "node:path";
import fs from "node:fs/promises";

// Color helpers using Bun.color()
const reset = "\x1b[0m";
const bold = "\x1b[1m";
const c = {
  cyan: (s: string) => Bun.color("cyan", "ansi") + s + reset,
  green: (s: string) => Bun.color("green", "ansi") + s + reset,
  yellow: (s: string) => Bun.color("yellow", "ansi") + s + reset,
  red: (s: string) => Bun.color("red", "ansi") + s + reset,
  gray: (s: string) => Bun.color("gray", "ansi") + s + reset,
  bold: (s: string) => bold + s + reset,
  boldCyan: (s: string) => bold + Bun.color("cyan", "ansi") + s + reset,
};

// ============================================================================
// Configuration
// ============================================================================

const isDryRun = Bun.argv.includes("--dry-run");
const isDebug = Bun.argv.includes("--debug");

console.debug = (...input: unknown[]) => {
  if (isDebug) {
    console.log(c.gray("[debug]"), ...input);
  }
};

const user = Bun.env.USER!;
const homeDir = Bun.env.HOME!;
const repoDir = process.cwd();

const BREW_PACKAGES = ["git", "zoxide", "starship", "atuin", "pyenv"];
const BREW_CASKS = ["espanso"];

// Track results for summary
const results: { step: string; status: "success" | "skipped" | "failed"; message?: string }[] = [];

// ============================================================================
// Utility Functions
// ============================================================================

async function commandExists(cmd: string): Promise<boolean> {
  const { exitCode } = await $`command -v ${cmd}`.nothrow().quiet();
  return exitCode === 0;
}

async function pathExists(filepath: string): Promise<boolean> {
  return Bun.file(filepath).exists();
}

async function isSymlink(filepath: string): Promise<boolean> {
  try {
    const stats = await fs.lstat(filepath);
    return stats.isSymbolicLink();
  } catch {
    return false;
  }
}

async function symlinkTarget(filepath: string): Promise<string | null> {
  try {
    return await fs.readlink(filepath);
  } catch {
    return null;
  }
}

async function ensureDir(dirPath: string): Promise<void> {
  if (await pathExists(dirPath)) {
    return;
  }
  if (isDryRun) {
    console.log(c.yellow(`[dry-run] Would create directory: ${dirPath}`));
    return;
  }
  await fs.mkdir(dirPath, { recursive: true });
}

async function createSymlink(source: string, dest: string): Promise<boolean> {
  const sourceAbs = path.isAbsolute(source) ? source : path.join(repoDir, source);

  // Check if source exists
  if (!(await pathExists(sourceAbs))) {
    console.log(c.red(`  Source file does not exist: ${sourceAbs}`));
    return false;
  }

  // Check if dest already exists
  if (await pathExists(dest)) {
    if (await isSymlink(dest)) {
      const target = await symlinkTarget(dest);
      if (target === sourceAbs) {
        console.log(c.gray(`  Already symlinked: ${dest} -> ${sourceAbs}`));
        return true;
      }
      // Different target, remove and recreate
      console.log(c.yellow(`  Updating symlink: ${dest}`));
    } else {
      // Regular file, back it up
      const backupPath = `${dest}.backup.${Date.now()}`;
      console.log(c.yellow(`  Backing up existing file: ${dest} -> ${backupPath}`));
      if (!isDryRun) {
        await fs.rename(dest, backupPath);
      }
    }
  }

  // Ensure parent directory exists
  const destDir = path.dirname(dest);
  if (!(await pathExists(destDir))) {
    await ensureDir(destDir);
  }

  if (isDryRun) {
    console.log(c.yellow(`[dry-run] Would symlink: ${dest} -> ${sourceAbs}`));
    return true;
  }

  // Remove existing symlink if any
  if (await isSymlink(dest)) {
    await fs.unlink(dest);
  }

  await fs.symlink(sourceAbs, dest);
  console.log(c.green(`  Symlinked: ${dest} -> ${sourceAbs}`));
  return true;
}

function logStep(name: string) {
  console.log(c.cyan(`\n▶ ${name}`));
}

function recordResult(step: string, status: "success" | "skipped" | "failed", message?: string) {
  results.push({ step, status, message });
}

// ============================================================================
// Installation Functions
// ============================================================================

async function installHomebrew(): Promise<void> {
  logStep("Installing Homebrew");

  if (await commandExists("brew")) {
    console.log(c.gray("  Homebrew already installed"));
    recordResult("Homebrew", "skipped");
    return;
  }

  if (isDryRun) {
    console.log(c.yellow("[dry-run] Would install Homebrew"));
    recordResult("Homebrew", "skipped", "dry-run");
    return;
  }

  try {
    console.log("  Installing Homebrew...");
    await $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
    recordResult("Homebrew", "success");
  } catch (err) {
    console.log(c.red(`  Failed to install Homebrew: ${err}`));
    recordResult("Homebrew", "failed", String(err));
  }
}

async function installBrewPackages(): Promise<void> {
  logStep("Installing Brew Packages");

  if (!(await commandExists("brew"))) {
    console.log(c.red("  Homebrew not installed, skipping packages"));
    recordResult("Brew Packages", "failed", "Homebrew not installed");
    return;
  }

  // Install formula packages
  for (const pkg of BREW_PACKAGES) {
    try {
      const { exitCode } = await $`brew list ${pkg}`.nothrow().quiet();
      if (exitCode === 0) {
        console.log(c.gray(`  ${pkg} already installed`));
        continue;
      }

      if (isDryRun) {
        console.log(c.yellow(`[dry-run] Would install: ${pkg}`));
        continue;
      }

      console.log(`  Installing ${pkg}...`);
      await $`brew install ${pkg}`;
      console.log(c.green(`  Installed ${pkg}`));
    } catch (err) {
      console.log(c.red(`  Failed to install ${pkg}: ${err}`));
    }
  }

  // Install cask packages
  for (const cask of BREW_CASKS) {
    try {
      const { exitCode } = await $`brew list --cask ${cask}`.nothrow().quiet();
      if (exitCode === 0) {
        console.log(c.gray(`  ${cask} (cask) already installed`));
        continue;
      }

      if (isDryRun) {
        console.log(c.yellow(`[dry-run] Would install cask: ${cask}`));
        continue;
      }

      console.log(`  Installing ${cask} (cask)...`);
      await $`brew install --cask ${cask}`;
      console.log(c.green(`  Installed ${cask}`));
    } catch (err) {
      console.log(c.red(`  Failed to install ${cask}: ${err}`));
    }
  }

  recordResult("Brew Packages", "success");
}

async function installOhMyZsh(): Promise<void> {
  logStep("Installing Oh My Zsh");

  const ohmyzshDir = path.join(homeDir, ".oh-my-zsh");
  if (await pathExists(ohmyzshDir)) {
    console.log(c.gray("  Oh My Zsh already installed"));
    recordResult("Oh My Zsh", "skipped");
    return;
  }

  if (isDryRun) {
    console.log(c.yellow("[dry-run] Would install Oh My Zsh"));
    recordResult("Oh My Zsh", "skipped", "dry-run");
    return;
  }

  try {
    console.log("  Installing Oh My Zsh...");
    await $`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended`;
    recordResult("Oh My Zsh", "success");
  } catch (err) {
    console.log(c.red(`  Failed to install Oh My Zsh: ${err}`));
    recordResult("Oh My Zsh", "failed", String(err));
  }
}

async function installZshAutosuggestions(): Promise<void> {
  logStep("Installing zsh-autosuggestions");

  const pluginDir = path.join(homeDir, ".oh-my-zsh/custom/plugins/zsh-autosuggestions");
  if (await pathExists(pluginDir)) {
    console.log(c.gray("  zsh-autosuggestions already installed"));
    recordResult("zsh-autosuggestions", "skipped");
    return;
  }

  const ohmyzshDir = path.join(homeDir, ".oh-my-zsh");
  if (!(await pathExists(ohmyzshDir))) {
    console.log(c.red("  Oh My Zsh not installed, skipping zsh-autosuggestions"));
    recordResult("zsh-autosuggestions", "failed", "Oh My Zsh not installed");
    return;
  }

  if (isDryRun) {
    console.log(c.yellow("[dry-run] Would clone zsh-autosuggestions"));
    recordResult("zsh-autosuggestions", "skipped", "dry-run");
    return;
  }

  try {
    console.log("  Cloning zsh-autosuggestions...");
    await $`git clone https://github.com/zsh-users/zsh-autosuggestions ${pluginDir}`;
    recordResult("zsh-autosuggestions", "success");
  } catch (err) {
    console.log(c.red(`  Failed to install zsh-autosuggestions: ${err}`));
    recordResult("zsh-autosuggestions", "failed", String(err));
  }
}

async function installNvm(): Promise<void> {
  logStep("Installing NVM");

  const nvmDir = path.join(homeDir, ".nvm");
  if (await pathExists(nvmDir)) {
    console.log(c.gray("  NVM already installed"));
    recordResult("NVM", "skipped");
    return;
  }

  if (isDryRun) {
    console.log(c.yellow("[dry-run] Would install NVM"));
    recordResult("NVM", "skipped", "dry-run");
    return;
  }

  try {
    console.log("  Installing NVM...");
    await $`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`;
    recordResult("NVM", "success");
  } catch (err) {
    console.log(c.red(`  Failed to install NVM: ${err}`));
    recordResult("NVM", "failed", String(err));
  }
}

async function installBun(): Promise<void> {
  logStep("Installing Bun");

  if (await commandExists("bun")) {
    console.log(c.gray("  Bun already installed"));
    recordResult("Bun", "skipped");
    return;
  }

  if (isDryRun) {
    console.log(c.yellow("[dry-run] Would install Bun"));
    recordResult("Bun", "skipped", "dry-run");
    return;
  }

  try {
    console.log("  Installing Bun...");
    await $`curl -fsSL https://bun.sh/install | bash`;
    recordResult("Bun", "success");
  } catch (err) {
    console.log(c.red(`  Failed to install Bun: ${err}`));
    recordResult("Bun", "failed", String(err));
  }
}

// ============================================================================
// Config Symlink Functions
// ============================================================================

async function setupZsh(): Promise<void> {
  logStep("Setting up Zsh config");

  try {
    // Symlink .zshrc
    const zshrcDest = path.join(homeDir, ".zshrc");
    await createSymlink(".zshrc", zshrcDest);

    // Symlink kira theme (only if oh-my-zsh exists)
    const ohmyzshDir = path.join(homeDir, ".oh-my-zsh");
    if (await pathExists(ohmyzshDir)) {
      const themeDest = path.join(ohmyzshDir, "themes/kira.zsh-theme");
      await createSymlink("kira.zsh-theme", themeDest);
    } else {
      console.log(c.yellow("  Oh My Zsh not installed, skipping theme symlink"));
    }

    recordResult("Zsh Config", "success");
  } catch (err) {
    console.log(c.red(`  Failed to setup Zsh config: ${err}`));
    recordResult("Zsh Config", "failed", String(err));
  }
}

async function setupVim(): Promise<void> {
  logStep("Setting up Vim config");

  try {
    const vimrcDest = path.join(homeDir, ".vimrc");
    await createSymlink(".vimrc", vimrcDest);
    recordResult("Vim Config", "success");
  } catch (err) {
    console.log(c.red(`  Failed to setup Vim config: ${err}`));
    recordResult("Vim Config", "failed", String(err));
  }
}

async function setupStarship(): Promise<void> {
  logStep("Setting up Starship config");

  try {
    const configDir = path.join(homeDir, ".config");
    await ensureDir(configDir);

    const starshipDest = path.join(configDir, "starship.toml");
    await createSymlink("starship.toml", starshipDest);
    recordResult("Starship Config", "success");
  } catch (err) {
    console.log(c.red(`  Failed to setup Starship config: ${err}`));
    recordResult("Starship Config", "failed", String(err));
  }
}

async function setupAtuin(): Promise<void> {
  logStep("Setting up Atuin config");

  try {
    const atuinConfigDir = path.join(homeDir, ".config/atuin");
    await ensureDir(atuinConfigDir);

    const atuinDest = path.join(atuinConfigDir, "config.toml");
    await createSymlink("atuin_config.toml", atuinDest);
    recordResult("Atuin Config", "success");
  } catch (err) {
    console.log(c.red(`  Failed to setup Atuin config: ${err}`));
    recordResult("Atuin Config", "failed", String(err));
  }
}

async function setupEspanso(): Promise<void> {
  logStep("Setting up Espanso configs");

  const configDirPath = `/Users/${user}/Library/Application Support/espanso`;

  if (!(await pathExists(configDirPath))) {
    console.log(c.yellow("  Espanso config directory does not exist, skipping"));
    console.log(c.gray("  (Run espanso once to create the config directory)"));
    recordResult("Espanso Config", "skipped", "Config directory does not exist");
    return;
  }

  try {
    // Setup matches file
    const matchesPath = path.join(configDirPath, "match/packages/base.yml");
    const matchesDir = path.dirname(matchesPath);
    await ensureDir(matchesDir);
    await createSymlink("espanso_matches.yml", matchesPath);

    // Setup config file
    const configPath = path.join(configDirPath, "config/default.yml");
    const configDir = path.dirname(configPath);
    await ensureDir(configDir);
    await createSymlink("espanso_config.yml", configPath);

    recordResult("Espanso Config", "success");
  } catch (err) {
    console.log(c.red(`  Failed to setup Espanso config: ${err}`));
    recordResult("Espanso Config", "failed", String(err));
  }
}

// ============================================================================
// Main
// ============================================================================

async function printSummary() {
  console.log(c.cyan("\n" + "=".repeat(60)));
  console.log(c.cyan("SUMMARY"));
  console.log(c.cyan("=".repeat(60)));

  const successes = results.filter((r) => r.status === "success");
  const skipped = results.filter((r) => r.status === "skipped");
  const failures = results.filter((r) => r.status === "failed");

  if (successes.length > 0) {
    console.log(c.green(`\n✓ Completed (${successes.length}):`));
    for (const r of successes) {
      console.log(c.green(`  • ${r.step}`));
    }
  }

  if (skipped.length > 0) {
    console.log(c.gray(`\n○ Skipped (${skipped.length}):`));
    for (const r of skipped) {
      const reason = r.message ? ` (${r.message})` : "";
      console.log(c.gray(`  • ${r.step}${reason}`));
    }
  }

  if (failures.length > 0) {
    console.log(c.red(`\n✗ Failed (${failures.length}):`));
    for (const r of failures) {
      console.log(c.red(`  • ${r.step}: ${r.message}`));
    }
  }

  // Manual steps reminder
  console.log(c.cyan("\n" + "=".repeat(60)));
  console.log(c.cyan("MANUAL STEPS REQUIRED"));
  console.log(c.cyan("=".repeat(60)));
  console.log(`
1. Run ${c.yellow("source ~/.zshrc")} to reload shell config

2. ${c.bold("Surfingkeys")}: Copy surfingkeys.js content into browser extension settings

3. ${c.bold("Espanso")}: Grant accessibility permissions in System Preferences

4. ${c.bold("Atuin")}: Run ${c.yellow("atuin login")} to sync history
`);
}

async function main() {
  console.log(c.boldCyan("\n🚀 Bootstrap Setup Script\n"));

  if (isDryRun) {
    console.log(c.yellow("Running in DRY-RUN mode - no changes will be made\n"));
  }

  console.debug(`User: ${user}`);
  console.debug(`Home: ${homeDir}`);
  console.debug(`Repo: ${repoDir}`);

  // Phase 1: Install tools
  console.log(c.boldCyan("\n━━━ PHASE 1: Installing Tools ━━━"));
  await installHomebrew();
  await installBrewPackages();
  await installOhMyZsh();
  await installZshAutosuggestions();
  await installNvm();
  await installBun();

  // Phase 2: Symlink configs
  console.log(c.boldCyan("\n━━━ PHASE 2: Symlinking Configs ━━━"));
  await setupZsh();
  await setupVim();
  await setupStarship();
  await setupAtuin();
  await setupEspanso();

  // Print summary
  await printSummary();

  // Exit with error if any critical steps failed
  const criticalFailures = results.filter(
    (r) => r.status === "failed" && ["Homebrew", "Oh My Zsh"].includes(r.step)
  );
  if (criticalFailures.length > 0) {
    process.exit(1);
  }
}

await main();

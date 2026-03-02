# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="/Users/kory/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="kira"

source $(brew --prefix)/opt/zsh-vi-mode/share/zsh-vi-mode/zsh-vi-mode.plugin.zsh
ZVM_SYSTEM_CLIPBOARD_ENABLED=true

# Cutlass: delete/change without yanking (preserves CUTBUFFER)
function cutlass_delete() {
  local save=$CUTBUFFER
  zle vi-delete
  CUTBUFFER=$save
}
function cutlass_change() {
  local save=$CUTBUFFER
  zle vi-change
  CUTBUFFER=$save
}
function cutlass_delete_char() {
  local save=$CUTBUFFER
  zle vi-delete-char
  CUTBUFFER=$save
}
function cutlass_kill_eol() {
  local save=$CUTBUFFER
  zle vi-kill-eol
  CUTBUFFER=$save
}

function zvm_after_lazy_keybindings() {
  # H/L: beginning/end of line
  zvm_bindkey vicmd 'H' beginning-of-line
  zvm_bindkey vicmd 'L' end-of-line
  zvm_bindkey visual 'H' beginning-of-line
  zvm_bindkey visual 'L' end-of-line

  # Cutlass: d/c/x delete without yanking
  zvm_define_widget cutlass_delete
  zvm_define_widget cutlass_change
  zvm_define_widget cutlass_delete_char
  zvm_define_widget cutlass_kill_eol
  zvm_bindkey vicmd 'd' cutlass_delete
  zvm_bindkey vicmd 'c' cutlass_change
  zvm_bindkey vicmd 'x' cutlass_delete_char
  zvm_bindkey vicmd 'D' cutlass_kill_eol
  zvm_bindkey visual 'd' cutlass_delete
  zvm_bindkey visual 'c' cutlass_change
  zvm_bindkey visual 'x' cutlass_delete_char

}

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to automatically update without prompting.
# DISABLE_UPDATE_PROMPT="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git vscode xcode zsh-autosuggestions dotenv)

source $ZSH/oh-my-zsh.sh

export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

function temp {
  touch /tmp/$1
  code -n /tmp/$1
}

function journal() {
  bun /Users/$(whoami)/scripts/handleJournal.mjs
}

# vim mode config
# ---------------

# Activate vim mode.
bindkey -v

# Remove mode switching delay.
KEYTIMEOUT=5

export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && . "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export HOMEBREW_CASK_OPTS=--no-quarantine
export HOMEBREW_NO_AUTO_UPDATE=1
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE

eval "$(starship init zsh)"

# bun completions
[ -s "/Users/kory/.bun/_bun" ] && source "/Users/kory/.bun/_bun"

# Bun
export BUN_INSTALL="/Users/kory/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

export PATH="$PATH:/Users/kory/.bin"

if which pyenv-virtualenv-init > /dev/null; then eval "$(pyenv virtualenv-init -)"; fi

# Custom CD function to automatically use nvm version if .nvmrc exists
chpwd() {
  if [[ -f .nvmrc ]]; then
    local nvm_version="$(<.nvmrc)"
    local installed_version=$(nvm version $nvm_version)
    
    if [[ $installed_version == "N/A" ]]; then
      echo "Node.js version specified in .nvmrc ($nvm_version) is not installed."
      echo "Would you like to install it? [y/N]"
      
      read response
      if [[ $response == "y" || $response == "Y" ]]; then
        nvm install $nvm_version
      else
        echo "Skipping Node.js version switch."
      fi
    else
      nvm use
    fi
  fi
}

if [[ "$CLAUDECODE" != "1" ]]; then
    eval "$(zoxide init zsh --cmd cd)"
fi


. "$HOME/.atuin/bin/env"
eval "$(atuin init zsh --disable-up-arrow)"

# Yeet - stage, review, commit, push
yeet() {
  if [[ -z "$1" ]]; then
    echo "Usage: yeet \"commit message\""
    return 1
  fi

  local msg="$*"

  git add -A

  echo "\n📦 Staged changes:"
  git --no-pager diff --cached --stat
  echo "\n"
  git --no-pager diff --cached --shortstat

  echo "\nCommit message: \"$msg\""
  read -k 1 "?Press Enter to yeet, Ctrl+C to abort... "

  git commit -m "$msg" && git push
}

# From https://x.com/dhh/status/2005326958578856206
# Create a new worktree and branch from within current git directory.
unalias ga 2>/dev/null
ga() {
  if [[ -z "$1" ]]; then
    echo "Usage: ga [branch name]"
    return 1
  fi
  local branch="$1"
  local base="$(basename "$PWD")"
  local source_path="$PWD"
  local worktree_path="../${base}--${branch}"
  git worktree add -b "$branch" "$worktree_path"

  # Copy gitignored credential keys if they exist
  if [[ -d "config/credentials" ]]; then
    for keyfile in config/credentials/*.key; do
      [[ -f "$keyfile" ]] && cp "$keyfile" "$worktree_path/$keyfile"
    done
  fi
  [[ -f "config/master.key" ]] && cp config/master.key "$worktree_path/config/"

  # Symlink ActiveStorage files so worktree shares blobs with source
  [[ -d "storage" ]] && ln -s "$source_path/storage" "$worktree_path/storage"

  cd "$worktree_path"
}

# Remove worktree and branch from within active worktree directory.
unalias gd 2>/dev/null
gd() {
  read "response?Remove worktree and branch? [y/N] "
  if [[ "$response" =~ ^[Yy]$ ]]; then
    local cwd base branch root
    cwd="$(pwd)"
    worktree="$(basename "$cwd")"
    # split on first `--`
    root="${worktree%%--*}"
    branch="${worktree#*--}"
    # Protect against accidentally nuking a non-worktree directory
    if [[ "$root" != "$worktree" ]]; then
      cd "../$root"
      git worktree remove "$worktree" --force
      git branch -D "$branch"
    fi
  fi
}

# Ctrl-X Ctrl-E to edit terminal command in $EDITOR
autoload -U edit-command-line
zle -N edit-command-line
bindkey '^xe' edit-command-line
bindkey '^x^e' edit-command-line

# Helpful git aliases
alias gpo="git push origin \$(git symbolic-ref --short HEAD)"
alias ghpr="gh pr create --web"

alias dotfiles="code ~/Gits/configs"

clauded() { claude --dangerously-skip-permissions "$@"; }

# Ralph Loop — autonomous AI coding agent
ralph() { ~/ralph.sh --dir "$(pwd)" "$@"; }

export EDITOR="vim"
export PATH="$HOME/.local/bin:$PATH"
 
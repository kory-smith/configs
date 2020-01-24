"No vi compatibility!
set nocompatible

filetype indent plugin on

"set guioptions -=m
set guioptions -=T

"Maps the leader to comma by default
let mapleader = ","

"Allows more colors
set t_Co=256

"Turn on syntax highlighting
syntax on

"Pretty font
set guifont=Hack:h9 

"make backspace behave sanely
set backspace=indent,eol,start

"Making tabs behave sanely
set tabstop=2
set expandtab
set shiftwidth=2
set smarttab
set autoindent
set smartindent

"Sets default clipboard to system one
set clipboard=unnamed

"Turns on highlighing when searching something
set hlsearch

"Ignores the case when searching for a word
set ignorecase

"Include only uppercase terms with uppercase search terms
set smartcase

"Turns on relative line numbers
set relativenumber 
set number

"Sets current directory to whichever one you're in
set autochdir

"Switches the default colon/semicolon behavior
nnoremap : ;
nnoremap ; :

"Lets you enter insert mode by hitting j and k (no matter which order you do) 
inoremap jk <ESC>
inoremap kj <ESC>

"Gives me back CTRL-Backspace to delete whole words
inoremap <C-Bs> <C-W>

"Escape from brackets
:inoremap <C-j> <Esc>/[)}"'`\]>]<CR>:nohl<CR>a

"Keybindings for easy Vimrc loading and refreshing
nnoremap <silent> <leader>ev :e $MYVIMRC<CR>
"nmap <silent> <leader>sv :so $MYVIMRC<CR>

"NerdTree mappings
nnoremap <silent> <leader>n :NERDTreeToggle<CR>

"Easier split/window navigation
nnoremap <silent> <C-h> <C-w><C-h>
nnoremap <silent> <C-j> <C-w><C-j>
nnoremap <silent> <C-k> <C-w><C-k>
nnoremap <silent> <C-l> <C-w><C-l>
tnoremap <C-h> <C-w><C-h>
tnoremap <C-j> <C-w><C-j>
tnoremap <C-k> <C-w><C-k>
tnoremap <C-l> <C-w><C-l>

" Clumsy way to automatically see if my JavaScript worked
nnoremap <silent> <leader>tt :call term_sendkeys(2, "node test.js\r")<CR>

nnoremap <silent><leader>bt :bot term<CR>
nnoremap <silent><leader>btp :bot term powershell<CR>

"Sets autowindow size
if has("gui_running")
  " GUI is running or is about to start.
  " Maximize gvim window.
  set lines=64 columns=180
else
  " This is console Vim.
  if exists("+lines")
    set lines=50
  endif
  if exists("+columns")
    set columns=100
  endif
endif

" Dracula:
fun! s:Dra()
    colorscheme dracula
endfunction
command Dra call s:Dra()

"------------Plugins----------------

call plug#begin('~/.vim/plugsy')
"Plugins go here
"Plug 'https://github.com/tpope/vim-surround' 
Plug 'dracula/vim', { 'as': 'dracula' }
Plug 'sheerun/vim-polyglot'
Plug 'https://github.com/tpope/vim-unimpaired'
Plug 'https://github.com/jiangmiao/auto-pairs'
Plug 'scrooloose/nerdtree'
Plug 'https://github.com/tpope/vim-surround'

call plug#end()

"----------------------------------

"Pretty colorscheme
colorscheme dracula

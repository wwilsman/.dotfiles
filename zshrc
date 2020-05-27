# Load Antigen
source ~/.antigen.zsh

# Load oh-my-zsh
antigen use oh-my-zsh

# Default bundles
antigen bundle shrink-path

# ENV vars required for some bundles
export NPM_TOKEN=""

# Default language bundles
antigen bundle bower
# antigen bundle brew
antigen bundle git
antigen bundle node
antigen bundle npm
antigen bundle rails
antigen bundle ruby

# Syntax highlighting
antigen bundle zdharma/fast-syntax-highlighting

# NVM and useful NVM features
antigen bundle lukechilds/zsh-nvm

# Load theme and shrink-path theme plugin
SPACESHIP_PROMPT_ORDER=(dir node ruby ember exec_time line_sep char)
SPACESHIP_PROMPT_ADD_NEWLINE=false
SPACESHIP_NODE_SYMBOL=""
SPACESHIP_RUBY_SYMBOL=""
antigen theme denysdovhan/spaceship-zsh-theme spaceship
antigen bundle ~/.oh-my-zsh/plugins/spaceship-zsh-theme-shrink-path --no-local-clone

# Auto delete files in projects
#antigen bundle wwilsman/zsh-clean-project

# Git time tracking
alias PWD=pwd
antigen bundle git-time-metric/gtm-terminal-plugin

# Finish up with antigen
antigen apply

# Default editor
export EDITOR="emacsclient -t"
export REACT_EDITOR="emacsclient -t"
alias e=$EDITOR

# Emacs term
export TERM=xterm-24bits

# Fix GPG signing
export GPG_TTY=$(tty)

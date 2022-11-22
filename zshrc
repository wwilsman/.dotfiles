# Load Antigen
source ~/.antigen.zsh

# Load oh-my-zsh
antigen use oh-my-zsh

# Default bundles
antigen bundle shrink-path

# ENV vars required for some bundles
export NPM_TOKEN=""

# Default language bundles
antigen bundle node

# Load theme and shrink-path theme plugin
SPACESHIP_PROMPT_ORDER=(dir node ruby ember exec_time line_sep char)
SPACESHIP_PROMPT_ADD_NEWLINE=false
SPACESHIP_NODE_SYMBOL=""
SPACESHIP_RUBY_SYMBOL=""
antigen theme denysdovhan/spaceship-zsh-theme spaceship
antigen bundle ~/.oh-my-zsh/plugins/spaceship-zsh-theme-shrink-path --no-local-clone

# Git time tracking
#alias PWD=pwd
#antigen bundle git-time-metric/gtm-terminal-plugin

# Syntax highlighting
antigen bundle zsh-users/zsh-syntax-highlighting

# Finish up with antigen
antigen apply

# Default editor
export EDITOR="emacsclient -t"
export REACT_EDITOR="emacsclient -t"
alias e=$EDITOR

# Emacs term
#export TERM=xterm-24bits

# Fix GPG signing
export GPG_TTY=$(tty)

# pyenv
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi

# local binaries
export PATH=$PATH:~/.local/bin

# brew binaries
BREW_PREFIX=$(brew --prefix)
export PATH=$PATH:$BREW_PREFIX/bin

# helper to check existence before sourcing a file
maybe_source() {
  [[ -f "$1" ]] && source "$1"
}

# chruby
maybe_source $BREW_PREFIX/opt/chruby/share/chruby/chruby.sh
maybe_source $BREW_PREFIX/opt/chruby/share/chruby/auto.sh

# chnode
source $BREW_PREFIX/opt/chnode/share/chnode/chnode.sh
source $BREW_PREFIX/opt/chnode/share/chnode/auto.sh

# chnode patch to highlight links
chnode_list() {
    local dir node
    for dir in "${CHNODE_NODES[@]}"; do
        dir="${dir%/}"
        link=$(readlink $dir)
        if [[ $dir == "${CHNODE_ROOT:-}" ]]; then
            echo " * ${dir##*/}${link:+ -> $link}"
        else
            echo "   ${dir##*/}${link:+ -> $link}"
        fi
    done
}

# gcloud
maybe_source $BREW_PREFIX/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/path.zsh.inc
maybe_source $BREW_PREFIX/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/completion.zsh.inc

# .dotfiles

System dotfiles for quickly setting up new development environments.

## Prerequisites

### SIP

For MacOS, System Integrity Protection must be relaxed for
[`yabai`](https://github.com/koekeishiya/yabai) (tiling window manager) in order to enable advanced
features such as window animations, transparency, shadows, layers, sticky-positioning, and
picture-in-picture.

From recovery mode, open a terminal and run the following to adequately relax specific SIP
restrictions

``` sh-session
$ csrutil enable --without debug --without fs
```

## Installation

Installation is handled via [`dotbot`](https://github.com/koekeishiya/yabai) and the install script:

``` sh-session
$ git clone https://github.com/wwilsman/.dotfiles
$ cd .dotfiles
$ ./install
```

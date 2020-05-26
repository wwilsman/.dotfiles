# Current directory. Use shrink-path
spaceship_dir() {
  [[ $SPACESHIP_DIR_SHOW == false ]] && return

  spaceship::section \
    "$SPACESHIP_DIR_COLOR" \
    "$SPACESHIP_DIR_PREFIX" \
    "$(shrink_path -f)" \
    "$SPACESHIP_DIR_SUFFIX"
}

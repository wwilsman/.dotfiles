class ModeMap {
  // create a modemap for the specified keys; the callback is called when the mode toggles
  constructor(name, keys, callback) {
    this.name = name;
    this.keys = keys;
    this.callback = callback;
  }

  // enable this mode
  enable() {
    this.handlers ||= this.keys.map(args => new Key(...args))
      .concat(new Key('escape', [], () => this.disable()));
    this.handlers.forEach(h => h.enable());

    this.isEnabled = true
    this.callback?.(this);
  }

  // disable this mode
  disable() {
    this.handlers.forEach(h => h.disable());
    this.isEnabled = false;
    this.callback?.(this);
  }

  // toggle this mode
  toggle() {
    return this.isEnabled
      ? this.disable()
      : this.enable();
  }
}

// jscore does not yet support static props
ModeMap.all = new Map();

// create a new mode map and return the toggle function
ModeMap.toggle = (name, keys, callback) => {
  let map = new ModeMap(name, keys, callback);
  ModeMap.all.set(name, map);
  return map.toggle.bind(map);
};

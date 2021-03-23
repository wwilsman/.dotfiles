class ModeMap {
  // create a modemap for the specified keys; the callback is called when the mode (de)activates
  constructor(name, keys, callback) {
    this.name = name;
    this.keys = keys;
    this.callback = callback;
  }

  // enable this modemap
  enable() {
    this.handlers ||= this.keys.map(args => new Key(...args))
      .concat(new Key('escape', [], () => this.disable()));
    this.handlers.forEach(h => h.enable());

    NamedModal.show('mode', {
      text: this.name,
      origin: Grid.center
    });

    this.callback?.(this.isEnabled = true);
  }

  // disable this modemap
  disable() {
    this.handlers.forEach(h => h.disable());
    NamedModal.closeAll();

    this.callback?.(this.isEnabled = false);
  }

  // toggle this modemap
  toggle() {
    return this.isEnabled
      ? this.disable()
      : this.enable();
  }
}

// jscore does not yet support static props
ModeMap.all = new Map();

// create a new modemap and return the toggle function
ModeMap.toggle = (name, keys, callback) => {
  let map = new ModeMap(name, keys, callback);
  ModeMap.all.set(name, map);
  return map.toggle.bind(map);
};

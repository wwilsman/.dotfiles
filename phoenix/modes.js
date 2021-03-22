function ModeMap(name, keys, callback) {
  if (!(this instanceof ModeMap))
    return new ModeMap(...arguments);

  this.name = name;
  this.callback = callback;

  this.enable = () => {
    this.handlers ||= keys.map(args => new Key(...args))
      .concat(new Key('escape', [], () => this.disable()));
    this.handlers.forEach(h => h.enable());
    NamedModal.show('mode', { text: name, origin: center });
    callback(this.isEnabled = true);
  };

  this.disable = () => {
    this.handlers.forEach(h => h.disable());
    NamedModal.close('grid', 'mode');
    callback(this.isEnabled = false);
  };

  this.toggle = () => (
    this.isEnabled ? this.disable() : this.enable()
  );
}

Object.assign(ModeMap, {
  all: new Map(),

  toggle(name, keys, callback) {
    let mm = new ModeMap(name, keys, callback);
    ModeMap.all.set(name, mm);
    return mm.toggle;
  }
});

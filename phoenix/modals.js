function NamedModal(name, props) {
  if (!(this instanceof NamedModal))
    return new NamedModal(...arguments);

  this.name = name;
  this.modal = Modal.build(props);
  this.show = () => this.modal.show();
  this.close = () => this.modal.close();
  this.frame = () => this.modal.frame();

  NamedModal.close(name);

  if (props.duration) {
    this.timeout = setTimeout(
      () => this.modal.close(),
      props.duration * 1000
    );
  }

  NamedModal.all.set(name, this);
}

Object.assign(NamedModal, {
  all: new Map(),
  timeouts: new Map(),

  show(name, props) {
    new NamedModal(name, props).show();
  },

  get(name) {
    return NamedModal.all.get(name);
  },

  close(...names) {
    for (let name of names) {
      let modal = NamedModal.all.get(name);
      NamedModal.all.delete(name);

      if (modal) {
        clearTimeout(modal.timeout);
        modal.close();
      }
    }
  }
});

Event.on('spaceDidChange', () => {
  NamedModal.all.forEach(m => (
    m.duration ? m.close() : m.show()
  ));
});

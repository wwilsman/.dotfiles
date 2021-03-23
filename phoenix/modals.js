// global modals that can be referenced and updated by name
class NamedModal {
  // create a named modal
  constructor(name, props) {
    this.name = name;
    this.modal = Modal.build(props);
    NamedModal.close(name);
    NamedModal.all.set(name, this);
  }

  // returns the modal frame
  frame() {
    return this.modal.frame();
  }

  // if the modal has a duration, clean up after
  show() {
    let { duration } = this.modal;
    if (duration) this.timeout = setTimeout(this.close, duration * 1000);
    this.modal.show();
  }

  // cleanup
  close() {
    NamedModal.all.delete(this.name);
    clearTimeout(this.timeout);
    this.modal.close();
  }
}

// jscore does not yet support static props
NamedModal.all = new Map();

// show a named modal with optional props
NamedModal.show = (name, props) => {
  new NamedModal(name, props).show();
};

// get a named modal instance
NamedModal.get = name => {
  return NamedModal.all.get(name);
};

// close named modals
NamedModal.close = (...names) => {
  names.forEach(n => NamedModal.get(n)?.close());
};

// close all named modals
NamedModal.closeAll = () => {
  NamedModal.all.forEach(m => m.close());
};

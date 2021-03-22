function center(frame, bounds = Screen.main().flippedVisibleFrame()) {
  let x = bounds.x + (bounds.width - frame.width) / 2;
  let y = bounds.y + (bounds.height - frame.height) / 2;
  return { x, y };
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function focused(callback) {
  let win = Window.focused();
  if (win) return callback(win);
}

function visible(callback) {
  Screen.main()
    .windows({ visible: true })
    .forEach(callback);
}

function launch(app, callback) {
  let space = Screen.main().currentSpace();
  let win = App.launch(app, { focus: false }).mainWindow();

  if (win.spaces().some(s => !s.isEqual(space))) {
    win.spaces().forEach(s => s.removeWindows([win]));
    space.addWindows([win]);
  }

  callback(win);
}

const Grid = {
  rows: 5,
  cols: 5,
  gap: 20,

  set(rows, cols, silent) {
    Object.assign(Grid, { rows, cols });

    if (!silent) {
      let mm = NamedModal.get('mode').frame();

      NamedModal.show('grid', {
        duration: 2,
        text: `${rows}x${cols}`,
        origin: f => {
          let origin = center(f);
          origin.y -= mm.height + Grid.gap;
          return origin;
        }
      });
    }
  },

  // snap window position/size to relative grid position/size
  snap(win, cols, rows, x, y, width, height) {
    let bounds = Grid.visibleFrame(win.screen());
    let frame = win.frame();

    cols = cols === true ? Grid.cols : cols;
    rows = rows === true ? Grid.rows : rows;

    // get absolute grid position/size
    x += cols ? Math.round(frame.x / bounds.width * cols) : 0;
    y += rows ? Math.round(frame.y / bounds.height * rows) : 0;
    width += cols ? Math.round(frame.width / bounds.width * cols) : 0;
    height += rows ? Math.round(frame.height / bounds.height * rows) : 0;

    Grid.fit(win, cols, rows, x, y, width, height);
  },

  // fit window position/size to grid position/size
  fit(win, cols, rows, x, y, width, height) {
    let bounds = Grid.visibleFrame(win.screen());
    let frame = win.frame();

    if (cols) {
      let cell = bounds.width / (cols === true ? Grid.cols : cols);
      frame.width = clamp(width * cell, cell, bounds.width) - Grid.gap;
      frame.x = bounds.x + clamp(x * cell, 0, bounds.width - frame.width) + (Grid.gap / 2);
    }

    if (rows) {
      let cell = bounds.height / (rows === true ? Grid.rows : rows);
      frame.height = clamp(height * cell, cell, bounds.height) - Grid.gap;
      frame.y = bounds.y + clamp(y * cell, 0, bounds.height - frame.height) + (Grid.gap / 2);
    }

    win.setFrame(frame);
  },

  // returns a frame adjusted for window gaps/padding
  visibleFrame(screen) {
    let bounds = screen.flippedVisibleFrame();
    bounds.x += Grid.gap / 2;
    bounds.y += Grid.gap / 2;
    bounds.width -= Grid.gap;
    bounds.height -= Grid.gap;
    return bounds;
  }
}

// grid utils for positioning windows and frames
const Grid = {
  // default grid settings
  rows: 5,
  cols: 5,
  gap: 20,

  // update grid settings and show a modal under the mode modal
  set(rows, cols, silent) {
    Object.assign(Grid, { rows, cols });

    if (!silent) {
      NamedModal.show('grid', {
        duration: 2,
        text: `${rows}x${cols}`,
        origin: f => {
          let origin = Grid.center(f);
          let modal = NamedModal.get('mode');
          origin.y -= modal.frame().height + Grid.gap;
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
      frame.width = _.clamp(width * cell, cell, bounds.width) - Grid.gap;
      frame.x = bounds.x + _.clamp(x * cell, 0, bounds.width - frame.width) + (Grid.gap / 2);
    }

    if (rows) {
      let cell = bounds.height / (rows === true ? Grid.rows : rows);
      frame.height = _.clamp(height * cell, cell, bounds.height) - Grid.gap;
      frame.y = bounds.y + _.clamp(y * cell, 0, bounds.height - frame.height) + (Grid.gap / 2);
    }

    win.setFrame(frame);
  },

  // returns a frame adjusted for window gaps/padding
  visibleFrame(screen = Screen.main()) {
    let bounds = screen.flippedVisibleFrame();
    bounds.x += Grid.gap / 2;
    bounds.y += Grid.gap / 2;
    bounds.width -= Grid.gap;
    bounds.height -= Grid.gap;
    return bounds;
  },

  // returns a top-left point to center the provided frame
  center(frame, bounds = Grid.visibleFrame()) {
    let x = bounds.x + (bounds.width - frame.width) / 2;
    let y = bounds.y + (bounds.height - frame.height) / 2;
    return { x, y };
  }
}

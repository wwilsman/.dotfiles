require('./modals.js');
require('./windowing.js');
require('./modes.js');

// windowing mode (hyper + space)
Key.on('space', ['cmd', 'ctrl', 'alt', 'shift'], ModeMap.toggle('Windowing', [
  // focusing
  ['w', [], () => focused(w => w.focusClosestNeighbor('north'))],
  ['a', [], () => focused(w => w.focusClosestNeighbor('west'))],
  ['s', [], () => focused(w => w.focusClosestNeighbor('south'))],
  ['d', [], () => focused(w => w.focusClosestNeighbor('east'))],
  ['c', [], () => focused(w => w.setTopLeft(center(w.frame())))],
  // grid settings
  ['2', [], () => Grid.set(2,  2)],
  ['3', [], () => Grid.set(3,  3)],
  ['4', [], () => Grid.set(4,  4)],
  ['5', [], () => Grid.set(5,  5)],
  ['6', [], () => Grid.set(6,  6)],
  ['7', [], () => Grid.set(7,  7)],
  ['8', [], () => Grid.set(8,  8)],
  ['8', [], () => Grid.set(9,  9)],
  ['0', [], () => Grid.set(10, 10)],
  // grid snapping
  ['i', [],        () => focused(w => Grid.snap(w, false, true,   0, -1,  0,  0))],
  ['i', ['ctrl'],  () => focused(w => Grid.snap(w, false, true,   0, -1,  0,  1))],
  ['i', ['shift'], () => focused(w => Grid.snap(w, false, true,   0,  1,  0, -1))],
  ['j', [],        () => focused(w => Grid.snap(w, true,  false, -1,  0,  0,  0))],
  ['j', ['ctrl'],  () => focused(w => Grid.snap(w, true,  false, -1,  0,  1,  0))],
  ['j', ['shift'], () => focused(w => Grid.snap(w, true,  false,  1,  0, -1,  0))],
  ['k', [],        () => focused(w => Grid.snap(w, false, true,   0,  1,  0,  0))],
  ['k', ['ctrl'],  () => focused(w => Grid.snap(w, false, true,   0,  0,  0,  1))],
  ['k', ['shift'], () => focused(w => Grid.snap(w, false, true,   0,  0,  0, -1))],
  ['l', [],        () => focused(w => Grid.snap(w, true,  false,  1,  0,  0,  0))],
  ['l', ['ctrl'],  () => focused(w => Grid.snap(w, true,  false,  0,  0,  1,  0))],
  ['l', ['shift'], () => focused(w => Grid.snap(w, true,  false,  0,  0, -1,  0))],
  // layouts
  ['0', ['alt'], () => {
    launch('Calendar',      w => Grid.fit(w, 4, 5, 0, 3, 1, 2));
    launch('Mail',          w => Grid.fit(w, 5, 5, 0, 0, 2, 3));
    launch('Slack',         w => Grid.fit(w, 5, 5, 3, 2, 2, 3));
    launch('Google Chrome', w => Grid.fit(w, 5, 1, 1, 0, 3, 1));
  }],
  ['2', ['alt'], () => visible((w, i) => {
    if (i < 2) Grid.fit(w, 2, 1, i, 0, 1, 1);
  })],
  ['3', ['alt'], () => visible((w, i, { length }) => {
    if (length <= 2) Grid.fit(w, 3, 1, i && 2, 0, i || 2, 1);
    else if (i < 3) Grid.fit(w, 3, 1, i, 0, 1, 1);
  })],
  ['return', ['alt'], () => {
    focused(w => Grid.fit(w, 1, 1, 0, 0, 1, 1));
  }],
], enabled => {
  if (!enabled) {
    Grid.set(5, 5, true);
  }
}));
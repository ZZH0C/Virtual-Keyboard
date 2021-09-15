const buttonNames = [
  [
    ['Digit1', '1', '!', '1', false, false],
    ['Digit2', '2', '@', '2', false, false],
    ['Digit3', '3', '#', '3', false, false],
    ['Digit4', '4', '$', '4', false, false],
    ['Digit5', '5', '%', '5', false, false],
    ['Digit6', '6', '^', '6', false, false],
    ['Digit7', '7', '&', '7', false, false],
    ['Digit8', '8', '*', '8', false, false],
    ['Digit9', '9', '(', '9', false, false],
    ['Digit0', '0', ')', '0', false, false],
    ['Minus', '-', '_', '-', false, false],
    ['Equal', '=', '+', '=', false, false],
    ['Backspace', 'Backspace', 'Backspace', 'Backspace', true, false],
  ],
  [
    ['Tab', 'Tab', 'Tab', 'Tab', true, false],
    ['KeyQ', 'q', 'Q', 'q', false, false],
    ['KeyW', 'w', 'W', 'w', false, false],
    ['KeyE', 'e', 'E', 'e', false, false],
    ['KeyR', 'r', 'R', 'r', false, false],
    ['KeyT', 't', 'T', 't', false, false],
    ['KeyY', 'y', 'Y', 'y', false, false],
    ['KeyU', 'u', 'U', 'u', false, false],
    ['KeyI', 'i', 'I', 'i', false, false],
    ['KeyO', 'o', 'O', 'o', false, false],
    ['KeyP', 'p', 'P', 'p', false, false],
    ['BracketLeft', '[', '{', '[', false, false],
    ['BracketRight', ']', '}', ']', false, false],
  ],
  [
    ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', true, false],
    ['KeyA', 'a', 'A', 'a', false, false],
    ['KeyS', 's', 'S', 's', false, false],
    ['KeyD', 'd', 'D', 'd', false, false],
    ['KeyF', 'f', 'F', 'f', false, false],
    ['KeyG', 'g', 'G', 'g', false, false],
    ['KeyH', 'h', 'H', 'h', false, false],
    ['KeyJ', 'j', 'J', 'j', false, false],
    ['KeyK', 'k', 'K', 'k', false, false],
    ['KeyL', 'l', 'L', 'l', false, false],
    ['Semicolon', ';', ':', 'p', false, false],
    ['Quote', '\'', '"', '\'', false, false],
    ['Backslash', '\\', '|', '\\', false, false],
    ['Enter', 'Enter', 'Enter', 'Enter', true, false],
  ],
  [
    ['Shift', 'Shift', 'Shift', 'Shift', true, false],
    ['KeyZ', 'z', 'Z', 'z', false, false],
    ['KeyX', 'x', 'X', 'x', false, false],
    ['KeyC', 'c', 'C', 'c', false, false],
    ['KeyV', 'v', 'V', 'v', false, false],
    ['KeyB', 'b', 'B', 'b', false, false],
    ['KeyN', 'n', 'N', 'n', false, false],
    ['KeyM', 'm', 'M', 'm', false, false],
    ['Comma', ',', '<', ',', false, false],
    ['Period', '.', '>', '.', false, false],
    ['Slash', '/', '?', '/', false, false],
    ['Shift', 'Shift', 'Shift', 'Shift', true, false],
  ],
  [
    ['ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', true, false],
    ['AltLeft', 'Alt', 'Alt', 'Alt', true, false],
    ['Space', 'Space', 'Space', 'Space', true, false],
    ['AltRight', 'Alt', 'Alt', 'Alt', true, false],
    ['ControlRight', 'Ctrl', 'Ctrl', 'Ctrl', true, false],
    ['ArrowLeft', '←', '←', '←', false, false],
    ['ArrowUp', '↑', '↑', '↑', false, false],
    ['ArrowDown', '↓', '↓', '↓', false, false],
    ['ArrowRight', '→', '→', '→', false, false],
  ],
];
const CapsToggle = false;
let ShiftToggle = false;

function keyboardContainerAdd() {
  const container = document.createElement('div');
  container.classList.add('KeyboardContainer');
  document.body.append(container);
}

function textAreaAdd() {
  let newDiv = document.createElement('div');
  newDiv.classList.add('textAreaContainer');
  document.body.prepend(newDiv);
  const ourDiv = document.querySelector('.textAreaContainer');
  newDiv = document.createElement('textarea');
  newDiv.classList.add('textArea');
  ourDiv.append(newDiv);
}

textAreaAdd();
keyboardContainerAdd();

const buttonDiv = document.querySelector('.KeyboardContainer');
const buttonRows = buttonDiv.children;
const area = document.querySelector('.textArea');


function buttonNamesConverter(keyName, usualName, shiftName, capsName, specialTag, eventTrigger) {
  return {
    keyName,
    usualName,
    shiftName,
    capsName,
    specialTag,
    eventTrigger,
  };
}

buttonNames.forEach((item, i) => {
  item.forEach((item2, j) => {
    buttonNames[i][j] = buttonNamesConverter(...item2);
  });
});


function deleteBeforeCursor() {
  const start = area.selectionStart;
  const end = area.selectionEnd;
  let add = 0;
  if (start === 0 && end === 0) {
    return;
  }
  if (start === end) {
    add = 1;
  }
  area.value = area.value.slice(0, start - add) + area.value.slice(end);
  area.selectionStart = (start - add < 0 ? start : start - add);
  area.selectionEnd = area.selectionStart;
}

function addTextAreaText(item) {
  if (CapsToggle === false && ShiftToggle === false) {
    area.value += item.usualName;
  }
  if (ShiftToggle === true) {
    area.value += item.shiftName;
  }
  if (CapsToggle === true) {
    area.value += item.capsName;
  }
}

function redraw(specialName, param) {
  for (let j = 0; j < buttonRows.length; j += 1) {
    const button = buttonRows[j].children;
    for (let i = 0; i < button.length; i += 1) {
      if (specialName) {
        if (param === 'Shift') { button[i].innerHTML = buttonNames[j][i].shiftName; }
      }
      if (!specialName) {
        button[i].innerHTML = buttonNames[j][i].usualName;
      }
    }
  }
}

function addButtonMouseAnimation(button) {
  button.addEventListener('mousedown', () => {
    button.classList.add('active');
  });
  button.addEventListener('mouseup', () => {
    button.classList.remove('active');
  });
}

function addButtonKeyAnimation(button, item, i, rowNumber) {
  document.addEventListener('keydown', (event) => {
    if (event.code === item.keyName) {
      button.classList.add('active');
    }
  });
  document.addEventListener('keyup', (event) => {
    if (event.code === item.keyName) {
      button.classList.remove('active');
    }
  });
  buttonNames[rowNumber][i].eventTrigger = true;
}

function keyEventAddUsualButton(newButton, item, i, rowNumber) {
  newButton.addEventListener('mousedown', () => {
    addTextAreaText(item);
  });
  addButtonMouseAnimation(newButton);
  if (item.eventTrigger === false) {
    document.addEventListener('keyup', (event) => {
      if (event.code === item.keyName) {
        addTextAreaText(item);
      }
    });
    addButtonKeyAnimation(newButton, item, i, rowNumber);
  }
}

function keyEventAddSpecialButton(newButton, item, i, rowNumber) {
  if (item.keyName === 'Shift') {
    addButtonMouseAnimation(newButton);
    newButton.addEventListener('mousedown', () => {
      ShiftToggle = true;
      redraw(ShiftToggle, 'Shift');
    });
    newButton.addEventListener('mouseup', () => {
      ShiftToggle = false;
      redraw(ShiftToggle, 'Shift');
    });
    if (item.eventTrigger === false) {
      addButtonKeyAnimation(newButton, item, i, rowNumber);
      document.addEventListener('keydown', (event) => {
        if (event.key === item.keyName) {
          ShiftToggle = true;
          redraw(ShiftToggle, 'Shift');
        }
      });
      document.addEventListener('keyup', (event) => {
        if (event.key === item.keyName) {
          ShiftToggle = false;
          redraw(ShiftToggle, 'Shift');
        }
      });
    }
  }

  if (item.keyName === 'Backspace') {
    addButtonMouseAnimation(newButton);
    newButton.addEventListener('mouseup', () => {
      deleteBeforeCursor();
    });
    if (item.eventTrigger === false) {
      addButtonKeyAnimation(newButton, item, i, rowNumber);
      document.addEventListener('keyup', (event) => {
        if (event.key === item.keyName) {
          deleteBeforeCursor();
        }
      });
    }
  }

  if (item.keyName !== 'Backspace' && item.keyName !== 'Shift') {
    addButtonMouseAnimation(newButton);
    if (item.eventTrigger === false) {
      addButtonKeyAnimation(newButton, item, i, rowNumber);
    }
  }
}

function createButtons(buttonRow, buttons, rowNumber) {
  buttons.forEach((item, i) => {
    const newButton = document.createElement('button');
    newButton.classList.add('buttonClass');
    newButton.append(item.usualName);
    if (item.specialTag === false) {
      keyEventAddUsualButton(newButton, item, i, rowNumber);
    }
    if (item.specialTag === true) {
      keyEventAddSpecialButton(newButton, item, i, rowNumber);
    }
    buttonRow.append(newButton);
  });
}

function CreateButtonRows(row) {
  row.forEach((item, i) => {
    const newButtonRow = document.createElement('div');
    newButtonRow.classList.add('KeyboardRowClass');
    buttonDiv.append(newButtonRow);
    createButtons(newButtonRow, item, i);
  });
}


CreateButtonRows(buttonNames);

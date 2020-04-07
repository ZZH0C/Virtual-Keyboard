// Создание дива для кнопок
function divAdd() {
  const newDiv = document.createElement('div');
  newDiv.classList.add('class1');
  document.body.append(newDiv);
}

// добавление TextArea и её дива
function textAreaAdd() {
  let newDiv = document.createElement('div');
  newDiv.classList.add('textAreaClass');
  document.body.prepend(newDiv);
  const ourDiv = document.querySelector('.textAreaClass');
  newDiv = document.createElement('textarea');
  newDiv.classList.add('textArea');
  ourDiv.append(newDiv);
}

textAreaAdd();
divAdd();


const buttonDiv = document.querySelector('.class1');
const area = document.querySelector('.textArea');
const CapsToggle = false;
let ShiftToggle = false;

function newSymbol(keyName, usualName, shiftName, capsName, specialTag, documentEventTrigger) {
  return {
    keyName, // ключ, на который будет ивент листенер
    usualName,
    shiftName,
    capsName,
    specialTag,
    documentEventTrigger,
  };
}

const digits = [
  [
    ['Digit1', '1', '!', '1', false, 0],
    ['Digit2', '2', '@', '2', false, 0],
    ['Digit3', '3', '#', '3', false, 0],
    ['Digit4', '4', '$', '4', false, 0],
    ['Digit5', '5', '%', '5', false, 0],
    ['Digit6', '6', '^', '6', false, 0],
    ['Digit7', '7', '&', '7', false, 0],
    ['Digit8', '8', '*', '8', false, 0],
    ['Digit9', '9', '(', '9', false, 0],
    ['Digit0', '0', ')', '0', false, 0],
    ['Minus', '-', '_', '-', false, 0],
    ['Equal', '=', '+', '=', false, 0],
    ['Backspace', 'Backspace', 'Backspace', 'Backspace', true, 0],
  ],
  [
    ['Tab', 'Tab', 'Tab', 'Tab', true, 0],
    ['KeyQ', 'q', 'Q', 'q', false, 0],
    ['KeyW', 'w', 'W', 'w', false, 0],
    ['KeyE', 'e', 'E', 'e', false, 0],
    ['KeyR', 'r', 'R', 'r', false, 0],
    ['KeyT', 't', 'T', 't', false, 0],
    ['KeyY', 'y', 'Y', 'y', false, 0],
    ['KeyU', 'u', 'U', 'u', false, 0],
    ['KeyI', 'i', 'I', 'i', false, 0],
    ['KeyO', 'o', 'O', 'o', false, 0],
    ['KeyP', 'p', 'P', 'p', false, 0],
    ['[', '[', '{', '[', false, 0],
    [']', ']', '}', ']', false, 0],
  ],
  [
    ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', true, 0],
    ['KeyA', 'a', 'A', 'a', false, 0],
    ['KeyS', 's', 'S', 's', false, 0],
    ['KeyD', 'd', 'D', 'd', false, 0],
    ['KeyF', 'f', 'F', 'f', false, 0],
    ['KeyG', 'g', 'G', 'g', false, 0],
    ['KeyH', 'h', 'H', 'h', false, 0],
    ['KeyJ', 'j', 'J', 'j', false, 0],
    ['KeyK', 'k', 'K', 'k', false, 0],
    ['KeyL', 'l', 'L', 'l', false, 0],
    ['Semicolon', ';', ':', 'p', false, 0],
    ['Quote', '\'', '"', '\'', false, 0],
    ['Backslash', '\\', '|', '\\', false, 0],
    ['Enter', 'Enter', 'Enter', 'Enter', true, 0],
  ],
  [
    ['Shift', 'Shift', 'Shift', 'Shift', true, 0],
    ['KeyZ', 'z', 'Z', 'z', false, 0],
    ['KeyX', 'x', 'X', 'x', false, 0],
    ['KeyC', 'c', 'C', 'c', false, 0],
    ['KeyV', 'v', 'V', 'v', false, 0],
    ['KeyB', 'b', 'B', 'b', false, 0],
    ['KeyN', 'n', 'N', 'n', false, 0],
    ['KeyM', 'm', 'M', 'm', false, 0],
    ['Comma', ',', '<', ',', false, 0],
    ['Period', '.', '>', '.', false, 0],
    ['Slash', '/', '?', '/', false, 0],
    ['Shift', 'Shift', 'Shift', 'Shift', true, 0],
  ],
  [
    ['ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', true, 0],
    ['AltLeft', 'Alt', 'Alt', 'Alt', true, 0],
    ['Space', 'Space', 'Space', 'Space', true, 0],
    ['AltRight', 'Alt', 'Alt', 'Alt', true, 0],
    ['ControlRight', 'Ctrl', 'Ctrl', 'Ctrl', true, 0],
    ['ArrowLeft', '←', '←', '←', false, 0],
    ['ArrowUp', '↑', '↑', '↑', false, 0],
    ['ArrowDown', '↓', '↓', '↓', false, 0],
    ['ArrowRight', '→', '→', '→', false, 0],
  ],
];


digits.forEach((item, i) => {
  item.forEach((item2, j) => {
    digits[i][j] = newSymbol(...item2);
  });
}); // создание объекта из общего массива

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
  area.focus();
} // ф-ия для BackSpace

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
} // добавление текста в текстареа


function keyEventNotSpecial(newButton, item, i, rowNumber) {
  newButton.addEventListener('mousedown', () => {
    addTextAreaText(item);
    newButton.classList.add('active');
  });
  newButton.addEventListener('mouseup', () => {
    newButton.classList.remove('active');
  });
  if (item.documentEventTrigger === 0) {
    document.addEventListener('keydown', (event) => {
      if (event.code === item.keyName) {
        newButton.classList.add('active');
      }
    });
    document.addEventListener('keyup', (event) => {
      if (event.code === item.keyName) {
        addTextAreaText(item);
        newButton.classList.remove('active');
      }
    });
    digits[rowNumber][i].documentEventTrigger = 1;
  }
} // для обычных символов


function keyEventYesSpecial(newButton, item, i, rowNumber) {
  if (item.keyName === 'Shift') {
    newButton.addEventListener('mousedown', () => {
      newButton.classList.add('active');
      ShiftToggle = true;
      // eslint-disable-next-line no-use-before-define
      redraw(ShiftToggle, 'Shift');
    });
    newButton.addEventListener('mouseup', () => {
      newButton.classList.remove('active');
      ShiftToggle = false;
      // eslint-disable-next-line no-use-before-define
      redraw(ShiftToggle, 'Shift');
    });
    if (item.documentEventTrigger === 0) {
      document.addEventListener('keydown', (event) => {
        if (event.key === item.keyName) {
          newButton.classList.add('active');
          ShiftToggle = true;
          // eslint-disable-next-line no-use-before-define
          redraw(ShiftToggle, 'Shift');
        }
      });
      document.addEventListener('keyup', (event) => {
        if (event.key === item.keyName) {
          newButton.classList.remove('active');
          ShiftToggle = false;
          // eslint-disable-next-line no-use-before-define
          redraw(ShiftToggle, 'Shift');
        }
      });
      digits[rowNumber][i].documentEventTrigger = 1;
    }
  }

  if (item.keyName === 'Backspace') {
    newButton.addEventListener('mousedown', () => {
      newButton.classList.add('active');
    });
    newButton.addEventListener('mouseup', () => {
      newButton.classList.remove('active');
      deleteBeforeCursor();
    });
    if (item.documentEventTrigger === 0) {
      document.addEventListener('keydown', (event) => {
        if (event.key === item.keyName) {
          newButton.classList.add('active');
        }
      });
      document.addEventListener('keyup', (event) => {
        if (event.key === item.keyName) {
          newButton.classList.remove('active');
          deleteBeforeCursor();
        }
      });
      digits[rowNumber][i].documentEventTrigger = 1;
    }
  }

  if (item.keyName !== 'Backspace' && item.keyName !== 'Shift') {
    newButton.addEventListener('mousedown', () => {
      newButton.classList.add('active');
    });
    newButton.addEventListener('mouseup', () => {
      newButton.classList.remove('active');
    });
    if (item.documentEventTrigger === 0) {
      document.addEventListener('keydown', (event) => {
        if (event.code === item.keyName) {
          newButton.classList.add('active');
        }
      });
      document.addEventListener('keyup', (event) => {
        if (event.code === item.keyName) {
          newButton.classList.remove('active');
        }
      });
      digits[rowNumber][i].documentEventTrigger = 1;
    }
  }
} // для специальных симолов


function createKeyboard(ourDiv, digit, rowNumber) {
  digit.forEach((item, i) => {
    const newButton = document.createElement('button');
    newButton.classList.add('button_class');
    newButton.append(item.usualName);
    if (item.specialTag === false) {
      keyEventNotSpecial(newButton, item, i, rowNumber);
    }
    if (item.specialTag === true) {
      keyEventYesSpecial(newButton, item, i, rowNumber);
    }
    ourDiv.append(newButton);
  });
} // создаие кнопок


function CreateButtonRows(row) {
  row.forEach((item, i) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('class1_podclass');
    buttonDiv.append(newDiv);
    createKeyboard(newDiv, item, i);
  });
} // создание рядов для кнопок
CreateButtonRows(digits);

const b = buttonDiv.children;
function redraw(specialName, param) {
  for (let j = 0; j < b.length; j += 1) {
    const a = b[j].children;
    for (let i = 0; i < a.length; i += 1) {
      if (specialName) {
        if (param === 'Shift') { a[i].innerHTML = digits[j][i].shiftName; }
      }
      if (!specialName) {
        a[i].innerHTML = digits[j][i].usualName;
      }
    }
  }
} // перерисовка клавиатуры при нажатии шифт или капс

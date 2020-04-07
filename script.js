
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
  ['Digit1', '1', '!', '1', false, 0],
  ['Digit2', '2', '@', '2', false, 0],
  ['Digit3', '3', '#', '3', false, 0],
  ['Digit4', '4', '$', '4', false, 0],
  ['Digit5', '5', '%', '5', false, 0],
  ['Digit6', '6', '^', '6', false, 0],
  ['Digit7', '7', '&', '7', false, 0],
  ['Digit8', '8', '*', '8', false, 0],
  ['Digit9', '9', '(', '9', false, 0],
  ['Minus', '-', '_', '-', false, 0],
  ['Equal', '=', '+', '=', false, 0],
  ['Backspace', 'Backspace', 'Backspace', 'Backspace', true, 0],
  ['Shift', 'Shift', 'Shift', 'Shift', true, 0],
];

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
}

digits.forEach((item, i) => {
  digits[i] = newSymbol(...item);
});

const CapsToggle = false;
let ShiftToggle = false;

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
function keyEventNotSpecial(newButton, item, i) { // для обычных клавиш
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
    digits[i].documentEventTrigger = 1;
  }
}
function keyEventYesSpecial(newButton, item, i) { // для специальных клавиш
  if (item.keyName === 'Shift') {
    newButton.addEventListener('mousedown', () => {
      newButton.classList.add('active');
      ShiftToggle = true;
      // eslint-disable-next-line no-use-before-define
      redraw(ShiftToggle);
    });
    newButton.addEventListener('mouseup', () => {
      newButton.classList.remove('active');
      ShiftToggle = false;
      // eslint-disable-next-line no-use-before-define
      redraw(ShiftToggle);
    });
    if (item.documentEventTrigger === 0) {
      document.addEventListener('keydown', (event) => {
        if (event.key === item.keyName) {
          newButton.classList.add('active');
          ShiftToggle = true;
          // eslint-disable-next-line no-use-before-define
          redraw(ShiftToggle);
        }
      });
      document.addEventListener('keyup', (event) => {
        if (event.key === item.keyName) {
          newButton.classList.remove('active');
          ShiftToggle = false;
          // eslint-disable-next-line no-use-before-define
          redraw(ShiftToggle);
        }
      });
      digits[i].documentEventTrigger = 1;
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
      digits[i].documentEventTrigger = 1;
    }
  }
}

function createKeyboard() {
  digits.forEach((item, i) => {
    const newButton = document.createElement('button');
    newButton.classList.add('button_class');
    newButton.append(item.usualName);
    if (item.specialTag === false) {
      keyEventNotSpecial(newButton, item, i);
    }
    if (item.specialTag === true) {
      keyEventYesSpecial(newButton, item, i);
    }
    buttonDiv.append(newButton);
  });
}

createKeyboard();


const a = buttonDiv.children;
function redraw(specialName) {
  for (let i = 0; i < a.length; i += 1) {
    if (specialName) {
      a[i].innerHTML = digits[i].shiftName;
    }
    if (!specialName) {
      a[i].innerHTML = digits[i].usualName;
    }
  }
}


document.addEventListener('keyup', (event) => {
  console.log(event);
});

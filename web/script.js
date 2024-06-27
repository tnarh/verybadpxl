let currentTool = "pencil";
let width = 16;
let height = 16;
let currentColor = "black";
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple', 'brown', 'white', 'black'];
let popup = document.getElementById("popup");
let popupTitle = document.getElementById("popup-title");
let popupDesc = document.getElementById("popup-desc");

function aboutPopup(type) {
  switch (type) {
    case 'about':
      sendPopup("verybadpxl", `Hello!<br>
      I'm <a href='https://glitch.com/@hrantm'>hrantm</a>, a programmer and musician.<br>
      I made verybadpxl as a fun project which only took a few hours, but now I think it could be turned into a much bigger website!<br>
      If you want to help out, check out the <a href='https://github.com/tnarh/verybadpxl'>GitHub page</a>.
      `);
      break;
    default:
      sendPopup("Why are we here?", "Just to suffer...");
      break;
  }
}

function sendPopup(title, desc) {
  popupTitle.innerText = title;
  popupDesc.innerHTML = desc;
  popup.style.display = 'inline';
}

function setTool(tool) {
  currentTool = tool;
  document.getElementById("pencil").dataset.active = currentTool === "pencil";
  document.getElementById("eraser").dataset.active = currentTool === "eraser";
  document.getElementById("picker").dataset.active = currentTool === "picker";
}

function init() {
  popup.style.display = 'none';
  let table = document.getElementById("table");
  setColor('black');

  for (let i = 0; i < height; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < width; j++) {
      let cell = row.insertCell(j);
      cell.id = `px-${i + 1}-${j + 1}`;
      cell.className = "pixel";
    }
  }

  table.addEventListener("mousedown", handleMouseDown);
  table.addEventListener("mouseover", handleMouseOver);
}

function resetAllActive() {
  for (let i = 0; i < colors.length; ++i) {
    document.getElementById(colors[i]).style.borderColor = 'black';
  }
}

function setColor(col) {
  resetAllActive();
  currentColor = col;
  document.getElementById(col).style.borderColor = 'lime';
}

function color(pixel) {
  if (currentTool === "pencil") {
    document.getElementById(pixel).style.backgroundColor = currentColor;
  } else if (currentTool === "eraser") {
    document.getElementById(pixel).style.backgroundColor = document.body.style.backgroundColor;
  } else if (currentTool === "picker") {
    // Get the color of the clicked pixel
    let pixelColor = document.getElementById(pixel).style.backgroundColor;

    // Check if the color is not empty or undefined
    if (pixelColor && pixelColor !== "") {
      // Convert the pixel color to hex format
      setColor(pixelColor);
    }
  }
}


let isMouseDown = false;

function handleMouseDown(event) {
  isMouseDown = true;
  if (event.target.className === "pixel") {
    color(event.target.id);
  }
}

function handleMouseOver(event) {
  if (isMouseDown && event.target.className === "pixel") {
    color(event.target.id);
  }
}

document.addEventListener("mouseup", function () {
  isMouseDown = false;
});

function saveData() {
  let text = "";
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let pixel = document.getElementById(`px-${i + 1}-${j + 1}`);
      let bgColor = pixel.style.backgroundColor;

      if (bgColor == "" || bgColor == undefined) {
        text += colors.indexOf('white');
      } else {
        text += colors.indexOf(bgColor);
      }

      console.log(`px-${i}-${j}`);
    }
  }
  
  sendPopup("Copy this and save it!", text);
  return text;
}

function loadData(text) {
  if (text.length != 256) {
    sendPopup("Invalid code", "Make sure you paste the correct text!");
  } else {
    let indexes = text.split("");

    for (let i = 0; i < indexes.length; i++) {
      // Calculate the row and column indices
      let row = Math.floor(i / width) + 1;
      let col = (i % width) + 1;

      document.getElementById(`px-${row}-${col}`).style.backgroundColor = colors[indexes[i]];
    }
    sendPopup("Image loaded!", "");
  }
}

function loadDataStart() {
  sendPopup("Paste your image data:", "<input type='number' id='dataTemp'><br><button onclick='loadData(document.getElementById(`dataTemp`).value)'>Load</button>");
}

function showcase() {
  window.location.href = `showcase/?data=${saveData()}`;
}

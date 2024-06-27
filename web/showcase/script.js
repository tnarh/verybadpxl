let width = 16;
let height = 16;
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple', 'white', 'black'];

function init() {
  let table = document.getElementById("table-showcase");

  for (let i = 0; i < height; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < width; j++) {
      let cell = row.insertCell(j);
      cell.id = `px-${i + 1}-${j + 1}`;
      cell.className = "pixel-showcase";
    }
  }

  loadData();
}

function loadData() {
  const urlParams = new URLSearchParams(window.location.search);
  const text = urlParams.get("data");
  let indexes = text.split("");

  for (let i = 0; i < indexes.length; i++) {
    let row = Math.floor(i / width) + 1;
    let col = (i % width) + 1;

    let elementId = `px-${row}-${col}`;
    let pixelElement = document.getElementById(elementId);

    if (pixelElement) {
      pixelElement.style.backgroundColor = colors[parseInt(indexes[i])];
    } else {
      console.log('no');
    }
  }
}

function updateTitle() {
  let auth = document.getElementById("info-auth").value;
  let name = document.getElementById("info-name").value;

  document.title = `${auth} - ${name}`;
}

let stt = 1;
let flag = false;
let point = { x: -1, y: -1 };
let src = { x: -1, y: -1 };
const pointSize = 4;
let canvaRegion = document.getElementById("myCanvas");
const menu = document.getElementById("menu");
let ctx = canvaRegion.getContext("2d");

canvaRegion.addEventListener('contextmenu', (e) => e.preventDefault());
function myfunction() {
    menu.style.display = 'block';
    menu.style.top = event.pageY + 'px';
    menu.style.left = event.pageX + 'px';

    var rect = canvaRegion.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    point.x = x;
    point.y = y;
}

canvaRegion.addEventListener('click', function () {
    menu.style.display = 'none';
})

document.getElementById("myCanvas").addEventListener("click", identifyPosition);
function identifyPosition() {
    var rect = document.getElementById("myCanvas").getBoundingClientRect();
    var tdx = event.clientX - rect.left;
    var tdy = event.clientY - rect.top;
    drawCoordinates(tdx, tdy);
}

function delPointFuncton() {
    menu.style.display = 'none';
    if (point.x == -1 && point.y == -1) {
        alert("Error click on delete point");
    } else {
        ctx.beginPath();
        ctx.clearRect(point.x - 2 * pointSize - 1, point.y - 2 * pointSize - 8, 4 * pointSize + 2, 4 * pointSize + 8);
        stt--;
    }
}

function connectToPointFuncton() {
    menu.style.display = 'none';
    if (!flag) {
        src.x = point.x;
        src.y = point.y;
        flag = true;
    }
}

function drawCoordinates(x, y) {
    ctx.fillStyle = "#ff2626"; // Red color
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    ctx.fill();

    if (flag) {
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        flag = false;
    } else {
        ctx.font = "10px Arial";
        ctx.fillText(stt, x - 3, y - 2 * pointSize);
        stt++;
    }
}

function clearFunction(){
    ctx.clearRect(0,0,1000,500);
    stt=1;
}

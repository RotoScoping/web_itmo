/** @type {HTMLCanvasElement} */

function runGrapher() {
  const canvas = document.getElementById("graph");
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");

  const FIGURE_COLOR = "#567efb99";


  function drawGraph() {
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = FIGURE_COLOR;

    ctx.beginPath();
    ctx.moveTo(width / 3, height / 2); // (175, 50)
    ctx.lineTo(width / 2, height / 2); // 291, 175
    ctx.lineTo(width / 2,  height / 1.2 );
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, height / 2); // (0,150)
    ctx.lineTo(width, height / 2); // (300, 150)
    ctx.lineTo(width - 10, height / 2 - 5); // (290, 140)
    ctx.moveTo(width, height / 2); // (300, 150)
    ctx.lineTo(width - 10, height / 2 + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, height);
    ctx.lineTo(width / 2, 0);
    ctx.lineTo(width / 2 - 10, 10);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 + 10, 10);
    ctx.stroke();


    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 3, Math.PI / 2, 0 , true);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();

    // 175 175 175 58 117
    ctx.fillRect(width / 2, (3 * height) / 6, -width / 6, -height / 3);

    ctx.fillStyle = "#000";
    const labels = ["-R", "-R/2", "", "R/2", "R"];

    for (let i = 1; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo((i * width) / 6, height / 2 - 5);
      ctx.lineTo((i * width) / 6, height / 2 + 5);
      ctx.moveTo(width / 2 - 5, (i * height) / 6);
      ctx.lineTo(width / 2 + 5, (i * height) / 6);
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(labels[i - 1], (i * width) / 6, height / 2 - 7);

      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(labels[i - 1], width / 2 + 7, height - (i * height) / 6);
    }

  }

  drawGraph();


}
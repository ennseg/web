const canvas = document.getElementById('coordCanvas');
const cs = canvas.getContext('2d');
const SCALE = 40;

function drawArrow(x, y, angle) {
  cs.save();
  cs.translate(x, y);
  cs.rotate(angle);
  cs.beginPath();
  cs.moveTo(0, 0);
  cs.lineTo(-10, -5);
  cs.moveTo(0, 0);
  cs.lineTo(-10, 5);
  cs.strokeStyle = '#ffffff';
  cs.lineWidth = 2;
  cs.stroke();
  cs.restore();
}

function drawCS() {
  cs.clearRect(0, 0, canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  drawBatman(centerX, centerY, 160);

  cs.strokeStyle = '#ffffff';
  cs.beginPath();
  cs.moveTo(20, centerY);
  cs.lineTo(canvas.width - 20, centerY);
  cs.moveTo(centerX, canvas.height - 20);
  cs.lineTo(centerX, 20);
  cs.stroke();

  drawArrow(canvas.width - 15, centerY, 0);
  drawArrow(centerX, 15, -Math.PI / 2);

  cs.fillStyle = 'rgba(255,255,255,0.6)';
  const scale = SCALE;
  for (let x = -4; x <= 4; x += 2) {
    if (x === 0) continue;
    const px = centerX + x * scale;
    cs.beginPath();
    cs.arc(px, centerY, 3, 0, Math.PI * 2);
    cs.fill();
    cs.fillStyle = 'rgba(255,255,255,0.8)';
    cs.font = '12px Arial';
    cs.textAlign = 'center';
    cs.fillText((x / 4).toString() + "R", px, centerY + 20);
    cs.fillStyle = 'rgba(255,255,255,0.6)';
  }

  for (let y = -4; y <= 4; y += 2) {
    if (y === 0) continue;
    const py = centerY - y * scale;
    cs.beginPath();
    cs.arc(centerX, py, 3, 0, Math.PI * 2);
    cs.fill();
    cs.fillStyle = 'rgba(255,255,255,0.8)';
    cs.font = '12px Arial';
    cs.textAlign = 'left';
    cs.fillText((y / 4).toString() + "R", centerX + 10, py + 4);
    cs.fillStyle = 'rgba(255,255,255,0.6)';
  }

  cs.fillStyle = '#ffffff';
  cs.font = '14px Arial';
  cs.fillText('X', canvas.width - 25, centerY - 10);
  cs.fillText('Y', centerX + 10, 25);
}

function drawBatman(cx, cy, R) {
  cs.save();
  cs.translate(cx, cy);
  cs.scale(1, -1);

  const scaleFactor = R / 7;
  const sqrt33 = Math.sqrt(33);
  const sqrt10 = Math.sqrt(10);
  const a = (3 * sqrt33 - 7) / 112;
  const earHeight = 6 * sqrt10 / 7;
  const earRadius = 3 * sqrt10 / 7;

  cs.beginPath();

  cs.moveTo(7 * scaleFactor, 0);

  for (let xm = 7; xm >= 3; xm -= 0.05) {
    const ym = 3 * Math.sqrt(1 - Math.pow(xm / 7, 2));
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = 3; xm >= 1; xm -= 0.05) {
    const ym = earHeight + (1.5 - 0.5 * xm) - earRadius * Math.sqrt(4 - Math.pow(xm - 1, 2));
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = 1; xm >= 0.75; xm -= 0.01) {
    const ym = 9 - 8 * xm;
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = 0.75; xm >= 0.5; xm -= 0.01) {
    const ym = 3 * xm + 0.75;
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = 0.5; xm >= 0; xm -= 0.01) {
    const ym = 2.25;
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = 0; xm >= -0.5; xm -= 0.01) {
    const ym = 2.25;
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = -0.5; xm >= -0.75; xm -= 0.01) {
    const ym = 3 * Math.abs(xm) + 0.75;
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = -0.75; xm >= -1; xm -= 0.01) {
    const ym = 9 - 8 * Math.abs(xm);
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = -1; xm >= -3; xm -= 0.05) {
    const ym = earHeight + (1.5 - 0.5 * Math.abs(xm)) - earRadius * Math.sqrt(4 - Math.pow(Math.abs(xm) - 1, 2));
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = -3; xm >= -7; xm -= 0.05) {
    const ym = 3 * Math.sqrt(1 - Math.pow(xm / 7, 2));
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = -7; xm <= -4; xm += 0.05) {
    const ym = -3 * Math.sqrt(1 - Math.pow(xm / 7, 2));
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = -4; xm <= 0; xm += 0.05) {
    const absx = Math.abs(xm);
    const circlePart = Math.sqrt(1 - Math.pow(Math.abs(absx - 2) - 1, 2));
    const ym = (absx / 2) - a * Math.pow(xm, 2) - 3 + circlePart;
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = 0; xm <= 4; xm += 0.05) {
    const absx = xm;
    const circlePart = Math.sqrt(1 - Math.pow(Math.abs(absx - 2) - 1, 2));
    const ym = (absx / 2) - a * Math.pow(xm, 2) - 3 + circlePart;
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  for (let xm = 4; xm <= 7; xm += 0.05) {
    const ym = -3 * Math.sqrt(1 - Math.pow(xm / 7, 2));
    cs.lineTo(xm * scaleFactor, ym * scaleFactor);
  }

  cs.closePath();
  cs.fillStyle = 'rgba(0, 120, 255, 0.4)';
  cs.strokeStyle = '#00F7FF';
  cs.lineWidth = 1.5;
  cs.fill();
  cs.stroke();

  cs.restore();
}

function drawPoint(x, y, r, color = 'red') {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const R = 160;
  const x_value = centerX + (x * (R / r));
  const y_value = centerY - (y * (R / r));
  cs.fillStyle = color;
  cs.beginPath();
  cs.arc(x_value, y_value, 5, 0, 2 * Math.PI);
  cs.fill();
}

function drawAllPointsFromBean() {
  if (typeof points !== 'undefined' && Array.isArray(points)) {
    points.forEach(p => {
      drawPoint(p.x, p.y, p.r, p.success ? 'lime' : 'red');
    });
  }
}

function clearCanvasOnly() {
  cs.clearRect(0, 0, canvas.width, canvas.height);
  drawCS();
}

drawCS();
drawAllPointsFromBean();

document.addEventListener('DOMContentLoaded', () => {
  const clearButton = document.querySelector('.clear');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      clearCanvasOnly();
    });
  }
});

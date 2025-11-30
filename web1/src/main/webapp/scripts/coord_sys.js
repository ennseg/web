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
    const scale = 40;

    cs.strokeStyle = '#00F7FF';
    cs.beginPath();
    cs.moveTo(centerX - 80, centerY);
    cs.lineTo(centerX - 80, centerY - 160);
    cs.lineTo(centerX, centerY - 160);
    cs.lineTo(centerX + 80, centerY);
    cs.lineTo(centerX, centerY);
    cs.lineTo(centerX, centerY + 80);
    cs.arc(centerX, centerY, 80, Math.PI/2, Math.PI);
    cs.fillStyle = 'rgba(0, 247, 255, 0.3)';
    cs.fill();
    cs.stroke();

    cs.strokeStyle = '#ffffff';
    cs.beginPath();
    cs.moveTo(20, canvas.height / 2);
    cs.lineTo(canvas.width - 20, canvas.height / 2);
    cs.stroke();
    cs.beginPath();
    cs.moveTo(canvas.width / 2, canvas.height - 20);
    cs.lineTo(canvas.width / 2, 20);
    cs.stroke();

    drawArrow(canvas.width - 15, canvas.height / 2, 0);
    drawArrow(canvas.width / 2, 15, -Math.PI / 2);

    cs.fillStyle = 'rgba(255, 255, 255, 0.6)';

    for (let x = -4; x <= 4; x = x+2) {
        if (x === 0) continue;
        const pixelX = centerX + x * scale;
        cs.beginPath();
        cs.arc(pixelX, centerY, 3, 0, Math.PI * 2);
        cs.fill();
        cs.fillStyle = 'rgba(255, 255, 255, 0.8)';
        cs.font = '12px Arial';
        cs.textAlign = 'center';
        cs.fillText((x/4).toString()+"R", pixelX, centerY + 20);
        cs.fillStyle = 'rgba(255, 255, 255, 0.6)';
    }

    for (let y = -4; y <= 4; y = y+2) {
        if (y === 0) continue;
        const pixelY = centerY - y * scale;
        cs.beginPath();
        cs.arc(centerX, pixelY, 3, 0, Math.PI * 2);
        cs.fill();
        cs.fillStyle = 'rgba(255, 255, 255, 0.8)';
        cs.font = '12px Arial';
        cs.textAlign = 'left';
        cs.fillText((y/4).toString()+"R", centerX + 10, pixelY + 4);
        cs.fillStyle = 'rgba(255, 255, 255, 0.6)';
    }

    cs.fillStyle = '#ffffff';
    cs.font = '14px Arial';
    cs.fillText('X', canvas.width - 25, centerY - 10);
    cs.fillText('Y', centerX + 10, 25);
}

function drawPoint(x, y, r, color = 'red') {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const R = 80;
    const x_value = centerX + (x * (R / r));
    const y_value = centerY - (y * (R / r));
    cs.fillStyle = color;
    cs.beginPath();
    cs.arc(x_value, y_value, 5, 0, 2 * Math.PI);
    cs.fill();
}

drawCS();
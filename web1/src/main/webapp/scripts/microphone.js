document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("mic");
  const cs = canvas.getContext("2d");
  const button = document.querySelector(".microphone");


  const scale = 0.9;

  const cx = 15;
  const cy = 12;
  const r = 7 * scale;
  const bodyHeight = 10 * scale;
  const legHeight = 6 * scale;
  const standWidth = 12 * scale;
  const holderRadius = 12 * scale;

  cs.lineWidth = 2;
  cs.strokeStyle = "#ffffff";
  cs.fillStyle = "#aaa";

  cs.beginPath();
  cs.arc(cx, cy, r, Math.PI, 0, false);
  cs.lineTo(cx + r, cy + bodyHeight);
  cs.lineTo(cx - r, cy + bodyHeight);
  cs.closePath();
  cs.fill();
  cs.stroke();

  cs.beginPath();
  cs.moveTo(cx, cy + bodyHeight);
  cs.lineTo(cx, cy + bodyHeight + legHeight);
  cs.stroke();

  cs.beginPath();
  cs.moveTo(cx - standWidth / 2, cy + bodyHeight + legHeight);
  cs.lineTo(cx + standWidth / 2, cy + bodyHeight + legHeight);
  cs.stroke();

  cs.beginPath();
  cs.arc(cx, cy + bodyHeight / 2, holderRadius, 0.8 * Math.PI, 0.2 * Math.PI, false);
  cs.stroke();
});

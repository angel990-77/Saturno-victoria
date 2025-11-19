window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // Palabras lindas para tu novia
  const lunas = ["Amor", "Bella", "Tesoro", "Cielo", "Luz", "Corazón", "Mi Vida", "Estrella", "Dulzura", "Princesa"];

  // Crear estrellas con parpadeo
  const estrellas = Array.from({length: 250}, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02
  }));

  let angulo = 0;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resizeCanvas);

  function drawStars() {
    estrellas.forEach(star => {
      star.alpha += star.delta;
      if(star.alpha <= 0 || star.alpha >=1) star.delta *= -1;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.fill();
    });
  }

  function drawSaturno() {
    const centerX = width/2;
    const centerY = height/2;
    const saturnoRadius = 70;

    // Planeta
    ctx.beginPath();
    ctx.arc(centerX, centerY, saturnoRadius, 0, Math.PI*2);
    ctx.fillStyle = "#f4e842";
    ctx.fill();

    // Anillo con degradado
    const gradient = ctx.createRadialGradient(centerX, centerY, saturnoRadius, centerX, centerY, saturnoRadius+30);
    gradient.addColorStop(0, "rgba(255,255,255,0.2)");
    gradient.addColorStop(1, "rgba(255,255,255,0.8)");

    ctx.beginPath();
    ctx.ellipse(centerX, centerY, saturnoRadius+30, saturnoRadius+15, angulo/2, 0, Math.PI*2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6;
    ctx.stroke();

    return {centerX, centerY, saturnoRadius};
  }

  function drawLunas(centerX, centerY, saturnoRadius) {
    lunas.forEach((palabra, i) => {
      const angleOffset = (i / lunas.length) * Math.PI*2;
      const moonX = centerX + Math.cos(angulo + angleOffset) * (saturnoRadius + 100);
      const moonY = centerY + Math.sin(angulo + angleOffset) * (saturnoRadius + 100);

      // Luna con brillo
      ctx.beginPath();
      ctx.arc(moonX, moonY, 22, 0, Math.PI*2);
      ctx.fillStyle = "#a2d2ff";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Palabra encima
      ctx.fillStyle = "#ffffff";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(palabra, moonX, moonY);
    });
  }

  function animate() {
    ctx.clearRect(0,0,width,height);
    drawStars();
    const {centerX, centerY, saturnoRadius} = drawSaturno();
    drawLunas(centerX, centerY, saturnoRadius);
    angulo += 0.01;
    requestAnimationFrame(animate);
  }

  animate();
});

import { useEffect, useRef } from 'react';

export function ThreeJsLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let rotation = 0;
    let progress = 0;

    const drawLaptop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      // 💻 Laptop Screen
      ctx.fillStyle = '#020617';
      ctx.fillRect(-90, -80, 180, 110);

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.strokeRect(-90, -80, 180, 110);

      // 🧠 Code lines
      ctx.font = '14px monospace';
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('const dev = () => {', -75, -45);
      ctx.fillStyle = '#22d3ee';
      ctx.fillText('  build BG Portfolio();', -75, -25);
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('}', -75, -5);

      // ⌨️ Keyboard base
      ctx.fillStyle = '#020617';
      ctx.fillRect(-110, 35, 220, 25);

      ctx.strokeStyle = '#1e40af';
      ctx.strokeRect(-110, 35, 220, 25);

      // {} Code brackets
      ctx.fillStyle = '#38bdf8';
      ctx.font = '28px monospace';
      ctx.fillText('{', -130, 20);
      ctx.fillText('}', 115, 20);

      ctx.restore();

      // 🔵 Loading bar
      const barWidth = 320;
      const barHeight = 4;
      const barX = centerX - barWidth / 2;
      const barY = centerY + 140;

      ctx.fillStyle = '#020617';
      ctx.fillRect(barX, barY, barWidth, barHeight);

      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(barX, barY, barWidth * progress, barHeight);

      // 📟 Loading text
      ctx.fillStyle = '#e5e7eb';
      ctx.font = '18px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `Compiling BG Portfolio... ${Math.floor(progress * 100)}%`,
        centerX,
        barY + 28
      );
    };

    const animate = () => {
      rotation = Math.sin(Date.now() * 0.002) * 0.05;
      progress = Math.min(progress + 0.008, 1);

      drawLaptop();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020617] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

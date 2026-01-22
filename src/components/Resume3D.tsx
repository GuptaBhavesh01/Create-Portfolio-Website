import { useEffect, useRef, useState } from 'react';

export function Resume3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    const drawResume = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate 3D perspective
      const scale = 1 + Math.sin(rotation.y) * 0.3;
      const offsetX = Math.sin(rotation.y) * 50;
      const offsetY = Math.sin(rotation.x) * 30;

      ctx.save();
      ctx.translate(centerX + offsetX, centerY + offsetY);
      ctx.scale(scale, scale);

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(-135, -185, 270, 360);

      // Resume paper
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-130, -190, 260, 350);

      // Header
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(-130, -190, 260, 60);

      // Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('BHAVESH GUPTA', 0, -160);

      // Title
      ctx.font = '14px system-ui';
      ctx.fillText('Full Stack Developer', 0, -140);

      // Content sections
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'left';
      
      // Experience
      ctx.fillText('EXPERIENCE', -110, -100);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px system-ui';
      ctx.fillText('SDE Intern @ Bluestock', -110, -80);
      ctx.fillText('June 2025 - July 2025', -110, -65);
      
      // Skills
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 14px system-ui';
      ctx.fillText('SKILLS', -110, -30);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px system-ui';
      ctx.fillText('React, Next.js, Three.js', -110, -10);
      ctx.fillText('TypeScript, Node.js', -110, 5);
      ctx.fillText('Tailwind CSS, WebGL', -110, 20);

      // Education
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 14px system-ui';
      ctx.fillText('EDUCATION', -110, 55);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px system-ui';
      ctx.fillText('B.Tech Computer Science', -110, 75);
      ctx.fillText('Government Engineering College Raipur, 2026', -110, 90);

      // Border highlight
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.strokeRect(-130, -190, 260, 350);

      ctx.restore();
    };

    drawResume();
  }, [rotation]);

  // Auto-rotation when not dragging
  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x + 0.005,
        y: prev.y + 0.01,
      }));
    }, 16);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background to-muted/20 rounded-lg border border-border">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
        Drag to rotate
      </div>
    </div>
  );
}

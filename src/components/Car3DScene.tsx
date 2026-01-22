import { useEffect, useRef, useState } from 'react';

export function Car3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0.3, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

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

    const draw3DCar = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate 3D transformations
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);

      const project = (x: number, y: number, z: number) => {
        // Rotate around Y axis
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        
        // Rotate around X axis
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective projection
        const scale = 400 / (400 + z2);
        
        return {
          x: centerX + x1 * scale * zoom,
          y: centerY + y1 * scale * zoom,
          z: z2,
        };
      };

      // Car vertices
      const carBody = [
        // Bottom front
        [-80, 30, -40],
        [80, 30, -40],
        [80, 30, 40],
        [-80, 30, 40],
        // Top
        [-60, -20, -20],
        [60, -20, -20],
        [60, -20, 20],
        [-60, -20, 20],
        // Hood
        [-80, 10, -40],
        [80, 10, -40],
      ];

      const faces = [
        // Body
        { points: [0, 1, 5, 4], color: '#3b82f6' },
        { points: [1, 2, 6, 5], color: '#2563eb' },
        { points: [2, 3, 7, 6], color: '#3b82f6' },
        { points: [3, 0, 4, 7], color: '#1d4ed8' },
        { points: [4, 5, 6, 7], color: '#60a5fa' },
        // Hood
        { points: [0, 1, 9, 8], color: '#2563eb' },
      ];

      // Sort faces by z-index (painter's algorithm)
      const projectedFaces = faces.map((face) => {
        const points = face.points.map((i) => project(...(carBody[i] as [number, number, number])));
        const avgZ = points.reduce((sum, p) => sum + p.z, 0) / points.length;
        return { ...face, points, avgZ };
      });

      projectedFaces.sort((a, b) => a.avgZ - b.avgZ);

      // Draw faces
      projectedFaces.forEach((face) => {
        ctx.fillStyle = face.color;
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        face.points.forEach((point, i) => {
          if (i === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // Draw wheels
      const wheels = [
        [-50, 30, -30],
        [50, 30, -30],
        [-50, 30, 30],
        [50, 30, 30],
      ];

      wheels.forEach((wheel) => {
        const pos = project(...(wheel as [number, number, number]));
        
        // Wheel
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 15 * zoom, 0, Math.PI * 2);
        ctx.fill();
        
        // Rim
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 8 * zoom, 0, Math.PI * 2);
        ctx.stroke();

        // Spokes
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5 + rotation.y;
          ctx.beginPath();
          ctx.moveTo(pos.x, pos.y);
          ctx.lineTo(
            pos.x + Math.cos(angle) * 8 * zoom,
            pos.y + Math.sin(angle) * 8 * zoom
          );
          ctx.stroke();
        }
      });

      // Headlights
      const headlights = [
        [-60, 10, -40],
        [60, 10, -40],
      ];

      headlights.forEach((light) => {
        const pos = project(...(light as [number, number, number]));
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 8 * zoom);
        gradient.addColorStop(0, '#fbbf24');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 8 * zoom, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ground shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 50 * zoom, 100 * zoom, 20 * zoom, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    draw3DCar();
  }, [rotation, zoom]);

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging) return;

    const animate = () => {
      setRotation((prev) => ({
        ...prev,
        y: prev.y + 0.01,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
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
      x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev.x + deltaY * 0.01)),
      y: prev.y + deltaX * 0.01,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.max(0.5, Math.min(2, prev - e.deltaY * 0.001)));
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-background to-muted/20 rounded-lg border border-border overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
    </div>
  );
}

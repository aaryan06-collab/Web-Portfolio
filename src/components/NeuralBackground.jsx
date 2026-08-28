import { useEffect, useRef } from 'react';

const NODE_COUNT_DESKTOP = 50;
const NODE_COUNT_MOBILE = 25;
const CONNECTION_DIST = 150;
const MOUSE_RADIUS = 200;
const MOUSE_FORCE = 0.02;
const NODE_SPEED = 0.3;
const NODE_RADIUS = 2;
let nodeColor = [74, 222, 128];

const SMOOTHING = 0.1;

const DARK_OPACITIES = {
  node: 0.15,
  lineMax: 0.08,
  glowAlpha: 0.4,
  particle: 0.3,
  trail: 0.08,
};

const LIGHT_OPACITIES = {
  node: 0.8,
  lineMax: 0.6,
  glowAlpha: 0.8,
  particle: 1,
  trail: 0.4,
};

const PARTICLE_COUNT = 35;
const PARTICLE_SPEED = 0.6;
const PARTICLE_RADIUS = 1;

function createNode(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * NODE_SPEED * 2,
    vy: (Math.random() - 0.5) * NODE_SPEED * 2,
  };
}

function createParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
    vy: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
    prevX: 0,
    prevY: 0,
  };
}

function clampSpeed(v, min, max) {
  const speed = Math.hypot(v.vx, v.vy);
  if (speed < min) {
    const scale = min / (speed || 1);
    v.vx *= scale;
    v.vy *= scale;
  } else if (speed > max) {
    const scale = max / speed;
    v.vx *= scale;
    v.vy *= scale;
  }
}

export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -1000, y: -1000 };
    let nodes = [];
    let particles = [];

    const currentO = { ...DARK_OPACITIES };
    const targetO = { ...DARK_OPACITIES };

    function readTheme() {
      const palette = document.documentElement.classList.contains('light')
        ? LIGHT_OPACITIES
        : DARK_OPACITIES;
      Object.assign(targetO, palette);
    }
    readTheme();

    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initEntities();
    }

    function initEntities() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const nodeCount = w < 768 ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
      nodes = Array.from({ length: nodeCount }, () => createNode(w, h));
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const p = createParticle(w, h);
        p.prevX = p.x;
        p.prevY = p.y;
        return p;
      });
    }

    function animate() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (const key of Object.keys(currentO)) {
        currentO[key] += (targetO[key] - currentO[key]) * SMOOTHING;
      }
      const o = currentO;
      ctx.clearRect(0, 0, w, h);

      for (const node of nodes) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          node.vx += (dx / dist) * MOUSE_FORCE;
          node.vy += (dy / dist) * MOUSE_FORCE;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > w) { node.x = w; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > h) { node.y = h; node.vy *= -1; }

        clampSpeed(node, NODE_SPEED * 0.6, NODE_SPEED * 2);
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * o.lineMax;
            ctx.save();
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${nodeColor[0]},${nodeColor[1]},${nodeColor[2]},${o.glowAlpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${nodeColor[0]},${nodeColor[1]},${nodeColor[2]},${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor[0]},${nodeColor[1]},${nodeColor[2]},${o.node})`;
        ctx.fill();
      }

      for (const p of particles) {
        const pdx = mouse.x - p.x;
        const pdy = mouse.y - p.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < MOUSE_RADIUS && pdist > 0) {
          p.vx += (pdx / pdist) * MOUSE_FORCE * 0.5;
          p.vy += (pdy / pdist) * MOUSE_FORCE * 0.5;
        }

        p.prevX = p.x;
        p.prevY = p.y;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vy *= -1; }

        clampSpeed(p, PARTICLE_SPEED * 0.5, PARTICLE_SPEED * 2);

        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${nodeColor[0]},${nodeColor[1]},${nodeColor[2]},${o.trail})`;
        ctx.lineWidth = PARTICLE_RADIUS;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor[0]},${nodeColor[1]},${nodeColor[2]},${o.particle})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    function onMouse(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    window.addEventListener('mousemove', onMouse);
    document.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      themeObserver.disconnect();
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
}

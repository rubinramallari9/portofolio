// CSS-only starfield - replaces 660KB Three.js bundle with ~2KB CSS
// No JavaScript runtime, no hydration delay, GPU-accelerated

export default function StarfieldCSS() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0A1929] overflow-hidden">
      {/* Layer 1: Small distant stars */}
      <div
        className="absolute inset-0 animate-stars-slow"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, #94A3B8, transparent),
            radial-gradient(1px 1px at 40px 70px, #64748B, transparent),
            radial-gradient(1px 1px at 50px 160px, #94A3B8, transparent),
            radial-gradient(1px 1px at 90px 40px, #475569, transparent),
            radial-gradient(1px 1px at 130px 80px, #94A3B8, transparent),
            radial-gradient(1px 1px at 160px 120px, #64748B, transparent),
            radial-gradient(1px 1px at 200px 50px, #94A3B8, transparent),
            radial-gradient(1px 1px at 220px 140px, #475569, transparent),
            radial-gradient(1px 1px at 260px 90px, #94A3B8, transparent),
            radial-gradient(1px 1px at 300px 20px, #64748B, transparent)
          `,
          backgroundSize: "320px 200px",
        }}
      />

      {/* Layer 2: Medium stars */}
      <div
        className="absolute inset-0 animate-stars-medium"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 100px 50px, #94A3B8, transparent),
            radial-gradient(1.5px 1.5px at 200px 150px, #60A5FA, transparent),
            radial-gradient(1.5px 1.5px at 300px 100px, #94A3B8, transparent),
            radial-gradient(1.5px 1.5px at 400px 60px, #64748B, transparent),
            radial-gradient(1.5px 1.5px at 500px 180px, #94A3B8, transparent),
            radial-gradient(1.5px 1.5px at 50px 120px, #60A5FA, transparent),
            radial-gradient(1.5px 1.5px at 150px 200px, #94A3B8, transparent),
            radial-gradient(1.5px 1.5px at 250px 30px, #64748B, transparent)
          `,
          backgroundSize: "550px 250px",
        }}
      />

      {/* Layer 3: Large bright stars (fewer, more prominent) */}
      <div
        className="absolute inset-0 animate-stars-fast"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 150px 100px, #fff, transparent),
            radial-gradient(2px 2px at 400px 200px, #60A5FA, transparent),
            radial-gradient(2px 2px at 600px 50px, #fff, transparent),
            radial-gradient(2px 2px at 250px 250px, #60A5FA, transparent),
            radial-gradient(2px 2px at 700px 150px, #fff, transparent)
          `,
          backgroundSize: "800px 300px",
        }}
      />

      {/* Subtle gradient overlay for depth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 0%, #0A1929 70%)",
        }}
      />
    </div>
  );
}

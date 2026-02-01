import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1e3a5f 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e293b 0%, transparent 50%)",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
            opacity: 0.2,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #60A5FA 0%, #1e40af 100%)",
            opacity: 0.15,
            filter: "blur(60px)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          {/* Name */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 900,
              background: "linear-gradient(135deg, #60A5FA 0%, #93C5FD 50%, #60A5FA 100%)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              marginBottom: "16px",
              letterSpacing: "-2px",
            }}
          >
            Rubin Ramallari
          </h1>

          {/* Title */}
          <p
            style={{
              fontSize: "32px",
              color: "#94A3B8",
              margin: 0,
              marginBottom: "40px",
              fontWeight: 500,
            }}
          >
            Full Stack Developer & Software Engineer
          </p>

          {/* Tech stack badges */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["React", "Next.js", "TypeScript", "Python", "Django"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "12px 24px",
                    background: "rgba(96, 165, 250, 0.1)",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                    borderRadius: "9999px",
                    color: "#60A5FA",
                    fontSize: "20px",
                    fontWeight: 600,
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#60A5FA",
            }}
          />
          <span
            style={{
              color: "#64748B",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            rubinramallari.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

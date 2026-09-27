import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export async function GET() {
  const [logo, drawing, bicycle, medium, extraBold] = await Promise.all([
    readFile(join(process.cwd(), "public/assets/logo_DOMTEKNIKA_2023-alpha.png"), "base64"),
    readFile(join(process.cwd(), "public/assets/technical-drawing-top.png"), "base64"),
    readFile(join(process.cwd(), "public/assets/rv01-hero.png"), "base64"),
    readFile(join(process.cwd(), "src/app/fonts/42dot-domteknika-500.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/42dot-domteknika-800.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#ffffff", color: "#111111", fontFamily: "Domtek Sans" }}>
        {/* ImageResponse uses plain img elements to render the existing homepage assets. */}
        {/* eslint-disable @next/next/no-img-element */}
        <img src={`data:image/png;base64,${drawing}`} alt="" width={800} height={519} style={{ position: "absolute", right: -90, top: -14, opacity: 0.5 }} />
        <div style={{ display: "flex", position: "absolute", inset: 0, background: "linear-gradient(to right, white 0%, rgba(255,255,255,0.94) 36%, rgba(255,255,255,0.3) 67%, rgba(255,255,255,0.08) 100%)" }} />
        <img src={`data:image/png;base64,${bicycle}`} alt="" width={800} height={500} style={{ position: "absolute", right: -72, bottom: -6, objectFit: "contain" }} />
        <div style={{ display: "flex", position: "absolute", left: 440, top: 128, bottom: 0, width: 170, background: "linear-gradient(to right, white, rgba(255,255,255,0))" }} />
        <img src={`data:image/png;base64,${logo}`} alt="DOMTEKNIKA" width={258} height={104} style={{ position: "absolute", left: 52, top: 30, objectFit: "contain" }} />
        {/* eslint-enable @next/next/no-img-element */}
        <div style={{ display: "flex", position: "absolute", left: 60, top: 174, flexDirection: "column", fontSize: 58, lineHeight: 1.14, fontWeight: 500, textShadow: "0 4px 6px rgba(0,0,0,0.24)" }}>
          {["Engineering", "Prototyping", "Producing"].map((word) => (
            <div key={word} style={{ display: "flex" }}>{word}<span style={{ color: "#e30613" }}>.</span></div>
          ))}
        </div>
        <div style={{ display: "flex", position: "absolute", left: 60, top: 405, fontSize: 62, lineHeight: 1.05, fontWeight: 800, textShadow: "0 4px 6px rgba(0,0,0,0.24)" }}>
          Shape your dream<span style={{ color: "#e30613" }}>.</span>
        </div>
        <div style={{ display: "flex", position: "absolute", left: 62, bottom: 66, alignItems: "center", gap: 18, fontSize: 27, fontWeight: 500, color: "#565656" }}>
          <div style={{ display: "flex", width: 40, height: 3, background: "#e30613" }} />
          Swiss engineering
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Domtek Sans", data: medium, weight: 500, style: "normal" },
        { name: "Domtek Sans", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}

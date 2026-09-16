import { DEFAULT_MY_NUMBERS } from "@/lib/store";
import { ImageResponse } from "next/og";
import { baseNumbersOf, starNumbersOf } from "@/utils/euromillions";

export const alt =
  "Simulateur Euromillions : testez vos numéros et vos gains";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Drawn rather than shipped as a file, so the card stays in step with the
// palette instead of being a screenshot that quietly goes out of date.
export default function OpengraphImage() {
  const palette = {
    background: "#e5eaf2",
    card: "#FBFBFA",
    border: "#cbd4e4",
    text: "#274e73",
    muted: "#5a81a6",
    star: "#7c94bc",
  };

  const ball = (number: number, isStar: boolean) => (
    <div
      key={`${isStar ? "star" : "base"}-${number}`}
      style={{
        width: 84,
        height: 84,
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40,
        fontWeight: 600,
        color: isStar ? palette.card : palette.text,
        background: isStar ? palette.star : palette.card,
        border: `3px solid ${isStar ? palette.star : palette.border}`,
      }}
    >
      {number}
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 48,
          padding: 80,
          background: palette.background,
          color: palette.text,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>
            Simulateur Euromillions
          </div>
          <div style={{ fontSize: 36, color: palette.muted }}>
            Jouez votre grille sur des années de tirages, en quelques secondes
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {baseNumbersOf(DEFAULT_MY_NUMBERS).map((number) => ball(number, false))}
          {starNumbersOf(DEFAULT_MY_NUMBERS).map((number) => ball(number, true))}
        </div>
      </div>
    ),
    size
  );
}

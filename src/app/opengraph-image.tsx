import { ImageResponse } from "next/og";

export const alt = "Churnable — Compare Credit Card & Bank Account Bonuses";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#015ecc",
        padding: "54px 64px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Playful background bubble circles (solid, no gradients) */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-60px",
          width: "360px",
          height: "360px",
          borderRadius: "9999px",
          backgroundColor: "#026be8",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "240px",
          width: "280px",
          height: "280px",
          borderRadius: "9999px",
          backgroundColor: "#0052b3",
        }}
      />

      {/* Top header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Bubbly Logo Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            backgroundColor: "#ffffff",
            padding: "10px 24px",
            borderRadius: "9999px",
            boxShadow: "0 6px 20px rgba(0, 32, 96, 0.22)",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              backgroundColor: "#0160c4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderLeft: "4px solid #38b6ff",
                borderBottom: "4px solid #00bf63",
                transform: "rotate(-45deg)",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "26px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#0f172a",
            }}
          >
            Churnable
          </span>
        </div>

        {/* Tilted Sticker: Free Money Alert */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#ffd836",
            color: "#1e293b",
            padding: "10px 22px",
            borderRadius: "9999px",
            fontSize: "15px",
            fontWeight: 900,
            letterSpacing: "0.02em",
            transform: "rotate(3deg)",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.18)",
          }}
        >
          <span>💸 FREE MONEY FROM BANKS</span>
        </div>
      </div>

      {/* Main Headline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "relative",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            fontSize: "66px",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            textShadow: "0 4px 16px rgba(0, 30, 90, 0.35)",
          }}
        >
          Banks have billions.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "66px",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#ffd836",
            textShadow: "0 4px 16px rgba(0, 30, 90, 0.35)",
          }}
        >
          <span>Go get your share.</span>
          <span style={{ fontSize: "60px" }}>🎉</span>
        </div>
      </div>

      {/* 3 Bubbly Floating Offer Cards */}
      <div
        style={{
          display: "flex",
          gap: "18px",
          position: "relative",
          marginTop: "8px",
        }}
      >
        {/* Bubble Card 1: Sapphire */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            backgroundColor: "#ffffff",
            borderRadius: "26px",
            padding: "20px 22px",
            boxShadow: "0 10px 28px rgba(0, 24, 80, 0.28)",
            transform: "rotate(-2deg)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#0160c4",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              ✈️ Travel Card
            </span>
            <span
              style={{
                backgroundColor: "#eef6ff",
                color: "#0160c4",
                fontSize: "11px",
                fontWeight: 800,
                padding: "3px 8px",
                borderRadius: "9999px",
              }}
            >
              TOP PICK
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Chase Sapphire
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "#00a859",
                letterSpacing: "-0.03em",
              }}
            >
              75,000 pts
            </span>
            <span
              style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}
            >
              ≈ $750
            </span>
          </div>
        </div>

        {/* Bubble Card 2: Checking */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            backgroundColor: "#ffffff",
            borderRadius: "26px",
            padding: "20px 22px",
            boxShadow: "0 10px 28px rgba(0, 24, 80, 0.28)",
            transform: "rotate(1.5deg)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#0284c7",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              🏦 Checking Bonus
            </span>
            <span
              style={{
                backgroundColor: "#e0f2fe",
                color: "#0284c7",
                fontSize: "11px",
                fontWeight: 800,
                padding: "3px 8px",
                borderRadius: "9999px",
              }}
            >
              CASH
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Citi Priority Checking
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "#00a859",
                letterSpacing: "-0.03em",
              }}
            >
              +$700
            </span>
            <span
              style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}
            >
              direct deposit
            </span>
          </div>
        </div>

        {/* Bubble Card 3: Year 1 Upside */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            backgroundColor: "#e6f9f0",
            borderRadius: "26px",
            padding: "20px 22px",
            boxShadow: "0 10px 28px rgba(0, 24, 80, 0.28)",
            border: "2px solid #a7f3d0",
            transform: "rotate(-1deg)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#047857",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              🚀 1st-Year Potential
            </span>
            <span
              style={{
                backgroundColor: "#d1fae5",
                color: "#065f46",
                fontSize: "11px",
                fontWeight: 800,
                padding: "3px 8px",
                borderRadius: "9999px",
              }}
            >
              COMBINED
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#064e3b",
            }}
          >
            Avg. Churner Upside
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "#00875a",
                letterSpacing: "-0.03em",
              }}
            >
              +$2,350
            </span>
            <span
              style={{ fontSize: "13px", fontWeight: 700, color: "#065f46" }}
            >
              /year
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Pill Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 800,
          }}
        >
          <span>✨ 100% Free to Use</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>🎯 0% Corporate Bias</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>⚡️ Verified Daily</span>
        </div>

        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
            padding: "8px 20px",
            borderRadius: "9999px",
            fontSize: "16px",
            fontWeight: 900,
            letterSpacing: "-0.01em",
          }}
        >
          churn.cc
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}

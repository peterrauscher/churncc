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
        backgroundColor: "#090d16",
        padding: "70px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#ffffff",
        border: "1px solid #1e293b",
      }}
    >
      {/* Top bar with brand logo & kicker */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Churnable logo icon representation */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#0160c4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderLeft: "4px solid #38b6ff",
                borderBottom: "4px solid #00bf63",
                transform: "rotate(-45deg)",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Churnable
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#172554",
            border: "1px solid #1e3a8a",
            padding: "8px 18px",
            borderRadius: "9999px",
            fontSize: "14px",
            fontWeight: 700,
            color: "#38b6ff",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          1,000+ Offers Tracked · Daily Verification
        </div>
      </div>

      {/* Center content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            margin: 0,
          }}
        >
          Smart bonus decisions start with honest math.
        </h1>
        <p
          style={{
            fontSize: "24px",
            lineHeight: 1.4,
            color: "#94a3b8",
            margin: 0,
            maxWidth: "960px",
          }}
        >
          Compare the nation&apos;s highest credit card welcome offers and bank
          account deposit promotions. 100% free, independent, and ranked
          strictly by net payout.
        </p>
      </div>

      {/* Bottom metrics banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #1e293b",
          paddingTop: "32px",
        }}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Rankings
            </span>
            <span
              style={{ fontSize: "20px", fontWeight: 800, color: "#00bf63" }}
            >
              100% Merit-Based
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Valuations
            </span>
            <span
              style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff" }}
            >
              Conservative Dollar Math
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Access
            </span>
            <span
              style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff" }}
            >
              Free, No Login Needed
            </span>
          </div>
        </div>

        <div
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#64748b",
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

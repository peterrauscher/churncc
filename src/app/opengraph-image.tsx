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
        backgroundColor: "#ffffff",
        padding: "54px 64px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* Top Header Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand Logo matching BrandLogo.tsx */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="14" width="8" height="22" rx="4" fill="#38b6ff" />
            <rect x="16" y="4" width="8" height="32" rx="4" fill="#0160c4" />
            <rect x="28" y="10" width="8" height="26" rx="4" fill="#00bf63" />
          </svg>
          <span
            style={{
              fontSize: "30px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0f172a",
            }}
          >
            Churnable
          </span>
        </div>

        {/* Editorial Category Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            color: "#0160c4",
            padding: "6px 18px",
            borderRadius: "9999px",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          <span>Independent & Merit-Ranked · 1,000+ Offers Tracked</span>
        </div>
      </div>

      {/* Headline & Subtitle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            color: "#0f172a",
            margin: 0,
          }}
        >
          Smart bonus decisions start with honest math.
        </h1>
        <p
          style={{
            fontSize: "19px",
            lineHeight: 1.45,
            color: "#64748b",
            margin: 0,
            maxWidth: "920px",
          }}
        >
          Compare the nation&apos;s highest credit card welcome bonuses and bank
          account promotions. 100% free with zero referral bias.
        </p>
      </div>

      {/* 2 Offer Preview Cards matching CreditCardItem & BankAccountItem design */}
      <div style={{ display: "flex", gap: "20px", marginTop: "4px" }}>
        {/* Card 1: Credit Card Item */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "20px 24px",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Chase · Travel Rewards
              </span>
              <span
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#0160c4",
                  border: "1px solid #bfdbfe",
                  borderRadius: "6px",
                  padding: "2px 8px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                Editor&apos;s Pick
              </span>
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.02em",
              }}
            >
              Sapphire Preferred Card
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              marginTop: "14px",
            }}
          >
            <span
              style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}
            >
              Welcome bonus payout
            </span>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "8px" }}
            >
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.03em",
                }}
              >
                75,000 pts
              </span>
              <span
                style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}
              >
                ≈ $750 est. value
              </span>
            </div>
            <span
              style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}
            >
              After $4,000 spend in 90 days · $95 annual fee
            </span>
          </div>
        </div>

        {/* Card 2: Bank Account Item */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "20px 24px",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Citibank · Checking Promo
              </span>
              <span
                style={{
                  backgroundColor: "#ecfdf5",
                  color: "#00875a",
                  border: "1px solid #a7f3d0",
                  borderRadius: "6px",
                  padding: "2px 8px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                Direct Deposit
              </span>
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.02em",
              }}
            >
              Citi Priority Checking
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              marginTop: "14px",
            }}
          >
            <span
              style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}
            >
              Cash deposit promo
            </span>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "8px" }}
            >
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "#00875a",
                  letterSpacing: "-0.03em",
                }}
              >
                +$700
              </span>
              <span
                style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}
              >
                cash payout
              </span>
            </div>
            <span
              style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}
            >
              Deposit $50,000 within 30 days · $30 monthly fee waivable
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching design system */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "18px",
          marginTop: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "28px",
            color: "#64748b",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00875a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>100% Free & Independent</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00875a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Zero Referral Bias</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00875a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Daily Verification</span>
          </div>
        </div>

        <div
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#0160c4",
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

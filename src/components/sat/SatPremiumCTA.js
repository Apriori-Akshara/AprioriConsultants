import Link from "next/link";

export default function SatPremiumCTA({
  testNumber,
}) {
  return (
    <div
      style={{
        marginTop: "14px",
        padding: "16px",
        borderRadius: "10px",
        border: "1px solid #e1e4e8",
      }}
    >
      <strong>
        Premium Test {testNumber}
      </strong>

      <p
        style={{
          margin: "8px 0 14px",
          fontSize: "14px",
        }}
      >
        Unlock SAT Premium to access Tests 3–10.
      </p>

      <Link
        href={`/SATMocks/purchase?test=${testNumber}`}
      >
        Unlock Premium
      </Link>
    </div>
  );
}

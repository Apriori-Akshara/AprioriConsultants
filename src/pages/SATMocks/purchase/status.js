import Link from "next/link";

export default function PurchaseStatusPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#f7f8fb",
      }}
    >
      <section
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid #e1e4e8",
        }}
      >
        <h1>Payment Status</h1>

        <p>
          Your payment status will appear here after the
          payment gateway confirms the transaction.
        </p>

        <Link href="/SATMocks">
          Return to Mock Tests
        </Link>
      </section>
    </main>
  );
}

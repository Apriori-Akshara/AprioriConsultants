import { useState } from "react";
import { getVerifiedSatServerAccessState } from "../../lib/sat/satAccess";
import Navbar from "../../../components/NavbarJS";

export async function getServerSideProps(context) {
  const accessState = await getVerifiedSatServerAccessState(context.req);
  if (!accessState.authenticated || accessState.user?.admin !== true) {
    return { redirect: { destination: "/Auth?returnTo=/Admin/SATAccess", permanent: false } };
  }
  return { props: {} };
}

export default function SATAccessAdmin() {
  const [identifier, setIdentifier] = useState("");
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookup() {
    setMessage("");
    setData(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/sat-unlock?identifier=${encodeURIComponent(identifier)}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Lookup failed");
      if (!result.user) {
        setMessage("No student account was found.");
      } else {
        setData(result);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function update(action) {
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/sat-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, action }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unlock update failed");
      setData(result);
      setMessage("Access settings updated.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  const unlock8to10 = data?.unlocks?.find((item) => item.entitlement_code === "SAT_INTERNAL_UNLOCK_8_10");
  const unlock11to20 = data?.unlocks?.find((item) => item.entitlement_code === "SAT_INTERNAL_UNLOCK_11_20");

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 80px" }}>
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".15em", color: "#456a9f" }}>APRIORI SAT CONTROL</span>
        <h1 style={{ fontSize: 42, margin: "10px 0 12px" }}>SAT / PSAT Internal Unlocks</h1>
        <p style={{ color: "#5d6c83", maxWidth: 760, lineHeight: 1.7 }}>Internal access only. Grant Tests 8–10 to a student when required. SAT Tests 11–20 can only be granted after the student has completed Tests 1–10 for both PSAT and SAT.</p>

        <section style={{ background: "#fff", border: "1px solid #dfe7f2", borderRadius: 18, padding: 24, marginTop: 28 }}>
          <label style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>Student email or Student ID</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="student@example.com or Student ID" style={{ flex: 1, minWidth: 320, padding: 13, border: "1px solid #cbd7e7", borderRadius: 10 }} />
            <button onClick={lookup} disabled={loading || !identifier.trim()} style={{ padding: "13px 18px", border: 0, borderRadius: 10, background: "#234d88", color: "#fff", fontWeight: 800, cursor: "pointer" }}>Look up student</button>
          </div>
          {message ? <p style={{ marginTop: 14, color: message === "Access settings updated." ? "#2d6a4f" : "#a33a3a" }}>{message}</p> : null}
        </section>

        {data?.user ? (
          <section style={{ background: "#fff", border: "1px solid #dfe7f2", borderRadius: 18, padding: 24, marginTop: 20 }}>
            <h2 style={{ marginTop: 0 }}>{data.user.name || data.user.email}</h2>
            <p style={{ color: "#5d6c83" }}>{data.user.email} · {data.user.user_id}</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginTop: 22 }}>
              <div style={{ border: "1px solid #e0e7f0", borderRadius: 14, padding: 18 }}>
                <h3>Tests 8–10</h3>
                <p>Status: <strong>{unlock8to10?.status === "active" ? "Unlocked" : "Locked"}</strong></p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => update("grant_8_10")} disabled={loading} style={{ padding: "10px 14px", border: 0, borderRadius: 9, background: "#234d88", color: "#fff", fontWeight: 800 }}>Grant 8–10</button>
                  <button onClick={() => update("revoke_8_10")} disabled={loading} style={{ padding: "10px 14px", border: "1px solid #cbd7e7", borderRadius: 9, background: "#fff", fontWeight: 700 }}>Revoke</button>
                </div>
              </div>

              <div style={{ border: "1px solid #e0e7f0", borderRadius: 14, padding: 18 }}>
                <h3>SAT Tests 11–20</h3>
                <p>Status: <strong>{unlock11to20?.status === "active" ? "Unlocked" : "Locked"}</strong></p>
                <p style={{ color: "#5d6c83", fontSize: 14 }}>Prerequisite: Tests 1–10 completed for both PSAT and SAT.</p>
                <button onClick={() => update("grant_11_20")} disabled={loading || !data.completedFirstTenForBoth} style={{ padding: "10px 14px", border: 0, borderRadius: 9, background: data.completedFirstTenForBoth ? "#234d88" : "#b8c3d1", color: "#fff", fontWeight: 800, cursor: data.completedFirstTenForBoth ? "pointer" : "not-allowed" }}>Grant SAT 11–20</button>{" "}
                <button onClick={() => update("revoke_11_20")} disabled={loading} style={{ padding: "10px 14px", border: "1px solid #cbd7e7", borderRadius: 9, background: "#fff", fontWeight: 700 }}>Revoke</button>
              </div>
            </div>

            <div style={{ marginTop: 22, padding: 16, background: "#f7faff", borderRadius: 12 }}>
              <strong>Completion prerequisite:</strong> {data.completedFirstTenForBoth ? "Met" : "Not met"}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}

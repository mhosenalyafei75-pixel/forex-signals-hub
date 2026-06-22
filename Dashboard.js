import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [signals, setSignals] = useState([]);

  const loadSignals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/signals");
      setSignals(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSignals();

    const interval = setInterval(() => {
      loadSignals();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: "#0d0d0d",
      minHeight: "100vh",
      color: "#fff",
      padding: 20
    }}>
      <h1>📊 Forex Signals</h1>

      {signals.length === 0 ? (
        <p>لا توجد إشارات الآن...</p>
      ) : (
        signals.map((s) => (
          <div key={s._id} style={{
            background: "#1a1a1a",
            margin: 10,
            padding: 15,
            borderRadius: 10,
            borderLeft: s.type === "BUY" ? "5px solid green" : "5px solid red"
          }}>
            <h2>{s.pair} - {s.type}</h2>
            <p>Entry: {s.entry}</p>
            <p>TP: {s.tp}</p>
            <p>SL: {s.sl}</p>
          </div>
        ))
      )}
    </div>
  );
}
import { useState } from "react";

export default function LandPricePredictor() {
  const [landArea, setLandArea] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setError(null);
    setPredictedPrice(null);

    const landAreaFloat = parseFloat(landArea);
    if (isNaN(landAreaFloat) || landAreaFloat <= 0) {
      setError("Please enter a valid positive number");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ land_area: landAreaFloat }),
      });

      const data = await response.json();

      if (response.ok) {
        setPredictedPrice(data.predicted_price); // set raw backend float
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
      <h2>Land Price Predictor</h2>
      <input
        type="number"
        step="any"
        placeholder="Enter land area"
        value={landArea}
        onChange={(e) => setLandArea(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={handlePredict} style={{ padding: "0.5rem 1rem" }}>
        Predict Price
      </button>

      {predictedPrice !== null && (
        <p style={{ color: "green", marginTop: "1rem" }}>
          Predicted Price: ${predictedPrice}
        </p>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Error: {error}
        </p>
      )}
    </div>
  );
}


import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LandPricePredictor() {
  const [landArea, setLandArea] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setError(null);
    setPredictedPrice(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ land_area: parseFloat(landArea) }),
      });
      const data = await response.json();
      if (response.ok) {
        setPredictedPrice(data.predicted_price);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <Card className="p-6 w-96">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Land Price Predictor</h2>
          <Input
            type="number"
            placeholder="Enter land area"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
          />
          <Button className="mt-4 w-full" onClick={handlePredict}>
            Predict Price
          </Button>
          {predictedPrice !== null && (
            <p className="mt-4 text-green-600">Predicted Price: ${predictedPrice}</p>
          )}
          {error && <p className="mt-4 text-red-600">Error: {error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
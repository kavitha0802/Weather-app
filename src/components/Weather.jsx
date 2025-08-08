import axios from "axios";
import { useState } from "react";

const Weather = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=78d779dff06e30763f774d231002b6cd&units=metric`
      );
      setData(res.data);
      setError("");
    } catch (err) {
      setError("City not found!");
      setData(null);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl text-blue-500 font-bold mb-4 text-center"> Weather App</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter city"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {data && (
          <div className="bg-blue-100 p-4 rounded space-y-2">
            <p>
              📍 <strong>Location:</strong> {data.name}, {data.sys.country}
            </p>
            <p>
              🌡️ <strong>Temp:</strong> {data.main.temp} °C
            </p>
            <p>
              💧 <strong>Humidity:</strong> {data.main.humidity}%
            </p>
            <p>
              🌥️ <strong>Weather:</strong> {data.weather[0].description}
            </p>
            <p>
              💨 <strong>Wind:</strong> {data.wind.speed} m/s
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
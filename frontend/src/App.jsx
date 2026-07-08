import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AqiChart from './components/AqiChart';
import './index.css';

const VN_STATIONS = [
  { id: 'hcm', name: 'Thành phố Hồ Chí Minh (Lãnh sự quán Mỹ)', lat: 10.78, lon: 106.70 },
  { id: 'hn', name: 'Hà Nội (Đại sứ quán Mỹ)', lat: 21.02, lon: 105.81 },
  { id: 'dn', name: 'Đà Nẵng', lat: 16.05, lon: 108.20 },
  { id: 'hp', name: 'Hải Phòng', lat: 20.84, lon: 106.68 },
  { id: 'ct', name: 'Cần Thơ', lat: 10.04, lon: 105.77 },
  { id: 'dl', name: 'Đà Lạt', lat: 11.94, lon: 108.44 },
  { id: 'nt', name: 'Nha Trang', lat: 12.23, lon: 109.19 }
];

function App() {
  const [aqiData, setAqiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStationId, setSelectedStationId] = useState('hcm');
  
  // Calculate current stats based on the latest data point
  // The data contains (Hiện tại) for the current hour
  const currentData = aqiData.find(item => item.time.includes('(Hiện tại)')) || (aqiData.length > 0 ? aqiData[0] : null);
  const currentStation = VN_STATIONS.find(s => s.id === selectedStationId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch hourly real data from Flask API
        const response = await axios.get(`http://localhost:5000/api/aqi?lat=${currentStation.lat}&lon=${currentStation.lon}`);
        setAqiData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching AQI data:", err);
        setError("Failed to connect to the backend server or fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (currentStation) {
      fetchData();
    }
    
    // Auto refresh every 5 minutes to keep it up to date
    const intervalId = setInterval(() => {
      if (currentStation) fetchData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [selectedStationId, currentStation]);

  const handleStationChange = (e) => {
    setSelectedStationId(e.target.value);
  };

  const getAqiStatus = (aqi) => {
    if (aqi <= 50) return { label: 'Tốt (Good)', color: 'var(--aqi-good)' };
    if (aqi <= 100) return { label: 'Trung bình (Moderate)', color: 'var(--aqi-moderate)' };
    if (aqi <= 150) return { label: 'Kém (Unhealthy for Sensitive Groups)', color: 'var(--aqi-unhealthy-sensitive)' };
    if (aqi <= 200) return { label: 'Xấu (Unhealthy)', color: 'var(--aqi-unhealthy)' };
    if (aqi <= 300) return { label: 'Rất xấu (Very Unhealthy)', color: 'var(--aqi-very-unhealthy)' };
    return { label: 'Nguy hại (Hazardous)', color: 'var(--aqi-hazardous)' };
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Air Quality Dashboard</h1>
        <p>Giám sát chất lượng không khí theo giờ</p>
        
        <div className="search-form">
          <select 
            className="search-input" 
            value={selectedStationId} 
            onChange={handleStationChange}
            style={{ cursor: 'pointer', appearance: 'auto' }}
          >
            {VN_STATIONS.map(station => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass-panel">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Đang tải dữ liệu cho {currentStation?.name}...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <h3>Lỗi kết nối</h3>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <AqiChart data={aqiData} />
            
            {currentData && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-title">AQI Hiện tại</div>
                  <div 
                    className="stat-value" 
                    style={{ color: getAqiStatus(currentData.aqi).color }}
                  >
                    {currentData.aqi}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    {getAqiStatus(currentData.aqi).label}
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-title">PM2.5</div>
                  <div className="stat-value">{currentData.pm25} <span style={{fontSize: '1rem', color: '#64748b'}}>µg/m³</span></div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-title">PM10</div>
                  <div className="stat-value">{currentData.pm10} <span style={{fontSize: '1rem', color: '#64748b'}}>µg/m³</span></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

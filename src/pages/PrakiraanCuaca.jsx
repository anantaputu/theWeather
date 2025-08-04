import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import '../App.css';

const getDayName = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-ID', options);
  }
};

const initialLocations = [
    { name: "Cakranegara Selatan, Mataram", adm4: "52.71.03.1004" },
    { name: "Cakranegara Barat, Mataram", adm4: "52.71.03.1005" },
    { name: "Cakranegara Timur, Mataram", adm4: "52.71.03.1006" },
    { name: "Cakranegara Utara, Mataram", adm4: "52.71.03.1007" },
    { name: "Sayang-Sayang, Mataram", adm4: "52.71.03.1009" },
    { name: "Cakranegara Selatan Baru, Mataram", adm4: "52.71.03.1010" },
    { name: "Sapta Marga, Mataram", adm4: "52.71.03.1011" },
    { name: "Cilinaya, Mataram", adm4: "52.71.03.1012" },
    { name: "Mayura, Mataram", adm4: "52.71.03.1013" },
    { name: "Karang Taliwang, Mataram", adm4: "52.71.03.1014" }
];

function PrakiraanCuaca() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedLocation, setSelectedLocation] = useState(initialLocations[2]);

  useEffect(() => {
    const apiUrl = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${selectedLocation.adm4}`;
    
    setLoading(true);

    const fetchAllData = async () => {
      try {
        const responseBMKG = await fetch(apiUrl);
        if (!responseBMKG.ok) {
          throw new Error(`HTTP error! status: ${responseBMKG.status} - ${responseBMKG.statusText}`);
        }
        const dataBMKG = await responseBMKG.json();
        
        if (dataBMKG && dataBMKG.lokasi && dataBMKG.data && dataBMKG.data[0] && dataBMKG.data[0].cuaca) {
          setWeatherData(dataBMKG);
        } else {
          setWeatherData(dataBMKG);
          throw new Error("Struktur data BMKG tidak sesuai yang diharapkan atau kosong.");
        }
      } catch (e) {
        console.error("Gagal mengambil data:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [selectedLocation]);

  if (loading) {
    return (
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="ms-3">Memuat data cuaca...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          <h4>Error: {error}</h4>
        </div>
      </div>
    );
  }

  if (!weatherData || !weatherData.lokasi || !weatherData.data || !weatherData.data[0] || !weatherData.data[0].cuaca) {
    return (
      <div className="container my-5 alert alert-info">
        Tidak ada data cuaca yang tersedia atau struktur data tidak valid.
      </div>
    );
  }

  const { lokasi, data: cuacaDataArray } = weatherData;

  const currentDayForecasts = cuacaDataArray[0].cuaca[0];
  const currentForecast = currentDayForecasts ? currentDayForecasts[0] : null;

  const tomorrowForecastsData = cuacaDataArray[0].cuaca[1] ? cuacaDataArray[0].cuaca[1][0] : null;

  const futureDailyForecasts = cuacaDataArray[0].cuaca.slice(0, 3);

  if (!currentForecast) {
    return (
      <div className="container my-5 alert alert-warning">
        Tidak ada data prakiraan cuaca jam-jaman untuk ditampilkan.
      </div>
    );
  }

  return (
    <div className="main-dashboard-layout d-flex">
      <div className="flex-grow-1 p-4">
        <Navbar 
            locations={initialLocations}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
        />
        <div className="row g-4">
          <div className="col-lg-6 col-md-12">
            <div className="custom-card card-main-weather h-100">
              <h5 className="mb-1 fw-normal">Weather</h5>
              <p className="small-text-muted mb-3">What's the weather</p>
              <div className="d-flex align-items-end mb-3 position-relative" style={{ zIndex: 1 }}>
                <span className="display-temp me-2">{currentForecast.t}°C</span>
                <span className="fs-5 fw-bold">{currentForecast.weather_desc}</span>
              </div>
              {currentForecast.image && (
                <img
                  src={currentForecast.image.replace(/ /g, "%20")}
                  alt={currentForecast.weather_desc}
                  className="weather-icon-large"
                />
              )}
              <div className="row mt-5 position-relative" style={{ zIndex: 1 }}>
                <div className="col-4 detail-item">
                  <small className="small-text-muted d-block">Pressure</small>
                  <strong className="fs-6">{currentForecast.tcc || 'N/A'}hPa</strong>
                </div>
                <div className="col-4 detail-item">
                  <small className="small-text-muted d-block">Visibility</small>
                  <strong className="fs-6">{currentForecast.vs_text || 'N/A'}</strong>
                </div>
                <div className="col-4 detail-item">
                  <small className="small-text-muted d-block">Humidity</small>
                  <strong className="fs-6">{currentForecast.hu || 'N/A'}%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="custom-card h-100">
              <h3 className="mb-4 fw-normal">How's the temperature today?</h3>
              <div className="d-flex flex-nowrap overflow-auto py-2">
                {currentDayForecasts.map((forecast, idx) => {
                  const hour = new Date(forecast.local_datetime).getHours();
                  const ampm = hour >= 12 ? 'PM' : 'AM';
                  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

                  return (
                    <div key={idx} className="d-flex flex-column align-items-center text-center me-4" style={{ minWidth: '90px' }}>
                      <p className="mb-1 small-text-muted">{formattedHour}:00 {ampm}</p>
                      {forecast.image && (
                        <img src={forecast.image.replace(/ /g, "%20")} alt={forecast.weather_desc} style={{ width: '50px', height: '50px' }} className="mb-2" />
                      )}
                      <p className="fw-bold mb-0 fs-5">{forecast.t}°</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            {tomorrowForecastsData ? (
              <div className="custom-card card-tomorrow-forecast h-100 d-flex flex-column justify-content-center align-items-center">
                <h3 className="mb-3 fw-normal">Tomorrow</h3>
                <p className="mb-2 small-text-muted">{lokasi.desa}</p>
                <h2 className="display-temp mb-2">{tomorrowForecastsData.t}°C</h2>
                <p className="fs-5 text-muted">{tomorrowForecastsData.weather_desc}</p>
              </div>
            ) : (
              <div className="custom-card alert alert-info text-center h-100 d-flex align-items-center justify-content-center">Prakiraan Besok Tidak Tersedia</div>
            )}
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="custom-card d-flex flex-column justify-content-between">
              <h3 className="mb-3 fw-normal">Weather Prediction</h3>
              <ul className="list-unstyled flex-grow-1">
                {futureDailyForecasts.map((dailyForecast, idx) => {
                  if (dailyForecast && Array.isArray(dailyForecast) && dailyForecast[0]) {
                    const date = new Date(dailyForecast[0].local_datetime);
                    const options = { month: 'long', day: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    const dayName = getDayName(dailyForecast[0].local_datetime);

                    const minTemp = dailyForecast.reduce((min, curr) => Math.min(min, curr.t), Infinity);
                    const maxTemp = dailyForecast.reduce((max, curr) => Math.max(max, curr.t), -Infinity);

                    return (
                      <li key={idx} className="d-flex align-items-center py-2 list-group-item-custom">
                        {dailyForecast[0].image && (
                          <img src={dailyForecast[0].image.replace(/ /g, "%20")} alt={dailyForecast[0].weather_desc} style={{ width: '30px', height: '30px', marginRight: '15px' }} />
                        )}
                        <div className="flex-grow-1">
                          <small className="d-block text-muted">{dayName}</small>
                          <strong className="d-block">{dailyForecast[0].weather_desc}</strong>
                        </div>
                        <span className="fw-bold">{maxTemp}° / {minTemp}°</span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrakiraanCuaca;

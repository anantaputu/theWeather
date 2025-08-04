import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ locations, selectedLocation, onLocationChange }) => {
    return (
        <header className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
                <Link
                  to="/"
                  style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}
                >
                  MataramWeather
                </Link>
            </div>
            
            <div className="d-flex align-items-center">
                <label htmlFor="location-select" className="form-label mb-0 me-2 visually-hidden">Pilih Lokasi:</label>
                <select 
                    id="location-select"
                    className="form-select search-input-custom" 
                    aria-label="Pilih lokasi"
                    value={selectedLocation.adm4}
                    onChange={(e) => {
                        const newLocation = locations.find(loc => loc.adm4 === e.target.value);
                        if (newLocation) {
                            onLocationChange(newLocation);
                        }
                    }}
                >
                    {locations.map((loc) => (
                        <option key={loc.adm4} value={loc.adm4} className="selected-loc">
                            {loc.name}
                        </option>
                    ))}
                </select>
            </div>

          <div className="d-flex align-items-center">
            <Link
              to="/"
              className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '45px', height: '45px' }}
            >
              <i className="bi bi-x-circle fs-5 text-muted"></i>
            </Link>
          </div>

        </header>
    );
};

export default Navbar;

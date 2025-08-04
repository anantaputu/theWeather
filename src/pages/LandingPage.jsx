import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const LandingPage = () => {
    return (
        <div className="landing-page-container d-flex flex-column justify-content-center align-items-center vh-100 p-4" style={{ backgroundColor: '#f0f2f5' }}>
            <div className="container">
                <div className="row justify-content-center align-items-center g-5">
                    <div className="col-lg-6 col-md-8 col-sm-10 d-none d-lg-block">
                        <div className="custom-card p-5 text-center shadow-lg animate__animated animate__fadeInLeft" style={{ backgroundColor: '#e0f2f7' }}>
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <img
                                    src="./bmkg.png"
                                    alt="Logo BMKG"
                                    className="img-fluid"
                                    style={{ width: '120px' }}
                                />
                            </div>
                            <p className="text-muted small">Support data by BMKG</p>
                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <span className="badge bg-primary rounded-pill px-3 py-2 me-2">Mataram</span>
                                <span className="badge bg-warning text-dark rounded-pill px-3 py-2">BMKG Data</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12 text-lg-start text-center animate__animated animate__fadeInRight">
                        <h1 className="display-4 fw-bold mb-3 text-dark">MataramWeather</h1>
                        <p className="lead mb-4 text-secondary">
                            Prakiraan cuaca akurat dan terperinci untuk wilayah Mataram dan sekitarnya.
                            <br />
                            Selalu siap menghadapi setiap hari dengan informasi cuaca terkini yang mudah diakses.
                        </p>
                        <Link
                          to="/weather"
                          className="btn btn-custom-orange btn-lg shadow-sm"
                        >
                          Lihat Prakiraan Cuaca
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../static/css/navbar.css';
import logo from '../static/util/ABC Limited Logo.png';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);

    const [time, setTime] = useState(new Date());
    const [weatherData, setWeatherData] = useState({
        location: "Locating...",
        temperature: "--",
        loading: true
    });

    const [active, setActive] = useState('nav-menu');
    const [toggleIcon, setToggleIcon] = useState('nav-toggler');

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };
        checkUser();
    }, [location]);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchWeather = async (lat, lon) => {
            try {
                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
                const weatherResponse = await fetch(weatherUrl);
                const weatherJson = await weatherResponse.json();
                const temp = Math.round(weatherJson.current_weather.temperature);

                const locationUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
                const locationResponse = await fetch(locationUrl);
                const locationJson = await locationResponse.json();

                const city = locationJson.city || locationJson.locality || "Unknown Location";
                const country = locationJson.countryCode || "";

                setWeatherData({
                    location: `${city}, ${country}`,
                    temperature: `${temp}°C`,
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching weather:", error);
                setWeatherData({ location: "Weather Unavailable", temperature: "", loading: false });
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
                () => fetchWeather(51.5074, -0.1278) // Fallback London
            );
        } else {
            fetchWeather(51.5074, -0.1278);
        }
    }, [user]);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    const navToggle = () => {
        active === 'nav-menu' ? setActive('nav-menu nav-active') : setActive('nav-menu');
        toggleIcon === 'nav-toggler' ? setToggleIcon('nav-toggler toggle') : setToggleIcon('nav-toggler');
    }

    if (user) {
        return (
            <nav className="nav">
                <div className="nav-left">
                    <div className="logo-container">
                        <a href={'/'} className="nav-brand">ABC Limited</a>
                    </div>
                </div>

                <div className="nav-right">
                    <div className="weather-widget">
                        <span className="weather-icon">
                            {weatherData.loading ? "..." : "⛅"}
                        </span>
                        <span>
                            {weatherData.loading
                                ? "Loading..."
                                : `${weatherData.location} | ${weatherData.temperature} | ${formatTime(time)}`
                            }
                        </span>
                    </div>

                    <div className="myarea-container">
                        <button className="myarea-btn">
                            MyArea ▼
                        </button>
                    </div>

                    <div className="nav-toggler">
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="nav">
            <a href={'/'} className="nav-brand">ABC Limited</a>
            <ul className={active}>
                <li className="nav-item">
                    <Link to="/admin-login" className="nav-link">Admin/Help Desk Login</Link>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">Call us: +44 1234 567890</a>
                </li>
            </ul>
            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
}

export default Navbar;
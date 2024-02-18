import './style.css';
import React, { useState, useEffect } from 'react';




function Card() {
    const apiKey = "enter api key here"
    const URL = "https://api.openweathermap.org/data/2.5/weather?&units=metric"

    const [weatherData, setWeatherData] = useState({})
    const [searchVal, setSearchVal] = useState("")
    const [errorMsg, setErrorMsg] = useState('')



    useEffect(() => {
        getWeather("delhi")
    }, [])


    const getWeather = async (cityName) => {

        try {
            const response = await fetch(`${URL}&appid=${apiKey}&q=${cityName}`)
            if (response.status === 404) {
                alert("Oops! city not found")
                getWeather("delhi")
            }
            else {
                const data = await response.json();
                setWeatherData(data)
            }
        } catch (error) {
            setErrorMsg("An error occurred while fetching weather data.")
            setWeatherData({})
        }
    }


    let content;
    switch (weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main) {
        case 'Clear':
            content = <img src="images/clear.png" alt='weather icon' />;
            break;
        case 'Clouds':
            content = <img src="images/clouds.png" alt='weather icon' />;
            break;
        case 'Drizzle':
            content = <img src="images/drizzle.png" alt='weather icon' />;
            break
        case 'Mist':
            content = <img src="images/mist.png" alt='weather icon' />;
            break;
        case 'Rain':
            content = <img src="images/rain.png" alt='weather icon' />;
            break;
        case 'Snow':
            content = <img src="images/snow.png" alt='weather icon' />;
            break;
        case 'Smoke':
            content = <img src="images/smoke.png" alt='weather icon' />;
            break;

        default:
            content = <img src="images/clear.png" alt='weather icon' />;
            break;
    }



    let d = new Date()

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = days[d.getDay()]
    let dt = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()





    return (
        <>
            <div className="card">

                <div className="card-one">
                    <div className="card-one-fst-box">
                        <h2>{weatherData.name}</h2>
                        <p>{weatherData.sys?.country}</p>
                    </div>
                    <div className="card-one-snd-box">
                        <div className="card-one-dt">
                            <p className='day'>{day}</p>
                            <p className='dt'>{dt + " " + month + " " + year}</p>
                        </div>
                        <div className="card-one-temp">
                            <h2>{Math.round(weatherData.main?.temp)}°C</h2>
                        </div>
                    </div>
                </div>

                <div className="card-two">
                    <div className="img-box">
                        {/* <img src="images/clear.png" alt='weather icon' /> */}
                        {content}
                    </div>
                    {/* Check if weatherData exists and has a weather array with at least one element */}
                    {weatherData && weatherData.weather && weatherData.weather[0] && (
                        <h1>{weatherData.weather[0].main}</h1>)}
                    <hr className='first-hr' />
                    <div className="search">
                        <input type="text" placeholder='Enter city' value={searchVal} onChange={(evt) => setSearchVal(evt.target.value)} />
                        <button onClick={() => getWeather(searchVal)} ><i className="fa-solid fa-magnifying-glass" style={{ color: `#fff` }}></i></button>
                    </div>
                    {errorMsg && <p className='error'>{errorMsg}</p>}
                    <h3>{weatherData.name}, {weatherData.sys?.country}</h3>
                    <hr className="hr-gr" />
                    <div className="card-two-temp">
                        <p>Temperature</p>
                        <p>{Math.round(weatherData.main?.temp)}°C</p>
                    </div>
                    <hr className="hr-gr" />
                    <div className="card-two-humidity">
                        <p>Humidity</p>
                        <p>{weatherData.main?.humidity}%</p>
                    </div>
                    <hr className="hr-gr" />
                    <div className="card-two-wind">
                        <p>Wind Speed</p>
                        <p>{Math.round(weatherData.wind?.speed)} km/h</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Card;
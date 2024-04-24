import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [joke, setJoke] = useState('');

  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4a18bdbbfae7e94ef6b80d79dca4e307`;
  const jokeUrl = 'https://api.api-ninjas.com/v1/dadjokes';

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = () => {
    axios.get(jokeUrl, {
      headers: {
        'X-Api-Key': 'ed6FSNRYQsVGppii78/IOw==NOiWN9smqYqJfRrM'
      }
    }).then(response => {
      setJoke(response.data[0].joke);
    }).catch(error => {
      console.error('Error fetching joke:', error);
    });
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url1).then((response) => {
        setData(response.data);
      }).catch(error => {
        console.error('Error fetching weather data:', error);
      });
      setLocation('');
    }
  };

  const getBackgroundImage = () => {
    if (data.main && data.main.temp) {
      const temp = data.main.temp;
      if (temp < 50) {
        return 'url("./coldday.jpeg")';
      } else if (temp >= 50 && temp < 78) {
        return 'url("./fallday.jpeg")';
      } else {
        return 'url("./sunrise.jpeg")';
      }
    }
    return 'url("./defaultweather.jpeg")';
  };

  return (
    <div className="app" style={{ backgroundImage: getBackgroundImage() }}>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter City Location'
          type="text"
        />
      </div>
      {location || Object.keys(data).length > 0 && (
        <div className="container">
          <div className="top">
            <div className="location">
            <h1> <p>{data.name}</p> </h1> 
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <h2>{data.weather[0].main}</h2> : null}
            </div>
          </div>

          {data.name && (
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
          </div>
          )}
          <div className="joke">
            <h3>Joke of the Day:</h3>
            <p>{joke}</p>
          </div>
        
      
    </div>
  );
}

export default App;

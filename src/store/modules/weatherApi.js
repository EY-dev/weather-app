import {weather_url, appid, weather_type} from "@/plugins/weatherSettings";
import axios from "axios";

export default{
    state: {
        city : (localStorage.getItem("city"))? localStorage.getItem("city") : 'Moscow',
        weather: {
            main : {
                temp : 0,
                pressure : 0,
                humidity : 0,
            },
            wind : {
                speed: 0,
                deg : 0
            },
            rain : {
              '1h' : 0
            },
            weather : [{
                    description: "небольшая облачность",
                    icon: "02d",
                    main: "Clouds",
                }]
        },
        url : (localStorage.getItem("url"))? localStorage.getItem("url") : weather_url + weather_type.weather  + `?lat=55.7558&lon=37.6173&units=metric&lang=ru&appid=${appid}`,
        coordinates : {
            lat : 55.7558,
            lon : 37.6173
        },
    },
    mutations: {
        SET_COORDINATES: (state, value) => {
            state.coordinates.lat = value.latitude
            state.coordinates.lon = value.longitude
            state.coordinates.accuracy = value.accuracy
        },
        SET_WEATHER: (state, value) => {
            state.weather = value
        },
        SET_CITY: (state, value) => {
            state.city = value
            localStorage.setItem("city", value)
        },
        SET_URL: (state, value) => {
            state.url = value;
            localStorage.setItem("url", value)
        }
    },
    actions: {
        getWeatherByCurrentLocation: (state) => {
            if (navigator.geolocation) {
                new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
                    .then((position) => {
                        if (position.coords)
                            state.commit('SET_COORDINATES', position.coords);
                        else
                            console.log('Geolocation is not supported by this browser.');
                    })
                    .catch(
                        error => {
                            let msg = null;
                            switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    msg = "User denied the request for Geolocation.";
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    msg = "Location information is unavailable.";
                                    break;
                                case error.TIMEOUT:
                                    msg = "The request to get user location timed out.";
                                    break;
                                case error.UNKNOWN_ERROR:
                                    msg = "An unknown error occurred.";
                                    break;
                            }
                            console.log(msg);
                        })
                    .finally(()=>{
                        const unit = (state.rootState.module1.unit === 'C') ? 'metric' : 'imperial';
                        const url = weather_url + weather_type.weather  + `?lat=${state.state.coordinates.lat}&lon=${state.state.coordinates.lon}&units=${unit}&lang=ru&appid=${appid}`;
                        state.dispatch('getRequest', url);
                    })
            }
        },
        getWeatherByCity: (state, city) => {
            const unit = (state.rootState.module1.unit === 'C') ? 'metric' : 'imperial';
            const url = weather_url + weather_type.weather  + `?q=${city}&units=${unit}&lang=ru&appid=${appid}`;
            state.dispatch('getRequest', url);
        },
        getWeather: (state) => {
            state.dispatch('getRequest', state.state.url);
        },
        getRequest : (state, url) => {
            axios.get(url).then(resp => {
                state.commit('SET_WEATHER', resp.data);
                state.dispatch('setCity', resp.data.name);
                state.dispatch('setURL', url);
            }).catch(error => {console.log(error.response.data.message)});
        },
        runSchedule : (state, time) => {
            if (time > 0) {
                state.dispatch('getWeather', state.state.url);
                const pr = new Promise((resolve) => {
                    setTimeout(() => {resolve()}, time);
                });
                pr.then(() => {state.dispatch('runSchedule', time);})
            }
        },

        setCity : (state, value) => {
            state.commit('SET_CITY', value);
        },
        setURL : (state, value) => {
            state.commit('SET_URL', value);
        },
    },
    getters:{
        getWeather: state => {
            return state.weather;
        },
        getCity: state => {
            return state.city;
        },
    }
}

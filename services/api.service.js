import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const URL = 'http://api.openweathermap.org';

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '🌞';
        case '02':
            return '🌤';
        case '03':
            return '🌥';
        case '04':
            return '🌥';
        case '09':
            return '🌧';
        case '10':
            return '🌦';
        case '11':
            return '🌩';
        case '13':
            return '🌨';
        case '50':
            return '🌫';

    }
}

const getGeoDataByCity = async (city, token) => {
    try {
        const { data } = await axios.get(`${URL}/geo/1.0/direct`, {
            params: {
                q: city,
                appid: token
            }
        })

        if (!data.length) {
            throw new Error('Неверно указан город');
        }

        return data[0];
    } catch (e) {
        if (e?.response?.data?.cod == 401) {
            throw new Error('Неверно указан токен');
        }

        throw new Error(e.message);
    }
}

const getWeather = async (city) => {
    const token = await getKeyValue(process.env.TOKEN ?? TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    }

    try {
        const { lat, lon } = await getGeoDataByCity(city, token);

        const { data } = await axios.get(`${URL}/data/2.5/weather`, {
            params: {
                lat,
                lon,
                appid: token,
                lang: 'ru',
                units: 'metric'
            }
        })

        return data;
    } catch(e) {
        throw new Error(e.message);
    }
};

export { getWeather, getIcon }

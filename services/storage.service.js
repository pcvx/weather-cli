import { homedir } from 'os';
import { join } from 'path';
import { promises }  from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
};

const checkFileExistence = async (filePath) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        return JSON.parse(file);
    }

    return undefined;
}

const saveKeyValue = async (key, value) => {
    const data = await checkFileExistence(filePath);
    data[key] = value
    await promises.writeFile(filePath, JSON.stringify(data))
};

const getKeyValue = async (key) => {
    const data = await checkFileExistence(filePath);

    return data[key];
}

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }
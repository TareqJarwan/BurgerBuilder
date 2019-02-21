import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burger-builder-1f99c.firebaseio.com/'
});

export default instance;
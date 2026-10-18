import axios from 'axios';

const client = axios.create({
    baseURL: 'https://1mkmi7steb.execute-api.us-east-1.amazonaws.com/apiv1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default client;
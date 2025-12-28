const express = require('express');
const axios = require('axios').default
const client = require('./client');

const app = express();

app.get('/', async (req, res) => {
    try {
        const cache = await client.get('todos');
        if (cache) {
            console.log('Serving from cache');
            return res.json(JSON.parse(cache));
        } 

        const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
        await client.set('todos', JSON.stringify(data), 'EX', 60); // Cache for 60 seconds
        return res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data from JSONPlaceholder API');
    }
});

app.listen(9000, () => {    
    console.log('Server is running on http://localhost:3000');
});
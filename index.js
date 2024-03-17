require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')

app.use(cors({
    origin: '*'
}))


app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/trackPackage/:id', async (req, res) => {
    const { id } = req.params
    const options = {
        method: 'POST',
        url: 'https://api.17track.net/track/v2.2/gettrackinfo',
        headers: {
            'content-type': 'application/json',
            '17token': process.env.API_KEY
        },
        data: `[{"number":"${id}"}]`
    };
    const Registeroptions = {
        method: 'POST',
        url: 'https://api.17track.net/track/v2.2/register',
        headers: {
            'content-type': 'application/json',
            '17token': process.env.API_KEY
        },
        data: `[{"number":"${id}"}]`
    };
    try {
        const addNumberResponse = await axios(Registeroptions);

        const response = await axios.request(options);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(400).send(error);
    }
}
)


app.listen(process.env.PORT, () => {
    console.log('server is listening on PORT 5001')
})
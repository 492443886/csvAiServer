import express from 'express';
import cors from 'cors'
import { askAi, load } from './ai.js'

const app = express();
app.use(cors())
// Middleware to parse JSON data
app.use(express.json());

await load()


// POST /tasks - Create a new task
app.post('/tasks', async (req, res) => {

    try {
        console.log(req.body)
        let result = await askAi(req.body.question, req.prompt)
        console.log(result)
        res.status(201).json(result.text);

    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }

});

app.get('/t', async (req, res) => {

    res.status(500).json("Works");
});


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
import express from 'express';
import cors from 'cors'
import { askAi } from './ai.js'

const app = express();
app.use(cors())
// Middleware to parse JSON data
app.use(express.json());


// POST /tasks - Create a new task
app.post('/tasks', async (req, res) => {

    try {
        console.log(req.body)
        let result = await askAi(req.body.question)
        console.log(result)
        res.status(201).json(result.text);

    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }

});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
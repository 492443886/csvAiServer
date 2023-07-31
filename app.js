import express from 'express';
import cors from 'cors'
import { askAi, load } from './ai.js'
import { search } from './ai2.js'
import fs from 'fs'
import https from 'https'

const app = express();
app.use(cors())
// Middleware to parse JSON data
app.use(express.json());

await load()


const url = "/csv"

app.post( url + "/vod", async (req, res) => {
    try {
      console.log(req.body)
      let result = await search(req.body.question)
      console.log(result)
      res.status(200).json({ result: result })
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  })

// POST /tasks - Create a new task
app.post(url + '/tasks', async (req, res) => {

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

app.get(url + '/t', async (req, res) => {

    res.status(500).json("Works");
});


// Start the server
const port = 3050;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//ssh


// const cert = fs.readFileSync("certificate.crt")
// const key = fs.readFileSync("private.key")

// const cred = { key, cert }

// const httpsServer = https.createServer(cred, app)
// httpsServer.listen(8443)
// import express from 'express';
// import fs from 'fs'
// import https from 'https'

// const cert = fs.readFileSync("certificate.crt")
// const key = fs.readFileSync("private.key")

// const cred = { key, cert }
// const app = express();

// app.get('/t', (req, res) => {
//     res.send('Hello@!!');
// });


// // My ssl verify
// // app.get('/.well-known/pki-validation/E2AE2615BE4252688ECB637043D69A02.txt', (req, res) => {
// //     res.sendFile('/home/ec2-user/Hello/E2AE2615BE4252688ECB637043D69A02.txt')
// // })

// let port = 3000
// app.listen(port, () => {
//     console.log('Server is running on port ' + port);
// });

// const httpsServer = https.createServer(cred, app)
// httpsServer.listen(8443)
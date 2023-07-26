import { config } from "dotenv";
import express from "express";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import readline from "readline"

config()

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

// const userInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// userInterface.prompt()
// userInterface.on("line", async input => {
//     const res = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: input}]
//     })
//     console.log(res.data.choices[0].message.content)
//     userInterface.prompt()
// })

const message = "hi";

app.post("/chat", async (req, res) => {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message}]
    })
    res.send(response.data.choices[0].message.content)
})
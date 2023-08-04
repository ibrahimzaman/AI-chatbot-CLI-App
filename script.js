import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.API_KEY
    }))

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

userInterface.prompt();
userInterface.on("line", async input => {
    try {
        const result = await openai
            .createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: input }]
            });
        console.log(`\n${result.data.choices[0].message.content}\n`);
        userInterface.prompt();
    } catch (error) {
        console.log(`something went wrong`);
    }
});
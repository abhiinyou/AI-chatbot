import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();
console.log(process.env.OPENAI_API_KEY2);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "server running on port 9000.",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      max_tokens: 3000,
    });

    console.log(completion.choices[0].text);

    res.status(200).send({
      bot: completion.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(9000, () =>
  console.log("AI server started on http://localhost:9000")
);

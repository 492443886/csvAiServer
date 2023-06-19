/*
    This is the best ai to process csv file by 6/16/2023.

*/


import { ChatOpenAI } from "langchain/chat_models/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { SystemChatMessage } from "langchain/schema";
import { HumanChatMessage } from "langchain/schema";


const OPENAI_API_KEY = "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"
let model
let vectorStore

export let load = async () => {
    model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.2 });
    const loader = new CSVLoader("ob2.csv");
    const docs2 = await loader.load();
    const embed = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
    vectorStore = await HNSWLib.fromDocuments(docs2, embed);
    console.log(docs2[0])
}

export let askAi = async (question, prompt) => {

    const result = await vectorStore.similaritySearch(question, 20);
    console.log("m" + result.length)
    let data = "";
    for (const d of result) {
        data += (d.pageContent + ".\n\n");
    }

    let systemtext =
        `
        ${prompt}

        ${data}
        `;

    console.log(systemtext);

    const response = await model.call([
        new SystemChatMessage(systemtext),
        new HumanChatMessage(question),
    ]);

    return response;

}

// module.exports = { askAi }
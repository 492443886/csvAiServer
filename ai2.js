import { readFile } from "fs/promises"
import { CharacterTextSplitter } from "langchain/text_splitter"
import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"

let vectorStore
let isloaded = false
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const load = async () => {
  const text = await readFile("./t.txt", "utf8")
  const splitter = new CharacterTextSplitter({
    separator: "#",
    chunkSize: 300,
    chunkOverlap: 0,
  })
  const output = await splitter.createDocuments([text])

  console.log(output)
  console.log(output.length)

  const embed = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
  vectorStore = await HNSWLib.fromDocuments(output, embed)
}

export const search = async (question) => {
  if (isloaded == false) {
    await load()
    isloaded = true
  }
  const result = await vectorStore.similaritySearch(question, 1)
  let data = ""
  for (const d of result) {
    data += d.pageContent + ".\n\n"
  }
  return data
}

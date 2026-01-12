const { Pinecone } = require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY});

// Create a dense index with integrated embedding
const chatGptIndex = pc.Index('chatgpt');

// this func will create memory
async function createMemory({vectors, metadata, messageId}){
    await chatGptIndex.upsert([
        {
            id: messageId,
            values: vectors,
            metadata
        }
    ])
}


async function queryMemory({queryVector, limit=5, metadata} ){

    const data = await chatGptIndex.query({
        vector: queryVector,
        topK: limit, //mtlb top 3-4 ya jo b close related lagre vector wo dedo like k messages bhejo jo bht close hai msg k
        filter: metadata ? metadata : undefined,
        includeMetadata:true
    })
    return data.matches
}

module.exports = {createMemory, queryMemory}
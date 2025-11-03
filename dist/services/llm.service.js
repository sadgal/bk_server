"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenAIChatCompletion = getOpenAIChatCompletion;
const openai_1 = __importDefault(require("openai"));
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2:7b';
///////////////////////////////////////////////////////////////////
// local_llm
/////////////////////////////////////////////////////////////////
/********************************************************

export async function generateSummaryFromArticles(articles: { title: string; summary: string }[]): Promise<string> {

 try {

     const prompt = `
Résume en 120 mots maximum les tendances récentes en intelligence artificielle à partir des titres et résumés suivants.
Mets en avant les nouveaux modèles, les plateformes populaires, et les sujets dominants.

Articles :
${articles.map(a => `- ${a.title}: ${a.summary}`).join('\n')}
  `.trim();
     console.log('ollama_url:', `${OLLAMA_URL}`);
     console.log('ollama_model:', `${OLLAMA_MODEL}`);

     const ollam
export async function getOpenAIChatCompletion0(articles: { title: string; summary: string }[]): Promise<string> {

    console.log('OPENAI')

    const prompt = `
Résume en 120 mots maximum les tendances récentes en intelligence artificielle à partir des titres et résumés suivants.
Mets en avant les nouveaux modèles, les plateformes populaires, et les sujets dominants.

Articles :
${articles.map(a => `- ${a.title}: ${a.summary}`).join('\n')}
  `.trim();


    const requestBody: ChatCompletionRequest = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify(requestBody),
    });


    const data: ChatCompletionResponse = await response.json();
    console.log('SUMMARY:',data.choices[0].message.content)
    return data.choices[0].message.content;
}

aResponse = await fetch('http://localhost:11434/api/generate', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
             model: 'qwen2:7b',
             //model: 'Qwen3-4B:latest',
             //model: 'Qwen3-14B:latest',
             prompt,
             stream: false,
             options: {temperature: 0.7, top_p: 0.9, max_tokens: 300}
         })
     });

     if (!ollamaResponse.ok) {
         throw new Error(`Ollama error: ${ollamaResponse.status}`);
     }
     const data = await ollamaResponse.json();

     console.log('SUMMARY:', data.Response);
     const summary =  data.response?.trim() || "Synthèse non disponible.";
     console.log('SUMMARY trim:', summary);

    return summary;

 }catch (error: any) {
        console.error("❌ Erreur dans /api/home :", error.message);
        return Response.json({
            summary: "❌ Impossible de générer la synthèse. Vérifiez que Ollama est lancé avec : ollama run qwen2:7b",
        }, { status: 500 });
    }





}

 *************************************************/
//////////////////////////////////////////////////////////////////////////////////////
////    LLMS sur OPENROUTER
//////////////////////////////////////////////////////////////
// Assurez-vous de remplacer ces placeholders par vos valeurs réelles
//const OPENROUTER_API_KEY = "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";
const OPENROUTER_API_KEY = "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";
const YOUR_SITE_URL = "<YOUR_SITE_URL>"; // Optionnel
const YOUR_SITE_NAME = "<YOUR_SITE_NAME>"; // Optionnel
const client = new openai_1.default({
    // Configuration de l'URL de base pour OpenRouter
    baseURL: "https://openrouter.ai/api/v1",
    // Utilisation de la clé d'API d'OpenRouter
    apiKey: OPENROUTER_API_KEY,
});
async function getOpenAIChatCompletion(articles) {
    console.log('COMPLETION: ....');
    const context = articles.map(a => `- ${a.title}\n  Résumé: ${a.summary.slice(0, 150)}...\n`).join('\n');
    /************     FRANCAIS
const prompt = `
Voici une liste d'articles récents sur l'intelligence artificielle et les modèles de langage (LLM).
Faites une synthèse claire, concise et professionnelle (max 150 mots) en français, en mettant en avant :
- Les principales nouvelles
- Les acteurs clés (OpenAI, Google, Anthropic, Alibaba, etc.)
- Les tendances émergentes (agents IA, RAG, fine-tuning, etc.)

Articles :
${context}

Réponse en anglais, sans titre, en style journalistique.
`;

****************************/
    // console.log(`COMPLETION: ${JSON.stringify(prompt)}`);
    const prompt = `
    Here is a list of recent articles on artificial intelligence and large language models (LLMs).
        Provide a clear, concise, and professional summary (maximum 150 words) in French, highlighting:
    - The main news
    - The key players (OpenAI, Google, Anthropic, Alibaba, etc.)
    - Emerging trends (AI agents, RAG, fine-tuning, etc.)

    Articles:
        ${context}

    Answer in English, without a title, in a journalistic style.

  `;
    // const model_llm = "alibaba/tongyi-deepresearch-30b-a3b:free";
    const model_llm = "minimax/minimax-m2:free";
    //   const model_llm ="nvidia/nemotron-nano-12b-v2-vl:free";
    //////  const model_llm ="deepseek/deepseek-chat-v3.1:free";
    //const model_llm ="openai/gpt-oss-20b:free";
    //    const model_llm ="qwen/qwen3-coder:free";
    //////const model_llm ="moonshotai/kimi-k2:free";
    /////   const model_llm ="tngtech/deepseek-r1t2-chimera:free";
    ////// const model_llm ="moonshotai/kimi-dev-72b:free";
    ////   const model_llm ="qwen/qwen3-30b-a3b:free";
    try {
        const completion = await client.chat.completions.create({
            // Configuration des en-têtes HTTP supplémentaires via l'option 'headers'
            // Note: extra_headers dans Python devient 'headers' dans TypeScript
            // extra_body dans Python devient 'extraBody' dans TypeScript
            //extraBody: {},
            model: model_llm,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        console.log("REPONSE de :", model_llm);
        // Affichage du contenu de la réponse
        let rep = completion.choices[0].message.content;
        console.log(completion.choices[0].message.content);
        return rep;
    }
    catch (error) {
        console.error("An error occurred during the OpenAI API call:", error);
    }
}

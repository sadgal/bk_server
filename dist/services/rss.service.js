"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLatestArticles = fetchLatestArticles;
// backend/src1/services/rss.service.ts
const rss_parser_1 = __importDefault(require("rss-parser"));
const parser = new rss_parser_1.default();
async function fetchLatestArticles() {
    const feeds = [
        'https://the-decoder.com/feed/',
        'https://venturebeat.com/category/ai/feed/',
        'https://huggingface.co/blog/feed.xml'
    ];
    console.log('Fetching latest articles... rss');
    let allArticles = [];
    for (const url of feeds) {
        try {
            const feed = await parser.parseURL(url);
            const articles = feed.items.map(item => ({
                title: item.title || 'Sans titre',
                summary: item.contentSnippet || item.content || 'Aucun résumé',
                link: item.link,
                pubDate: item.pubDate || new Date().toISOString(),
            }));
            allArticles = allArticles.concat(articles);
        }
        catch (err) {
            console.warn(`Erreur avec le flux ${url}:`, err);
        }
    }
    // Trier par date et limiter à 10
    return allArticles
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 10);
}

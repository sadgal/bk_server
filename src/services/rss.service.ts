// backend/src1/services/rss.service.ts
import Parser from 'rss-parser';

export interface Article {
    title: string;
    summary: string;
    link: string;
    pubDate: string;
}

const parser = new Parser();

export async function fetchLatestArticles(): Promise<Article[]> {
    const feeds = [
        'https://the-decoder.com/feed/',
        'https://venturebeat.com/category/ai/feed/',
        'https://huggingface.co/blog/feed.xml'
    ];
    console.log('Fetching latest articles... rss');

    let allArticles: Article[] = [];
    for (const url of feeds) {
        try {
            const feed = await parser.parseURL(url);
            const articles = feed.items.map(item => ({
                title: item.title || 'Sans titre',
                summary: item.contentSnippet || item.content || 'Aucun résumé',
                link: item.link!,
                pubDate: item.pubDate || new Date().toISOString(),
            }));
            allArticles = allArticles.concat(articles);
        } catch (err) {
            console.warn(`Erreur avec le flux ${url}:`, err);
        }
    }

    // Trier par date et limiter à 10
    return allArticles
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 10);
}
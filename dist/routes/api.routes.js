"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src1/routes/api.routes.ts
const express_1 = require("express");
const fetchNews_1 = require("../services/fetchNews");
//import { generateSummaryFromArticles, getOpenAIChatCompletion } from '../services/llm.service';
const llm_service_1 = require("../services/llm.service");
//import { getModelsAndPlatforms } from '../services/models.service';
//import { getCommunityOpinions, submitPlatformFeedback } from '../services/feedback.service';
const router = (0, express_1.Router)();
// Cache simple en mémoire (à remplacer par Redis en prod)
//data = { summary, articles };
//
// let homeCache: { any; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
router.get('/home', async (req, res) => {
    try {
        const now = Date.now();
        /***
        if (homeCache && now - homeCache.timestamp < CACHE_TTL) {
            const rdata = { summary: 'Pas article',articles:[]};

            return res.json(rdata);
        }
***/
        const articles = await (0, fetchNews_1.fetchLatestArticlesF)();
        /************************************
        const summary = await generateSummaryFromArticles(
            articles.map(a => ({ title: a.title, summary: a.summary }))
        );
          *******************************/
        const summary = await (0, llm_service_1.getOpenAIChatCompletion)(articles.map(a => ({ title: a.title, summary: a.excerpt })));
        //const summary='Pas de synthèse'
        const data = { summary, articles };
        //homeCache = { data, timestamp: now };
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});
/*****************************************************************************
router.get('/models-platforms', (req, res) => {
    try {
        const data = getModelsAndPlatforms();
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/compare', (req, res) => {
    try {
        const data = getModelsAndPlatforms();
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/community-opinions', (req, res) => {
    try {
        const opinions = getCommunityOpinions();
        res.json(opinions);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/feedback', (req, res) => {
    try {
        const feedback = submitPlatformFeedback(req.body);
        res.status(201).json(feedback);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});
********************************************************************/
exports.default = router;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src1/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
//const PORT = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use('/api', api_routes_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'AI Platform Backend – Ready!' });
});
/***
const host = '192.168.1.22';
//const host = '0.0.0.0';
app.listen(PORT, host, () => {
    console.log(`Le serveur ${host} écoute sur le port ${PORT}`);
    console.log(`Le serveur est accessible depuis l'adresse IP externe.`);
});
***/
app.listen(PORT, () => {
    console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
    console.log(`🧠 Assurez-vous qu’Ollama tourne sur http://localhost:11434`);
});

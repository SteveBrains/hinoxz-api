"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
app.get('/locations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude || !radius) {
        return res.status(400).json({ error: 'Missing latitude, longitude, or radius' });
    }
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const rad = parseFloat(radius);
    if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
        return res.status(400).json({ error: 'Invalid latitude, longitude, or radius' });
    }
    const locations = yield prisma.location.findMany();
    const filteredLocations = locations.filter((location) => {
        const distance = calculateDistance(lat, lon, location.latitude, location.longitude);
        return distance <= rad;
    });
    res.json(filteredLocations);
}));
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

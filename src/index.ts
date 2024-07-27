
import express from 'express'

import { PrismaClient } from'@prisma/client'
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}; 

app.get('/locations', async (req: any, res: any) => {
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

    const locations = await prisma.location.findMany();
    const filteredLocations = locations.filter((location: { latitude: any; longitude: any; }) => {
        const distance = calculateDistance(lat, lon, location.latitude, location.longitude);
        return distance <= rad;
    });

    res.json(filteredLocations);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

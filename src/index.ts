
import express from 'express'

import { PrismaClient } from '@prisma/client'
import { Sql } from '@prisma/client/runtime/library';
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

    const radInRadians = rad / 6371;

    //     const query: any = `
    //                 SELECT *,
    //                     (6371 * ACOS(COS(RADIANS(${lat}))
    //                     * COS(RADIANS(latitude))
    //                     * COS(RADIANS(longitude) - RADIANS(${lon}))
    //                     + SIN(RADIANS(${lat}))
    //                     * SIN(RADIANS(latitude)))) AS distance
    //                 FROM Post
    //                 HAVING distance <= ${radInRadians}
    //   `;


    // const query = await prisma.$queryRaw<{ id: number }[]>(`SELECT id FROM "Post" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, radius * 1000)` as unknown as TemplateStringsArray | Sql)
    //   const posts = await prisma.post.findMany({
    //     where: {
    //       id: {
    //         in: query.map(({ id }:any) => id)
    //       }
    //     }
    //   })

    // res.json(posts)
    const radiusInMeters = rad * 1000; // Convert radius from kilometers to meters

    // Query to find posts within the radius using raw SQL
    const query = await prisma.$queryRaw<{ id: number }[]>`
  SELECT id 
  FROM "Post"
  WHERE ST_DWithin(
    ST_MakePoint(longitude, latitude)::geography, 
    ST_MakePoint(${lon}, ${lat})::geography, 
    ${radiusInMeters}
  )
`;

    // Fetch the posts that match the ids from the first query
    const posts = await prisma.post.findMany({
        where: {
            id: {
                in: query.map(({ id }) => id),
            },
        },
    });

    res.json(posts);


});


app.get('/', async (req: any, res: any) => {
    res.json({ message: "Welcome" })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


import express from 'express'

import { PrismaClient } from '@prisma/client'
import { Sql } from '@prisma/client/runtime/library';
const prisma = new PrismaClient();

const app = express();
app.use(express.json());




// app.get('/locations', async (req: any, res: any) => {
//     const { latitude, longitude, radius } = req.query;

//     if (!latitude || !longitude || !radius) {
//         return res.status(400).json({ error: 'Missing latitude, longitude, or radius' });
//     }

//     const lat = parseFloat(latitude);
//     const lon = parseFloat(longitude);
//     const rad = parseFloat(radius);

//     if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
//         return res.status(400).json({ error: 'Invalid latitude, longitude, or radius' });
//     }

//     const radiusInMeters = rad * 1000;

//     const query = await prisma.$queryRaw<{ id: number }[]>`
//         SELECT id 
//         FROM "Post"
//         WHERE ST_DWithin(
//             ST_MakePoint(longitude, latitude)::geography, 
//             ST_MakePoint(${lon}, ${lat})::geography, 
//             ${radiusInMeters}
//         )
// `;

//     const posts = await prisma.post.findMany({
//         where: {
//             id: {
//                 in: query.map(({ id }) => id),
//             },
//         },
//     });

//     res.json(posts);


// });


// Example usage

// app.get('/locations', async (req: any, res: any) => {
//     const { latitude, longitude, radius, page = 1, pageSize = 10 } = req.query;

//     // Validate latitude, longitude, and radius
//     if (!latitude || !longitude || !radius) {
//         return res.status(400).json({ error: 'Missing latitude, longitude, or radius' });
//     }

//     const lat = parseFloat(latitude);
//     const lon = parseFloat(longitude);
//     const rad = parseFloat(radius);

//     if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
//         return res.status(400).json({ error: 'Invalid latitude, longitude, or radius' });
//     }

//     // Validate and parse pagination parameters
//     const pageNumber = parseInt(page as string, 10);
//     const pageSizeNumber = parseInt(pageSize as string, 10);

//     if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSizeNumber) || pageSizeNumber < 1) {
//         return res.status(400).json({ error: 'Invalid page or pageSize' });
//     }

//     const radiusInMeters = rad * 1000;

//     // Fetch the IDs of the posts within the radius
//     const query = await prisma.$queryRaw<{ id: number }[]>`
//         SELECT id 
//         FROM "Post"
//         WHERE ST_DWithin(
//             ST_MakePoint(longitude, latitude)::geography, 
//             ST_MakePoint(${lon}, ${lat})::geography, 
//             ${radiusInMeters}
//         )
//     `;

//     console.log(query)

//     // Calculate pagination offsets
//     const skip = (pageNumber - 1) * pageSizeNumber;
//     const take = pageSizeNumber;

//     // Fetch the posts with pagination
//     const posts = await prisma.post.findMany({
//         where: {
//             id: {
//                 in: query.map(({ id }) => id),
//             },
//         },
//         skip,
//         take,
//     });
//     const postsMap = new Map(posts.map(post => [post.id, post]));
//     const orderedPosts = query.map(({ id }) => postsMap.get(id)).filter(post => post !== undefined);

//     const updatedPosts = orderedPosts.map((each) => {
//         const distance = calculateHaversineDistanceInKm(lat, lon, each.latitude, each.longitude);


//         console.log(`Distance: ${distance} kilometers`);

//         return {
//             ...each,
//             distance: distance.toFixed(1)
//         }
//     })

//     // Send the paginated results
//     res.json({
//         page: pageNumber,
//         pageSize: pageSizeNumber,
//         totalResults: query.length,
//         totalPages: Math.ceil(query.length / pageSizeNumber),
//         posts: updatedPosts,
//     });
// });

// app.get('/locations', async (req: any, res: any) => {
//     const { latitude, longitude, radius, page = 1, pageSize = 10 } = req.query;

//     // Validate latitude, longitude, and radius
//     if (!latitude || !longitude || !radius) {
//         return res.status(400).json({ error: 'Missing latitude, longitude, or radius' });
//     }

//     const lat = parseFloat(latitude);
//     const lon = parseFloat(longitude);
//     const rad = parseFloat(radius);

//     if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
//         return res.status(400).json({ error: 'Invalid latitude, longitude, or radius' });
//     }

//     // Validate and parse pagination parameters
//     const pageNumber = parseInt(page as string, 10);
//     const pageSizeNumber = parseInt(pageSize as string, 10);

//     if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSizeNumber) || pageSizeNumber < 1) {
//         return res.status(400).json({ error: 'Invalid page or pageSize' });
//     }

//     const radiusInMeters = rad * 1000;
//     console.log(radiusInMeters, "radiusInMeters")
//     // Fetch the IDs of the posts within the radius
//     const query = await prisma.$queryRaw<any[]>`
//         SELECT id, ST_Distance(
//             ST_MakePoint(longitude, latitude)::geography, 
//             ST_MakePoint(${lon}, ${lat})::geography
//         ) AS distance
//         FROM "Post"
//         WHERE ST_DWithin(
//             ST_MakePoint(longitude, latitude)::geography, 
//             ST_MakePoint(${lon}, ${lat})::geography, 
//             ${radiusInMeters}
//         )
//         ORDER BY distance
//     `;

//     console.log(query)
//     // Calculate pagination offsets
//     const skip = (pageNumber - 1) * pageSizeNumber;
//     const take = pageSizeNumber;

//     // Fetch the posts with pagination
//     const posts = await prisma.post.findMany({
//         where: {
//             id: {
//                 in: query.map(({ id }) => id),
//             },
//         },
//         skip,
//         take,
//     });

//     // Calculate distances and sort posts by distance
//     const updatedPosts = posts.map((post) => {
//         const distance = calculateHaversineDistanceInKm(lat, lon, post.latitude, post.longitude);
//         return {
//             ...post,
//             distance: distance.toFixed(1)
//         };
//     }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)); // Sort by distance

//     // Send the paginated results
//     res.json({
//         page: pageNumber,
//         pageSize: pageSizeNumber,
//         totalResults: query.length,
//         totalPages: Math.ceil(query.length / pageSizeNumber),
//         posts: updatedPosts,
//     });
// });

// app.get('/locations', async (req: any, res: any) => {
//     const { latitude, longitude, radius, page = 1, pageSize = 10 } = req.query;

//     // Validate latitude, longitude, and radius
//     if (!latitude || !longitude || !radius) {
//         return res.status(400).json({ error: 'Missing latitude, longitude, or radius' });
//     }

//     const lat = parseFloat(latitude);
//     const lon = parseFloat(longitude);
//     const rad = parseFloat(radius);

//     if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
//         return res.status(400).json({ error: 'Invalid latitude, longitude, or radius' });
//     }

//     // Validate and parse pagination parameters
//     const pageNumber = parseInt(page as string, 10);
//     const pageSizeNumber = parseInt(pageSize as string, 10);

//     if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSizeNumber) || pageSizeNumber < 1) {
//         return res.status(400).json({ error: 'Invalid page or pageSize' });
//     }

//     const radiusInMeters = rad * 1000;

//     // Fetch the posts with distance calculation and ordering by distance
//     const query = await prisma.$queryRaw<any[]>`
//         SELECT id, ST_Distance(
//             ST_MakePoint(longitude, latitude)::geography, 
//             ST_MakePoint(${lon}, ${lat})::geography
//         ) AS distance
//         FROM "Post"
//         WHERE ST_DWithin(
//             ST_MakePoint(longitude, latitude)::geography, 
//             ST_MakePoint(${lon}, ${lat})::geography, 
//             ${radiusInMeters}
//         )
//         ORDER BY distance
//     `;

//     const postIds = query.map(row => row.id);
//     const distances = query.map(row => row.distance);
//     const skip = (pageNumber - 1) * pageSizeNumber;
//     const take = pageSizeNumber;
//     const posts = await prisma.post.findMany({
//         where: {
//             id: {
//                 in: postIds,
//             },
//         },
//         skip,
//         take,
//     });


//     const postsMap = new Map(posts.map(post => [post.id, post]));

//     // Reorder posts according to the original sorted IDs
//     const orderedPosts = postIds.map(id => postsMap.get(id)).filter(post => post !== undefined);

//     // Add distance to the posts
//     const updatedPosts = orderedPosts.map((post, index) => {
//         const distance = distances[postIds.indexOf(post.id)] / 1000; // Convert distance from meters to kilometers
//         return {
//             ...post,
//             distance: distance.toFixed(1)
//         };
//     });

//     // Send the paginated results
//     res.json({
//         page: pageNumber,
//         pageSize: pageSizeNumber,
//         totalResults: query.length,
//         totalPages: Math.ceil(query.length / pageSizeNumber),
//         posts: updatedPosts,
//     });
// });

app.get('/locations', async (req: any, res: any) => {
    const { latitude, longitude, radius, page = 1, pageSize = 10 } = req.query;

    // Validate latitude, longitude, and radius
    if (!latitude || !longitude || !radius) {
        return res.status(400).json({ error: 'Missing latitude, longitude, or radius' });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const rad = parseFloat(radius);

    if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
        return res.status(400).json({ error: 'Invalid latitude, longitude, or radius' });
    }

    // Validate and parse pagination parameters
    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSizeNumber) || pageSizeNumber < 1) {
        return res.status(400).json({ error: 'Invalid page or pageSize' });
    }

    const radiusInMeters = rad * 1000;
    const offset = (pageNumber - 1) * pageSizeNumber;
    const limit = pageSizeNumber;
    const query = await prisma.$queryRaw<any[]>`
        SELECT id, ST_Distance(
            ST_MakePoint(longitude, latitude)::geography, 
            ST_MakePoint(${lon}, ${lat})::geography
        ) AS distance
        FROM "Post"
        WHERE ST_DWithin(
            ST_MakePoint(longitude, latitude)::geography, 
            ST_MakePoint(${lon}, ${lat})::geography, 
            ${radiusInMeters}
        )
        ORDER BY distance
        LIMIT ${limit}
        OFFSET ${offset}
    `;

    const postIds = query.map(row => row.id);
    const distances = query.map(row => row.distance);

    const posts = await prisma.post.findMany({
        where: {
            id: {
                in: postIds,
            },
        },
    });

    const postsMap = new Map(posts.map(post => [post.id, post]));
    const orderedPosts = postIds.map(id => postsMap.get(id)).filter(post => post !== undefined);
    const updatedPosts = orderedPosts.map((post, index) => {
        const distance = distances[postIds.indexOf(post.id)] / 1000; // Convert distance from meters to kilometers
        return {
            ...post,
            distance: distance.toFixed(1)
        };
    });
    res.json({
        page: pageNumber,
        pageSize: pageSizeNumber,
        totalResults: postIds.length, // totalResults is the number of posts within the radius, not just the paginated subset
        totalPages: Math.ceil(postIds.length / pageSizeNumber),
        posts: updatedPosts,
    });
});

app.get('/', async (req: any, res: any) => {
    res.json({ message: "Welcome" })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

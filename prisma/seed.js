const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





var inputFile = 'final_cities.csv';
const fs = require('fs');
const csv = require('csv-parser');

let data2 = []

fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', function (data) {
        console.log(data)
        try {

            data2 = [...data2, { state: data.State, district: data.District, city: data.City, population: Number(data.Population), latitude: Number(data.Latitude), longitude: Number(data.Longitude) }]
        }
        catch (err) {
            //error handler
        }
    })
    .on('end', function () {
        // console.log(data2)

        // console.log(JSON.stringify(data2), "----------")
        const seed = async () => {
            try {
                // Clear existing data
                // await prisma.location.deleteMany();

                // Create sample data
                await prisma.location.createMany({
                    data: [
                        ...data2
                    ]
                });

                console.log('Seeding completed');
            } catch (error) {
                console.error('Error seeding database:', error);
            } finally {
                await prisma.$disconnect();
            }
        };
        seed()
    });


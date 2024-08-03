const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





// var inputFile = 'final_cities.csv';
const fs = require('fs');
const csv = require('csv-parser');

let data2 = []

// fs.createReadStream(inputFile)
//   .pipe(csv())
//   .on('data', function (data) {
//     console.log(data)
//     try {

//       data2 = [...data2, { state: data.State, district: data.District, city: data.City, population: Number(data.Population), latitude: Number(data.Latitude), longitude: Number(data.Longitude) }]
//     }
//     catch (err) {
//       //error handler
//     }
//   })
//   .on('end', function () {
//     // console.log(data2)

//     // console.log(JSON.stringify(data2), "----------")
//     const seed = async () => {
//       try {
//         // Clear existing data
//         // await prisma.location.deleteMany();

//         // Create sample data
//         // await prisma.location.createMany({
//         //     data: [
//         //         ...data2
//         //     ]
//         // });
//         await prisma.post.deleteMany();
//         const dat = []
//         for (var i = 0; i <= 20000; i++) {
//           dat.push({
//             "title": "Beautiful" + i.toString() + "Family Home",
//             "description": "A spacious " + i.toString() + " home perfect for a growing family.",
//             "price": (350 + i).toString(),
//             "address": "123 Maple" + i.toString() + " Street, Springfield, IL",
//             "latitude": 3.7817 + i,
//             "longitude": -0 + i,
//             "fetchedAddressId": i
//           },)
//         }
//         await prisma.post.createMany({
//           data:
//             [...dat,
//             {
//               "title": "Beautiful Family Home",
//               "description": "A spacious home perfect for a growing family.",
//               "price": "350000",
//               "address": "123 Maple Street, Springfield, IL",
//               "latitude": 39.7817,
//               "longitude": -89.6501,
//               "fetchedAddressId": 1
//             },
//             {
//               "title": "Modern Apartment",
//               "description": "A sleek apartment with modern amenities.",
//               "price": "250000",
//               "address": "456 Oak Avenue, Lincoln, NE",
//               "latitude": 40.8136,
//               "longitude": -96.7026,
//               "fetchedAddressId": 2
//             },
//             {
//               "title": "Cozy Cottage",
//               "description": "A charming cottage in a quiet neighborhood.",
//               "price": "200000",
//               "address": "789 Pine Road, Madison, WI",
//               "latitude": 43.0731,
//               "longitude": -89.4012,
//               "fetchedAddressId": 3
//             },
//             {
//               "title": "Luxury Condo",
//               "description": "A luxurious condo with stunning city views.",
//               "price": "600000",
//               "address": "101 Elm Street, New York, NY",
//               "latitude": 40.7306,
//               "longitude": -73.9352,
//               "fetchedAddressId": 4
//             },
//             {
//               "title": "Charming Bungalow",
//               "description": "A cozy bungalow with a beautiful garden.",
//               "price": "320000",
//               "address": "202 Birch Avenue, Austin, TX",
//               "latitude": 30.2672,
//               "longitude": -97.7431,
//               "fetchedAddressId": 5
//             },
//             {
//               "title": "Spacious Loft",
//               "description": "A large loft with ample space and modern finishes.",
//               "price": "450000",
//               "address": "303 Cedar Street, San Francisco, CA",
//               "latitude": 37.7749,
//               "longitude": -122.4194,
//               "fetchedAddressId": 6
//             },
//             {
//               "title": "Elegant Villa",
//               "description": "An elegant villa with luxurious features.",
//               "price": "800000",
//               "address": "404 Oak Road, Los Angeles, CA",
//               "latitude": 34.0522,
//               "longitude": -118.2437,
//               "fetchedAddressId": 7
//             },
//             {
//               "title": "Historic Mansion",
//               "description": "A grand mansion with historical charm.",
//               "price": "2000000",
//               "address": "505 Elm Drive, Boston, MA",
//               "latitude": 42.3601,
//               "longitude": -71.0589,
//               "fetchedAddressId": 8
//             },
//             {
//               "title": "Countryside Farmhouse",
//               "description": "A farmhouse in the serene countryside.",
//               "price": "450000",
//               "address": "606 Pine Lane, Denver, CO",
//               "latitude": 39.7392,
//               "longitude": -104.9903,
//               "fetchedAddressId": 9
//             },
//             {
//               "title": "Urban Loft",
//               "description": "A trendy loft in the heart of the city.",
//               "price": "350000",
//               "address": "707 Maple Avenue, Chicago, IL",
//               "latitude": 41.8781,
//               "longitude": -87.6298,
//               "fetchedAddressId": 10
//             },
//             {
//               "title": "Beachfront Property",
//               "description": "A property with direct access to the beach.",
//               "price": "1200000",
//               "address": "808 Seaside Road, Miami, FL",
//               "latitude": 25.7617,
//               "longitude": -80.1918,
//               "fetchedAddressId": 11
//             },
//             {
//               "title": "Mountain Retreat",
//               "description": "A retreat located in the scenic mountains.",
//               "price": "650000",
//               "address": "909 Mountain Lane, Aspen, CO",
//               "latitude": 39.1911,
//               "longitude": -106.8175,
//               "fetchedAddressId": 12
//             },
//             {
//               "title": "Gated Community Home",
//               "description": "A home located in a secure gated community.",
//               "price": "750000",
//               "address": "1010 Secure Street, San Diego, CA",
//               "latitude": 32.7157,
//               "longitude": -117.1611,
//               "fetchedAddressId": 13
//             },
//             {
//               "title": "Coastal Cottage",
//               "description": "A cozy cottage by the coast.",
//               "price": "300000",
//               "address": "1111 Coastal Avenue, Charleston, SC",
//               "latitude": 32.7765,
//               "longitude": -79.9311,
//               "fetchedAddressId": 14
//             },
//             {
//               "title": "Penthouse Suite",
//               "description": "A luxurious penthouse with panoramic city views.",
//               "price": "1600000",
//               "address": "1212 High Rise Road, New York, NY",
//               "latitude": 40.748817,
//               "longitude": -73.985428,
//               "fetchedAddressId": 15
//             },
//             {
//               "title": "Chic Apartment",
//               "description": "A chic apartment in a vibrant neighborhood.",
//               "price": "400000",
//               "address": "1313 Trendy Lane, Seattle, WA",
//               "latitude": 47.6062,
//               "longitude": -122.3321,
//               "fetchedAddressId": 16
//             },
//             {
//               "title": "Farmhouse Retreat",
//               "description": "A charming farmhouse with modern amenities.",
//               "price": "500000",
//               "address": "1414 Farm Road, Richmond, VA",
//               "latitude": 37.5407,
//               "longitude": -77.4360,
//               "fetchedAddressId": 17
//             },
//             {
//               "title": "Loft with View",
//               "description": "A loft offering breathtaking views.",
//               "price": "275000",
//               "address": "1515 Viewpoint Street, Portland, OR",
//               "latitude": 45.5152,
//               "longitude": -122.6784,
//               "fetchedAddressId": 18
//             },
//             {
//               "title": "Seaside Villa",
//               "description": "A villa with stunning seaside views.",
//               "price": "2000000",
//               "address": "1616 Ocean Drive, Malibu, CA",
//               "latitude": 34.0259,
//               "longitude": -118.7798,
//               "fetchedAddressId": 19
//             },
//             {
//               "title": "Historic Farmhouse",
//               "description": "A farmhouse with historic significance.",
//               "price": "350000",
//               "address": "1717 Heritage Lane, Savannah, GA",
//               "latitude": 32.0835,
//               "longitude": -81.0998,
//               "fetchedAddressId": 20
//             },
//             {
//               "title": "Urban Retreat",
//               "description": "A stylish retreat in an urban setting.",
//               "price": "420000",
//               "address": "1818 Urban Drive, Toronto, ON",
//               "latitude": 43.6511,
//               "longitude": -79.3470,
//               "fetchedAddressId": 21
//             },
//             {
//               "title": "Mountain Lodge",
//               "description": "A lodge offering a cozy mountain retreat.",
//               "price": "700000",
//               "address": "1919 Lodge Road, Park City, UT",
//               "latitude": 40.6461,
//               "longitude": -111.4980,
//               "fetchedAddressId": 22
//             },
//             {
//               "title": "Luxury Townhouse",
//               "description": "A luxurious townhouse with top-notch features.",
//               "price": "900000",
//               "address": "2020 Townhouse Avenue, Atlanta, GA",
//               "latitude": 33.7490,
//               "longitude": -84.3880,
//               "fetchedAddressId": 23
//             },
//             {
//               "title": "Charming Cottage",
//               "description": "A charming cottage with a lovely garden.",
//               "price": "225000",
//               "address": "2121 Garden Lane, Austin, TX",
//               "latitude": 30.2672,
//               "longitude": -97.7431,
//               "fetchedAddressId": 24
//             },
//             {
//               "title": "Elegant Loft",
//               "description": "An elegant loft with stylish interiors.",
//               "price": "500000",
//               "address": "2222 Elegant Drive, Miami, FL",
//               "latitude": 25.7617,
//               "longitude": -80.1918,
//               "fetchedAddressId": 25
//             },
//             {
//               "title": "Beach House",
//               "description": "A beautiful beach house with ocean views.",
//               "price": "750000",
//               "address": "2323 Beach Road, Myrtle Beach, SC",
//               "latitude": 33.6891,
//               "longitude": -78.8867,
//               "fetchedAddressId": 26
//             },
//             {
//               "title": "Mountain View Home",
//               "description": "A home with stunning mountain views.",
//               "price": "600000",
//               "address": "2424 Viewpoint Drive, Jackson Hole, WY",
//               "latitude": 43.4799,
//               "longitude": -110.7624,
//               "fetchedAddressId": 27
//             },
//             {
//               "title": "Cozy Apartment",
//               "description": "A cozy apartment in a friendly neighborhood.",
//               "price": "280000",
//               "address": "2525 Cozy Lane, Philadelphia, PA",
//               "latitude": 39.9526,
//               "longitude": -75.1652,
//               "fetchedAddressId": 28
//             },
//             {
//               "title": "Contemporary Home",
//               "description": "A modern home with clean lines and spacious interiors.",
//               "price": "550000",
//               "address": "2626 Contemporary Avenue, Seattle, WA",
//               "latitude": 47.6062,
//               "longitude": -122.3321,
//               "fetchedAddressId": 29
//             },
//             {
//               "title": "Historic Estate",
//               "description": "A grand estate with historical significance.",
//               "price": "1200000",
//               "address": "2727 Historic Street, Richmond, VA",
//               "latitude": 37.5407,
//               "longitude": -77.4360,
//               "fetchedAddressId": 30
//             },
//             {
//               "title": "Luxury Residence",
//               "description": "A high-end residence with premium features.",
//               "price": "950000",
//               "address": "2828 Residence Lane, San Diego, CA",
//               "latitude": 32.7157,
//               "longitude": -117.1611,
//               "fetchedAddressId": 31
//             },
//             {
//               "title": "Urban Studio",
//               "description": "A chic studio apartment in a vibrant urban area.",
//               "price": "300000",
//               "address": "2929 Studio Road, Boston, MA",
//               "latitude": 42.3601,
//               "longitude": -71.0589,
//               "fetchedAddressId": 32
//             },
//             {
//               "title": "Countryside Cottage",
//               "description": "A quaint cottage set in the peaceful countryside.",
//               "price": "250000",
//               "address": "3030 Cottage Lane, Indianapolis, IN",
//               "latitude": 39.7684,
//               "longitude": -86.1581,
//               "fetchedAddressId": 33
//             },
//             {
//               "title": "Chic Penthouse",
//               "description": "A stylish penthouse with incredible views.",
//               "price": "1750000",
//               "address": "3131 Penthouse Avenue, San Francisco, CA",
//               "latitude": 37.7749,
//               "longitude": -122.4194,
//               "fetchedAddressId": 34
//             },
//             {
//               "title": "Beach Villa",
//               "description": "A luxurious villa right by the beach.",
//               "price": "2200000",
//               "address": "3232 Villa Road, Honolulu, HI",
//               "latitude": 21.3069,
//               "longitude": -157.8583,
//               "fetchedAddressId": 35
//             },
//             {
//               "title": "Elegant Mansion",
//               "description": "A sophisticated mansion with elegant designs.",
//               "price": "2500000",
//               "address": "3333 Mansion Drive, Los Angeles, CA",
//               "latitude": 34.0522,
//               "longitude": -118.2437,
//               "fetchedAddressId": 36
//             },
//             {
//               "title": "Historic Lodge",
//               "description": "A lodge with a rich history and modern comforts.",
//               "price": "400000",
//               "address": "3434 Lodge Lane, Jackson Hole, WY",
//               "latitude": 43.4799,
//               "longitude": -110.7624,
//               "fetchedAddressId": 37
//             },
//             {
//               "title": "Seaside Retreat",
//               "description": "A peaceful retreat with stunning seaside views.",
//               "price": "850000",
//               "address": "3535 Seaside Lane, Cape Cod, MA",
//               "latitude": 41.6708,
//               "longitude": -70.2910,
//               "fetchedAddressId": 38
//             },
//             {
//               "title": "Mountain Cabin",
//               "description": "A cozy cabin nestled in the mountains.",
//               "price": "500000",
//               "address": "3636 Cabin Road, Park City, UT",
//               "latitude": 40.6461,
//               "longitude": -111.4980,
//               "fetchedAddressId": 39
//             },
//             {
//               "title": "Urban Apartment",
//               "description": "A modern apartment in the heart of the city.",
//               "price": "420000",
//               "address": "3737 Urban Drive, Toronto, ON",
//               "latitude": 43.6511,
//               "longitude": -79.3470,
//               "fetchedAddressId": 40
//             },
//             {
//               "title": "Luxury Villa",
//               "description": "A luxurious villa with premium features.",
//               "price": "1800000",
//               "address": "3838 Villa Avenue, Beverly Hills, CA",
//               "latitude": 34.0697,
//               "longitude": -118.4053,
//               "fetchedAddressId": 41
//             },
//             {
//               "title": "Chic Retreat",
//               "description": "A stylish retreat with contemporary design.",
//               "price": "550000",
//               "address": "3939 Retreat Lane, Denver, CO",
//               "latitude": 39.7392,
//               "longitude": -104.9903,
//               "fetchedAddressId": 42
//             },
//             {
//               "title": "Historic Home",
//               "description": "A home with historical charm and modern updates.",
//               "price": "680000",
//               "address": "4040 Heritage Street, Savannah, GA",
//               "latitude": 32.0835,
//               "longitude": -81.0998,
//               "fetchedAddressId": 43
//             },
//             {
//               "title": "Countryside Estate",
//               "description": "A grand estate set in the countryside.",
//               "price": "900000",
//               "address": "4141 Estate Road, Richmond, VA",
//               "latitude": 37.5407,
//               "longitude": -77.4360,
//               "fetchedAddressId": 44
//             },
//             {
//               "title": "Urban Loft",
//               "description": "A modern loft in an urban setting.",
//               "price": "350000",
//               "address": "4242 Loft Lane, Seattle, WA",
//               "latitude": 47.6062,
//               "longitude": -122.3321,
//               "fetchedAddressId": 45
//             },
//             {
//               "title": "Beach House",
//               "description": "A beautiful house right on the beach.",
//               "price": "750000",
//               "address": "4343 Beachside Road, Santa Monica, CA",
//               "latitude": 34.0194,
//               "longitude": -118.4912,
//               "fetchedAddressId": 46
//             },
//             {
//               "title": "Mountain Lodge",
//               "description": "A cozy lodge offering stunning mountain views.",
//               "price": "650000",
//               "address": "4444 Lodge Lane, Aspen, CO",
//               "latitude": 39.1911,
//               "longitude": -106.8175,
//               "fetchedAddressId": 47
//             },
//             {
//               "title": "Contemporary Home",
//               "description": "A sleek, modern home with open spaces.",
//               "price": "550000",
//               "address": "4545 Modern Drive, Portland, OR",
//               "latitude": 45.5152,
//               "longitude": -122.6784,
//               "fetchedAddressId": 48
//             },
//             {
//               "title": "Luxury Apartment",
//               "description": "An upscale apartment with high-end finishes.",
//               "price": "900000",
//               "address": "4646 Luxury Lane, Chicago, IL",
//               "latitude": 41.8781,
//               "longitude": -87.6298,
//               "fetchedAddressId": 49
//             },
//             {
//               "title": "Charming Loft",
//               "description": "A charming loft with unique character.",
//               "price": "275000",
//               "address": "4747 Loft Road, New York, NY",
//               "latitude": 40.7306,
//               "longitude": -73.9352,
//               "fetchedAddressId": 50
//             }
//             ]

//         });

//         console.log('Seeding completed');
//       } catch (error) {
//         console.error('Error seeding database:', error);
//       } finally {
//         await prisma.$disconnect();
//       }
//     };
//     seed()
//   });



const seed = async () => {
  try {
    // Clear existing data
    // await prisma.location.deleteMany();

    // Create sample data
    // await prisma.location.createMany({
    //     data: [
    //         ...data2
    //     ]
    // });
    await prisma.post.deleteMany();
    const dat = []
    // for (var i = 1; i <= 500; i++) {
    //   dat.push({
    //     "title": "Beautiful" + i+i.toString() + "Family Home",
    //     "description": "A spacious " + i+i.toString() + " home perfect for a growing family.",
    //     "price": (350 + i*2).toString(),
    //     "address": "123 Maple" + i.toString() + " Street, Springfield, IL",
    //     "latitude": 322.7817 - i,
    //     "longitude": -0 - i,
    //     "fetchedAddressId": i
    //   },)
    // }
    // console.log(JSON.stringify(dat))
    await prisma.post.createMany({
      data:
        [
        {
          "title": "Beautiful Family Home",
          "description": "A spacious home perfect for a growing family.",
          "price": "350000",
          "address": "123 Maple Street, Springfield, IL",
          "latitude": 39.7817,
          "longitude": -89.6501,
          "fetchedAddressId": 1
        },
        {
          "title": "Modern Apartment",
          "description": "A sleek apartment with modern amenities.",
          "price": "250000",
          "address": "456 Oak Avenue, Lincoln, NE",
          "latitude": 40.8136,
          "longitude": -96.7026,
          "fetchedAddressId": 2
        },
        {
          "title": "Cozy Cottage",
          "description": "A charming cottage in a quiet neighborhood.",
          "price": "200000",
          "address": "789 Pine Road, Madison, WI",
          "latitude": 43.0731,
          "longitude": -89.4012,
          "fetchedAddressId": 3
        },
        {
          "title": "Luxury Condo",
          "description": "A luxurious condo with stunning city views.",
          "price": "600000",
          "address": "101 Elm Street, New York, NY",
          "latitude": 40.7306,
          "longitude": -73.9352,
          "fetchedAddressId": 4
        },
        {
          "title": "Charming Bungalow",
          "description": "A cozy bungalow with a beautiful garden.",
          "price": "320000",
          "address": "202 Birch Avenue, Austin, TX",
          "latitude": 30.2672,
          "longitude": -97.7431,
          "fetchedAddressId": 5
        },
        {
          "title": "Spacious Loft",
          "description": "A large loft with ample space and modern finishes.",
          "price": "450000",
          "address": "303 Cedar Street, San Francisco, CA",
          "latitude": 37.7749,
          "longitude": -122.4194,
          "fetchedAddressId": 6
        },
        {
          "title": "Elegant Villa",
          "description": "An elegant villa with luxurious features.",
          "price": "800000",
          "address": "404 Oak Road, Los Angeles, CA",
          "latitude": 34.0522,
          "longitude": -118.2437,
          "fetchedAddressId": 7
        },
        {
          "title": "Historic Mansion",
          "description": "A grand mansion with historical charm.",
          "price": "2000000",
          "address": "505 Elm Drive, Boston, MA",
          "latitude": 42.3601,
          "longitude": -71.0589,
          "fetchedAddressId": 8
        },
        {
          "title": "Countryside Farmhouse",
          "description": "A farmhouse in the serene countryside.",
          "price": "450000",
          "address": "606 Pine Lane, Denver, CO",
          "latitude": 39.7392,
          "longitude": -104.9903,
          "fetchedAddressId": 9
        },
        {
          "title": "Urban Loft",
          "description": "A trendy loft in the heart of the city.",
          "price": "350000",
          "address": "707 Maple Avenue, Chicago, IL",
          "latitude": 41.8781,
          "longitude": -87.6298,
          "fetchedAddressId": 10
        },
        {
          "title": "Beachfront Property",
          "description": "A property with direct access to the beach.",
          "price": "1200000",
          "address": "808 Seaside Road, Miami, FL",
          "latitude": 25.7617,
          "longitude": -80.1918,
          "fetchedAddressId": 11
        },
        {
          "title": "Mountain Retreat",
          "description": "A retreat located in the scenic mountains.",
          "price": "650000",
          "address": "909 Mountain Lane, Aspen, CO",
          "latitude": 39.1911,
          "longitude": -106.8175,
          "fetchedAddressId": 12
        },
        {
          "title": "Gated Community Home",
          "description": "A home located in a secure gated community.",
          "price": "750000",
          "address": "1010 Secure Street, San Diego, CA",
          "latitude": 32.7157,
          "longitude": -117.1611,
          "fetchedAddressId": 13
        },
        {
          "title": "Coastal Cottage",
          "description": "A cozy cottage by the coast.",
          "price": "300000",
          "address": "1111 Coastal Avenue, Charleston, SC",
          "latitude": 32.7765,
          "longitude": -79.9311,
          "fetchedAddressId": 14
        },
        {
          "title": "Penthouse Suite",
          "description": "A luxurious penthouse with panoramic city views.",
          "price": "1600000",
          "address": "1212 High Rise Road, New York, NY",
          "latitude": 40.748817,
          "longitude": -73.985428,
          "fetchedAddressId": 15
        },
        {
          "title": "Chic Apartment",
          "description": "A chic apartment in a vibrant neighborhood.",
          "price": "400000",
          "address": "1313 Trendy Lane, Seattle, WA",
          "latitude": 47.6062,
          "longitude": -122.3321,
          "fetchedAddressId": 16
        },
        {
          "title": "Farmhouse Retreat",
          "description": "A charming farmhouse with modern amenities.",
          "price": "500000",
          "address": "1414 Farm Road, Richmond, VA",
          "latitude": 37.5407,
          "longitude": -77.4360,
          "fetchedAddressId": 17
        },
        {
          "title": "Loft with View",
          "description": "A loft offering breathtaking views.",
          "price": "275000",
          "address": "1515 Viewpoint Street, Portland, OR",
          "latitude": 45.5152,
          "longitude": -122.6784,
          "fetchedAddressId": 18
        },
        {
          "title": "Seaside Villa",
          "description": "A villa with stunning seaside views.",
          "price": "2000000",
          "address": "1616 Ocean Drive, Malibu, CA",
          "latitude": 34.0259,
          "longitude": -118.7798,
          "fetchedAddressId": 19
        },
        {
          "title": "Historic Farmhouse",
          "description": "A farmhouse with historic significance.",
          "price": "350000",
          "address": "1717 Heritage Lane, Savannah, GA",
          "latitude": 32.0835,
          "longitude": -81.0998,
          "fetchedAddressId": 20
        },
        {
          "title": "Urban Retreat",
          "description": "A stylish retreat in an urban setting.",
          "price": "420000",
          "address": "1818 Urban Drive, Toronto, ON",
          "latitude": 43.6511,
          "longitude": -79.3470,
          "fetchedAddressId": 21
        },
        {
          "title": "Mountain Lodge",
          "description": "A lodge offering a cozy mountain retreat.",
          "price": "700000",
          "address": "1919 Lodge Road, Park City, UT",
          "latitude": 40.6461,
          "longitude": -111.4980,
          "fetchedAddressId": 22
        },
        {
          "title": "Luxury Townhouse",
          "description": "A luxurious townhouse with top-notch features.",
          "price": "900000",
          "address": "2020 Townhouse Avenue, Atlanta, GA",
          "latitude": 33.7490,
          "longitude": -84.3880,
          "fetchedAddressId": 23
        },
        {
          "title": "Charming Cottage",
          "description": "A charming cottage with a lovely garden.",
          "price": "225000",
          "address": "2121 Garden Lane, Austin, TX",
          "latitude": 30.2672,
          "longitude": -97.7431,
          "fetchedAddressId": 24
        },
        {
          "title": "Elegant Loft",
          "description": "An elegant loft with stylish interiors.",
          "price": "500000",
          "address": "2222 Elegant Drive, Miami, FL",
          "latitude": 25.7617,
          "longitude": -80.1918,
          "fetchedAddressId": 25
        },
        {
          "title": "Beach House",
          "description": "A beautiful beach house with ocean views.",
          "price": "750000",
          "address": "2323 Beach Road, Myrtle Beach, SC",
          "latitude": 33.6891,
          "longitude": -78.8867,
          "fetchedAddressId": 26
        },
        {
          "title": "Mountain View Home",
          "description": "A home with stunning mountain views.",
          "price": "600000",
          "address": "2424 Viewpoint Drive, Jackson Hole, WY",
          "latitude": 43.4799,
          "longitude": -110.7624,
          "fetchedAddressId": 27
        },
        {
          "title": "Cozy Apartment",
          "description": "A cozy apartment in a friendly neighborhood.",
          "price": "280000",
          "address": "2525 Cozy Lane, Philadelphia, PA",
          "latitude": 39.9526,
          "longitude": -75.1652,
          "fetchedAddressId": 28
        },
        {
          "title": "Contemporary Home",
          "description": "A modern home with clean lines and spacious interiors.",
          "price": "550000",
          "address": "2626 Contemporary Avenue, Seattle, WA",
          "latitude": 47.6062,
          "longitude": -122.3321,
          "fetchedAddressId": 29
        },
        {
          "title": "Historic Estate",
          "description": "A grand estate with historical significance.",
          "price": "1200000",
          "address": "2727 Historic Street, Richmond, VA",
          "latitude": 37.5407,
          "longitude": -77.4360,
          "fetchedAddressId": 30
        },
        {
          "title": "Luxury Residence",
          "description": "A high-end residence with premium features.",
          "price": "950000",
          "address": "2828 Residence Lane, San Diego, CA",
          "latitude": 32.7157,
          "longitude": -117.1611,
          "fetchedAddressId": 31
        },
        {
          "title": "Urban Studio",
          "description": "A chic studio apartment in a vibrant urban area.",
          "price": "300000",
          "address": "2929 Studio Road, Boston, MA",
          "latitude": 42.3601,
          "longitude": -71.0589,
          "fetchedAddressId": 32
        },
        {
          "title": "Countryside Cottage",
          "description": "A quaint cottage set in the peaceful countryside.",
          "price": "250000",
          "address": "3030 Cottage Lane, Indianapolis, IN",
          "latitude": 39.7684,
          "longitude": -86.1581,
          "fetchedAddressId": 33
        },
        {
          "title": "Chic Penthouse",
          "description": "A stylish penthouse with incredible views.",
          "price": "1750000",
          "address": "3131 Penthouse Avenue, San Francisco, CA",
          "latitude": 37.7749,
          "longitude": -122.4194,
          "fetchedAddressId": 34
        },
        {
          "title": "Beach Villa",
          "description": "A luxurious villa right by the beach.",
          "price": "2200000",
          "address": "3232 Villa Road, Honolulu, HI",
          "latitude": 21.3069,
          "longitude": -157.8583,
          "fetchedAddressId": 35
        },
        {
          "title": "Elegant Mansion",
          "description": "A sophisticated mansion with elegant designs.",
          "price": "2500000",
          "address": "3333 Mansion Drive, Los Angeles, CA",
          "latitude": 34.0522,
          "longitude": -118.2437,
          "fetchedAddressId": 36
        },
        {
          "title": "Historic Lodge",
          "description": "A lodge with a rich history and modern comforts.",
          "price": "400000",
          "address": "3434 Lodge Lane, Jackson Hole, WY",
          "latitude": 43.4799,
          "longitude": -110.7624,
          "fetchedAddressId": 37
        },
        {
          "title": "Seaside Retreat",
          "description": "A peaceful retreat with stunning seaside views.",
          "price": "850000",
          "address": "3535 Seaside Lane, Cape Cod, MA",
          "latitude": 41.6708,
          "longitude": -70.2910,
          "fetchedAddressId": 38
        },
        {
          "title": "Mountain Cabin",
          "description": "A cozy cabin nestled in the mountains.",
          "price": "500000",
          "address": "3636 Cabin Road, Park City, UT",
          "latitude": 40.6461,
          "longitude": -111.4980,
          "fetchedAddressId": 39
        },
        {
          "title": "Urban Apartment",
          "description": "A modern apartment in the heart of the city.",
          "price": "420000",
          "address": "3737 Urban Drive, Toronto, ON",
          "latitude": 43.6511,
          "longitude": -79.3470,
          "fetchedAddressId": 40
        },
        {
          "title": "Luxury Villa",
          "description": "A luxurious villa with premium features.",
          "price": "1800000",
          "address": "3838 Villa Avenue, Beverly Hills, CA",
          "latitude": 34.0697,
          "longitude": -118.4053,
          "fetchedAddressId": 41
        },
        {
          "title": "Chic Retreat",
          "description": "A stylish retreat with contemporary design.",
          "price": "550000",
          "address": "3939 Retreat Lane, Denver, CO",
          "latitude": 39.7392,
          "longitude": -104.9903,
          "fetchedAddressId": 42
        },
        {
          "title": "Historic Home",
          "description": "A home with historical charm and modern updates.",
          "price": "680000",
          "address": "4040 Heritage Street, Savannah, GA",
          "latitude": 32.0835,
          "longitude": -81.0998,
          "fetchedAddressId": 43
        },
        {
          "title": "Countryside Estate",
          "description": "A grand estate set in the countryside.",
          "price": "900000",
          "address": "4141 Estate Road, Richmond, VA",
          "latitude": 37.5407,
          "longitude": -77.4360,
          "fetchedAddressId": 44
        },
        {
          "title": "Urban Loft",
          "description": "A modern loft in an urban setting.",
          "price": "350000",
          "address": "4242 Loft Lane, Seattle, WA",
          "latitude": 47.6062,
          "longitude": -122.3321,
          "fetchedAddressId": 45
        },
        {
          "title": "Beach House",
          "description": "A beautiful house right on the beach.",
          "price": "750000",
          "address": "4343 Beachside Road, Santa Monica, CA",
          "latitude": 34.0194,
          "longitude": -118.4912,
          "fetchedAddressId": 46
        },
        {
          "title": "Mountain Lodge",
          "description": "A cozy lodge offering stunning mountain views.",
          "price": "650000",
          "address": "4444 Lodge Lane, Aspen, CO",
          "latitude": 39.1911,
          "longitude": -106.8175,
          "fetchedAddressId": 47
        },
        {
          "title": "Contemporary Home",
          "description": "A sleek, modern home with open spaces.",
          "price": "550000",
          "address": "4545 Modern Drive, Portland, OR",
          "latitude": 45.5152,
          "longitude": -122.6784,
          "fetchedAddressId": 48
        },
        {
          "title": "Luxury Apartment",
          "description": "An upscale apartment with high-end finishes.",
          "price": "900000",
          "address": "4646 Luxury Lane, Chicago, IL",
          "latitude": 41.8781,
          "longitude": -87.6298,
          "fetchedAddressId": 49
        },
        {
          "title": "Charming Loft",
          "description": "A charming loft with unique character.",
          "price": "275000",
          "address": "4747 Loft Road, New York, NY",
          "latitude": 40.7306,
          "longitude": -73.9352,
          "fetchedAddressId": 50
        }
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
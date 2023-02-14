const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10

        const camp = new Campground({
            author: '63e9b86b9eb24c0fa9f47cc4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            description: 'This is a good place!',
            price,
            images: [{
                url: 'https://res.cloudinary.com/dnjxwtqft/image/upload/v1676356387/YelpCamp/o5oxdnv1pi56afxh34el.jpg',
                filename: 'YelpCamp/o5oxdnv1pi56afxh34el',

            },
            {
                url: 'https://res.cloudinary.com/dnjxwtqft/image/upload/v1676356387/YelpCamp/mhgjwsatxq5wlt28kx0d.jpg',
                filename: 'YelpCamp/mhgjwsatxq5wlt28kx0d',

            }]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
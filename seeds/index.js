const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '675215989b2b9ffb0aadea40',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt obcaecati architecto placeat possimus eveniet inventore voluptatum maiores?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dskorlytk/image/upload/v1733530905/YelpCamp/epia07q5am4cgwoveicv.jpg',
                    filename: 'YelpCamp/epia07q5am4cgwoveicv'
                },
                {
                    url: 'https://res.cloudinary.com/dskorlytk/image/upload/v1733530905/YelpCamp/trfsgr5m9ec60yfsr9qa.jpg',
                    filename: 'YelpCamp/trfsgr5m9ec60yfsr9qa'
                }
            ]
        })
        await camp.save()

    }
}

seedDB().then(() => {
    mongoose.connection.close()
});
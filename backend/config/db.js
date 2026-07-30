const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use simple connection string for newer MongoDB versions
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel_booking');
        console.log('MongoDB Connected Successfully');
        
        // Create default data
        await createDefaultData();
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

const createDefaultData = async () => {
    try {
        // Check if we have taxi data
        const Taxi = require('../models/Taxi');
        const taxiCount = await Taxi.countDocuments();
        
        if (taxiCount === 0) {
            const defaultTaxis = [
                        
                {
                    type: 'economy',
                    name: 'Careem Go',
                    description: 'Toyota Corolla or similar - Affordable everyday rides',
                    capacity: 3,
                    luggage: 2,
                    pricePerKm: 1.2,
                    basePrice: 20,
                    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400'
                },
                {
                    type: 'standard',
                    name: 'UberX',
                    description: 'Honda Civic or similar - Comfortable standard rides',
                    capacity: 4,
                    luggage: 2,
                    pricePerKm: 1.5,
                    basePrice: 25,
                    image: 'https://images.pexels.com/photos/6474483/pexels-photo-6474483.jpeg?auto=compress&cs=tinysrgb&w=400'
                },
                {
                    type: 'comfort',
                    name: 'Bykea Ride',
                    description: 'Suzuki Swift or similar - Popular local ride service',
                    capacity: 3,
                    luggage: 2,
                    pricePerKm: 1.0,
                    basePrice: 15,
                    image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400'
                },
                {
                    type: 'premium',
                    name: 'Careem Premium',
                    description: 'Toyota Camry or similar - Enhanced comfort experience',
                    capacity: 4,
                    luggage: 3,
                    pricePerKm: 2.0,
                    basePrice: 35,
                    image: 'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=400'
                },
                {
                    type: 'family',
                    name: 'Uber Family',
                    description: 'Toyota Hiace or similar - Perfect for family trips',
                    capacity: 7,
                    luggage: 6,
                    pricePerKm: 2.5,
                    basePrice: 45,
                    image: 'https://images.pexels.com/photos/164654/pexels-photo-164654.jpeg?auto=compress&cs=tinysrgb&w=400'
                },
                {
                    type: 'luxury',
                    name: 'Blacklane',
                    description: 'Mercedes E-Class or similar - Professional chauffeur service',
                    capacity: 3,
                    luggage: 3,
                    pricePerKm: 3.5,
                    basePrice: 65,
                    image: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=400'
                },
                {
                    type: 'suv',
                    name: 'Careem SUV',
                    description: 'Toyota Fortuner or similar - Spacious SUV for groups',
                    capacity: 6,
                    luggage: 4,
                    pricePerKm: 2.8,
                    basePrice: 50,
                    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400'
                },
                {
                    type: 'business',
                    name: 'Uber Black',
                    description: 'BMW 5 Series or similar - Business class luxury',
                    capacity: 3,
                    luggage: 3,
                    pricePerKm: 4.0,
                    basePrice: 75,
                    image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=400'
                }

            ];
            
            await Taxi.insertMany(defaultTaxis);
            console.log('Default taxi data created');
        }
        const Flight = require('../models/Flight');

        if (await Flight.countDocuments() === 0) {
            await Flight.insertMany([
                { flightNumber: 'PIA001', airline: 'PIA', from: 'Karachi', to: 'Lahore', departureTime: '08:00', arrivalTime: '09:30', price: 120 },
                { flightNumber: 'AB001', airline: 'Air Blue', from: 'Karachi', to: 'Islamabad', departureTime: '10:00', arrivalTime: '11:45', price: 140 },
                { flightNumber: 'SA001', airline: 'Serene Air', from: 'Lahore', to: 'Karachi', departureTime: '13:00', arrivalTime: '14:30', price: 125 },
                { flightNumber: 'PIA002', airline: 'PIA', from: 'Islamabad', to: 'Lahore', departureTime: '15:00', arrivalTime: '16:00', price: 90 },
                { flightNumber: 'AS001', airline: 'Air Sial', from: 'Sialkot', to: 'Karachi', departureTime: '18:00', arrivalTime: '19:30', price: 130 },
                { flightNumber: 'AB002', airline: 'Air Blue', from: 'Lahore', to: 'Islamabad', departureTime: '20:00', arrivalTime: '21:00', price: 95 },
                { flightNumber: 'PIA003', airline: 'PIA', from: 'Karachi', to: 'Quetta', departureTime: '07:00', arrivalTime: '08:30', price: 110 },
                { flightNumber: 'SA002', airline: 'Serene Air', from: 'Multan', to: 'Lahore', departureTime: '09:00', arrivalTime: '10:00', price: 85 },
                { flightNumber: 'AB003', airline: 'Air Blue', from: 'Karachi', to: 'Peshawar', departureTime: '12:00', arrivalTime: '14:00', price: 150 },
                { flightNumber: 'PIA004', airline: 'PIA', from: 'Lahore', to: 'Quetta', departureTime: '17:00', arrivalTime: '18:30', price: 135 }
            ]);
            console.log('Default flight data created');
        }


        const CarRental = require('../models/CarRental');
        const carCount = await CarRental.countDocuments();

        if (carCount === 0) {
            const defaultCars = [
                {
                    name: 'Toyota Corolla',
                    type: 'Sedan',
                    capacity: 4,
                    luggage: 2,
                    pricePerDay: 50,
                    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dG95b3RhJTIwY29yb2xsYXxlbnwwfHwwfHx8MA%3D%3D',
                    available: true
                },
                {
                    name: 'Honda Civic',
                    type: 'Sedan',
                    capacity: 4,
                    luggage: 2,
                    pricePerDay: 55,
                    image: 'https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    available: true
                },
                {
                    name: 'Toyota Hiace',
                    type: 'Van',
                    capacity: 7,
                    luggage: 6,
                    pricePerDay: 80,
                    image: 'https://media.istockphoto.com/id/1036529282/photo/toyota-hiace.webp?s=1024x1024&w=is&k=20&c=qhcTSXZjetnzeIeC5X6__JMtTeddpN7gwoZPsL8vinI=',
                    available: true
                },
                {
                    name: 'BMW 5 Series',
                    type: 'Luxury',
                    capacity: 4,
                    luggage: 3,
                    pricePerDay: 120,
                    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    available: true
                },
                {
                    name: 'Mercedes-Benz C Class',
                    type: 'Luxury',
                    capacity: 4,
                    luggage: 3,
                    pricePerDay: 110,
                    image: 'https://images.unsplash.com/photo-1652549423957-d9c4445ee9bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVyY2VkZXMlMjBjJTIwY2xhc3N8ZW58MHx8MHx8fDA%3D',
                    available: true
                },
                {
                    name: 'Ford Ranger',
                    type: 'Pickup',
                    capacity: 4,
                    luggage: 4,
                    pricePerDay: 70,
                    image: 'https://images.unsplash.com/photo-1700943937372-12c2611b5af8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZCUyMHJhbmdlcnxlbnwwfHwwfHx8MA%3D%3D',
                    available: true
                },
                {
                    name: 'Nissan X-Trail',
                    type: 'SUV',
                    capacity: 5,
                    luggage: 4,
                    pricePerDay: 65,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjVhrjqVsIxlzV2DqZnv1m-LxpnWNerKffc18vMzhouwD877PW2TvTKmI&s',
                    available: true
                },
                {
                    name: 'Kia Sportage',
                    type: 'SUV',
                    capacity: 5,
                    luggage: 3,
                    pricePerDay: 60,
                    image: 'https://images.unsplash.com/photo-1649921777129-a28a26031a03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lhJTIwc3BvcnRhZ2V8ZW58MHx8MHx8fDA%3D',
                    available: true
                },
                {
                    name: 'Honda CR-V',
                    type: 'SUV',
                    capacity: 5,
                    luggage: 4,
                    pricePerDay: 68,
                    image: 'https://images.unsplash.com/photo-1623597780975-38ccd5030c83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9uZGElMjBjcnZ8ZW58MHx8MHx8fDA%3D',
                    available: true
                },
                {
                    name: 'Toyota Land Cruiser',
                    type: 'SUV',
                    capacity: 7,
                    luggage: 6,
                    pricePerDay: 150,
                    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    available: true
                },
                {
                    name: "Tesla Model 3",
                    type: "Electric",
                    capacity: 5,
                    luggage: 3,
                    pricePerDay: 90,
                    image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=400",
                    available: true
                },
                {
                    name: "Hyundai Tucson",
                    type: "SUV",
                    capacity: 5,
                    luggage: 4,
                    pricePerDay: 62,
                    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400",
                    available: true
                }
            ];

            await CarRental.insertMany(defaultCars);
            console.log('Default car data created (10 cars)');
        }

        // ======================
        // DEFAULT HOTELS
        // ======================
        const Hotel = require('../models/Hotel');
        const hotelCount = await Hotel.countDocuments();

        if (hotelCount === 0) {
            const defaultHotels = [
                                
                {
                    name: 'Pearl Continental Karachi',
                    city: 'Karachi',
                    description: 'Luxury hotel in the heart of Karachi with sea view',
                    pricePerNight: 180,
                    rating: 5,
                    availableRooms: 20,
                    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'
                },
                {
                    name: 'Avari Lahore',
                    city: 'Lahore',
                    description: 'Premium hotel near Mall Road with heritage charm',
                    pricePerNight: 150,
                    rating: 4.5,
                    availableRooms: 15,
                    image: 'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=800'
                },
                {
                    name: 'Serena Islamabad',
                    city: 'Islamabad',
                    description: 'Elegant hotel near diplomatic enclave with garden view',
                    pricePerNight: 200,
                    rating: 5,
                    availableRooms: 18,
                    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'
                },
                {
                    name: 'Hotel One Faisalabad',
                    city: 'Faisalabad',
                    description: 'Comfortable business hotel at affordable price',
                    pricePerNight: 90,
                    rating: 4,
                    availableRooms: 25,
                    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'
                },
                {
                    name: 'Movenpick Karachi',
                    city: 'Karachi',
                    description: 'Modern hotel with stunning Arabian Sea views',
                    pricePerNight: 220,
                    rating: 5,
                    availableRooms: 22,
                    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
                },
                {
                    name: 'Lahore Marriott',
                    city: 'Lahore',
                    description: 'International luxury hotel in city center',
                    pricePerNight: 190,
                    rating: 5,
                    availableRooms: 30,
                    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
                },
                {
                    name: 'Islamabad Marriott',
                    city: 'Islamabad',
                    description: 'Secure luxury hotel with excellent amenities',
                    pricePerNight: 210,
                    rating: 5,
                    availableRooms: 28,
                    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
                },
                {
                    name: 'Swat Serena Hotel',
                    city: 'Swat',
                    description: 'Beautiful mountain resort in scenic Swat Valley',
                    pricePerNight: 160,
                    rating: 4.5,
                    availableRooms: 16,
                    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800'
                }

            ];

            await Hotel.insertMany(defaultHotels);
            console.log('Default hotel data created');
        }

        // Check for attractions
        const Attraction = require('../models/Attraction');
        const attractionCount = await Attraction.countDocuments();
        
        if (attractionCount === 0) {
            const defaultAttractions = [
                {
                    name: 'Clifton Beach',
                    description: 'Famous beach in Karachi for sunset and camel rides.',
                    pricePerPerson: 10,
                    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                    location: 'Karachi'
                },
                {
                    name: 'Mohenjo-Daro',
                    description: 'Ancient archaeological site with historical significance.',
                    pricePerPerson: 15,
                    image: 'https://images.unsplash.com/photo-1601352834387-6f6b9fa8c3c1?w=800',
                    location: 'Sindh'
                },
                {
                    name: 'Faisal Mosque',
                    description: 'Iconic mosque in Islamabad, popular tourist attraction.',
                    pricePerPerson: 5,
                    image: 'https://images.unsplash.com/photo-1580584127654-0e9d1235c81b?w=800',
                    location: 'Islamabad'
                },
                {
                    name: 'Murree Hills',
                    description: 'Beautiful hill station with scenic views and hiking trails.',
                    pricePerPerson: 20,
                    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800',
                    location: 'Murree'
                },
                {
                    name: "Badshahi Mosque",
                    description: "One of the largest mosques in the world, built by Mughal Emperor Aurangzeb.",
                    pricePerPerson: 8,
                    image: "https://images.pexels.com/photos/4612439/pexels-photo-4612439.jpeg?auto=compress&cs=tinysrgb&w=800",
                    location: "Lahore"
                },
                {
                    name: "K2 Base Camp",
                    description: "Starting point for K2 expeditions with breathtaking mountain views.",
                    pricePerPerson: 100,
                    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
                    location: "Gilgit-Baltistan"
                },
                {
                    name: "Deosai Plains",
                    description: "Second highest plateau in the world, known as the Land of Giants.",
                    pricePerPerson: 50,
                    image: "https://images.pexels.com/photos/691034/pexels-photo-691034.jpeg?auto=compress&cs=tinysrgb&w=800",
                    location: "Skardu"
                },
                {
                    name: "Shahi Qila (Lahore Fort)",
                    description: "Historic fort complex with stunning Mughal architecture.",
                    pricePerPerson: 12,
                    image: "https://images.pexels.com/photos/4612440/pexels-photo-4612440.jpeg?auto=compress&cs=tinysrgb&w=800",
                    location: "Lahore"
                },
                {
                    name: "Hunza Valley",
                    description: "Paradise on earth with majestic mountains, lakes, and hospitable people.",
                    pricePerPerson: 40,
                    image: "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=800",
                    location: "Hunza"
                },
                {
                    name: "Mazar-e-Quaid",
                    description: "Final resting place of Muhammad Ali Jinnah, founder of Pakistan.",
                    pricePerPerson: 5,
                    image: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800",
                    location: "Karachi"
                },
                {
                    name: "Swat Valley",
                    description: "Known as the Switzerland of the East with lush green valleys and rivers.",
                    pricePerPerson: 35,
                    image: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800",
                    location: "Swat"
                },
                {
                    name: "Attabad Lake",
                    description: "Turquoise blue lake formed after a landslide, surrounded by mountains.",
                    pricePerPerson: 30,
                    image: "https://images.pexels.com/photos/2406388/pexels-photo-2406388.jpeg?auto=compress&cs=tinysrgb&w=800",
                    location: "Hunza"
                }
            ];
            
            await Attraction.insertMany(defaultAttractions);
            console.log('Default attraction data created');
        }
        
        console.log('All default data created successfully!');
        
    } catch (error) {
        console.error('Error creating default data:', error);
    }
};

module.exports = connectDB;
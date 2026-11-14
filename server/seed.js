const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Car = require("./Model/Car");
const User = require("./Model/User");
const Booking = require("./Model/Booking");

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/car_rental_db";

const initialCars = [
  {
    name: "Mercedes-Benz C-Class",
    category: "Luxury",
    seats: 5,
    fuel: "Petrol",
    year: 2024,
    model: "C300 AMG Line",
    milage: 14,
    price: 6500,
    transmission: true,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    about: "Uncompromising luxury and state-of-the-art agility. Features panoramic sunroof, ambient mood lighting, MBUX infotainment, and whisper-quiet performance.",
    status: true,
  },
  {
    name: "BMW 3 Series Gran Limousine",
    category: "Sedan",
    seats: 5,
    fuel: "Petrol",
    year: 2023,
    model: "330Li M Sport",
    milage: 16,
    price: 4800,
    transmission: true,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    about: "The ultimate driving machine with extended rear legroom, Harman Kardon surround audio, and exhilarating twin-turbocharged acceleration.",
    status: true,
  },
  {
    name: "Audi Q7 Quattro",
    category: "SUV",
    seats: 7,
    fuel: "Diesel",
    year: 2023,
    model: "55 TFSI Technology",
    milage: 12,
    price: 7200,
    transmission: true,
    image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80",
    about: "A commanding 7-seater luxury SUV designed for royalty. Equipped with legendary Quattro all-wheel drive, adaptive air suspension, and Matrix LED headlights.",
    status: true,
  },
  {
    name: "Tesla Model 3 Long Range",
    category: "Electric",
    seats: 5,
    fuel: "Electric",
    year: 2024,
    model: "Dual Motor AWD",
    milage: 26,
    price: 5200,
    transmission: true,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    about: "Experience next-generation electric acceleration (0-100 in 4.2s), full glass roof, futuristic touchscreen console, and ultra-smooth zero-emission cruising.",
    status: true,
  },
  {
    name: "Hyundai Creta SX (O)",
    category: "SUV",
    seats: 5,
    fuel: "Diesel",
    year: 2024,
    model: "1.5L CRDi Automatic",
    milage: 19,
    price: 2600,
    transmission: true,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    about: "India's highest rated compact SUV. Packed with panoramic sunroof, ventilated front seats, Bose premium sound system, and supreme highway stability.",
    status: true,
  },
  {
    name: "Mahindra Thar 4x4",
    category: "SUV",
    seats: 4,
    fuel: "Diesel",
    year: 2023,
    model: "LX Hard Top",
    milage: 14,
    price: 3200,
    transmission: false,
    image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80",
    about: "The iconic off-road conqueror. Built for rugged trails, mountainous terrain, and unforgettable roadtrips with convertible style and mechanical 4x4 transfer case.",
    status: true,
  },
  {
    name: "Toyota Camry Hybrid",
    category: "Sedan",
    seats: 5,
    fuel: "Petrol",
    year: 2023,
    model: "2.5 Dynamic Force Hybrid",
    milage: 23,
    price: 3800,
    transmission: true,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
    about: "The gold standard of executive reliability. Self-charging electric-gas hybrid synergy drive delivering supreme silence, plush leather seats, and high fuel economy.",
    status: true,
  },
  {
    name: "Tata Nexon EV Max",
    category: "Electric",
    seats: 5,
    fuel: "Electric",
    year: 2024,
    model: "Empowered+ Long Range",
    milage: 24,
    price: 2200,
    transmission: true,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    about: "5-Star GNCAP safety rated electric SUV with 453km real-world range, electronic parking brake, wireless charging, and whisper-quiet city driving.",
    status: true,
  },
  {
    name: "Maruti Suzuki Swift ZXi+",
    category: "Hatchback",
    seats: 5,
    fuel: "Petrol",
    year: 2023,
    model: "DualJet Smart Hybrid",
    milage: 22,
    price: 1300,
    transmission: false,
    image: "https://images.unsplash.com/photo-1590362891988-f778047831d0?auto=format&fit=crop&w=1200&q=80",
    about: "The agile city king. Effortless to maneuver through tight streets, easy to park, punchy acceleration, and phenomenal fuel economy.",
    status: true,
  },
  {
    name: "Ford Mustang GT Fastback",
    category: "Luxury",
    seats: 4,
    fuel: "Petrol",
    year: 2022,
    model: "5.0L Ti-VCT V8",
    milage: 9,
    price: 9500,
    transmission: true,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80",
    about: "Pure roaring adrenaline. 450 horsepower naturally aspirated V8 muscle car. Turns every head on the boulevard and delivers unforgettable highway thrill.",
    status: true,
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB at", MONGO_URL);

    // 1. Clear existing cars
    await Car.deleteMany({});
    console.log("Cleared old car records");

    // 2. Insert new pristine cars
    const createdCars = await Car.insertMany(initialCars);
    console.log(`Successfully seeded ${createdCars.length} cars into fleet!`);

    // 3. Seed or update Admin User
    let admin = await User.findOne({ email: "admin@cardrive.com" });
    if (!admin) {
      admin = new User({
        username: "DriveLuxe Admin",
        email: "admin@cardrive.com",
        password: "admin123",
        phone: "+91 98765 43210",
        role: "admin",
      });
      await admin.save();
      console.log("Created Admin account: admin@cardrive.com (pass: admin123)");
    } else {
      admin.role = "admin";
      await admin.save();
      console.log("Admin account confirmed: admin@cardrive.com");
    }

    // 4. Seed Customer User
    let customer = await User.findOne({ email: "alex@example.com" });
    if (!customer) {
      customer = new User({
        username: "Alex Rivera",
        email: "alex@example.com",
        password: "user123",
        phone: "+91 91234 56780",
        role: "customer",
      });
      await customer.save();
      console.log("Created Customer account: alex@example.com (pass: user123)");
    }

    // 5. Seed sample bookings if none exist
    const existingBookings = await Booking.countDocuments();
    if (existingBookings === 0 && customer && createdCars.length > 0) {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 3);

      const booking1 = new Booking({
        user: customer._id,
        car: createdCars[0]._id, // Mercedes
        startdate: today,
        returndate: nextWeek,
        price: createdCars[0].price,
        totalprice: createdCars[0].price * 3,
        status: "confirmed",
      });
      await booking1.save();

      const lastMonth = new Date(today);
      lastMonth.setDate(today.getDate() - 10);
      const lastMonthEnd = new Date(today);
      lastMonthEnd.setDate(today.getDate() - 7);

      const booking2 = new Booking({
        user: customer._id,
        car: createdCars[2]._id, // Audi Q7
        startdate: lastMonth,
        returndate: lastMonthEnd,
        price: createdCars[2].price,
        totalprice: createdCars[2].price * 3,
        status: "completed",
      });
      await booking2.save();

      console.log("Created sample bookings for demo visualization");
    }

    console.log("\nDATABASE SEED COMPLETE! Fleet is ready for commercial demo.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();

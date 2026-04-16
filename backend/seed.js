const { sequelize, User, Store } = require("./models");
const bcrypt = require("bcryptjs");

async function seed() {
  try {
    await sequelize.sync({ force: true }); // ⚠️ resets DB

    console.log("DB Reset Done");

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // 👤 USERS
    const admin = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      address: "Delhi",
      role: "admin",
    });

    const normalUser = await User.create({
      name: "Normal User",
      email: "user@gmail.com",
      password: hashedPassword,
      address: "Mumbai",
      role: "user",
    });

    const owner = await User.create({
      name: "Store Owner",
      email: "owner@gmail.com",
      password: hashedPassword,
      address: "Bangalore",
      role: "owner",
    });

    console.log("Users Created");

    // 🏪 STORES (linked to owner)
   await Store.bulkCreate([
  {
    name: "Reliance Smart Super Market Delhi",
    email: "reliance1@gmail.com",
    address: "Connaught Place, New Delhi, India",
    owner_id: owner.id,
  },
  {
    name: "Big Bazaar Mega Store Mumbai Central",
    email: "bigbazaar1@gmail.com",
    address: "Mumbai Central, Maharashtra, India",
    owner_id: owner.id,
  },
  {
    name: "D-Mart Retail Grocery Store Pune City",
    email: "dmart1@gmail.com",
    address: "Shivaji Nagar, Pune, Maharashtra",
    owner_id: owner.id,
  },
  {
    name: "Spencer Hyper Market Kolkata Main",
    email: "spencer1@gmail.com",
    address: "Salt Lake City, Kolkata, West Bengal",
    owner_id: owner.id,
  },
  {
    name: "EasyDay Fresh Grocery Store Lucknow",
    email: "easyday1@gmail.com",
    address: "Gomti Nagar, Lucknow, Uttar Pradesh",
    owner_id: owner.id,
  },
  {
    name: "Reliance Digital Electronics Store Noida",
    email: "reliance2@gmail.com",
    address: "Sector 18, Noida, Uttar Pradesh",
    owner_id: owner.id,
  },
  {
    name: "Big Bazaar Shopping Complex Bangalore",
    email: "bigbazaar2@gmail.com",
    address: "MG Road, Bangalore, Karnataka",
    owner_id: owner.id,
  },
  {
    name: "D-Mart Super Market Hyderabad Center",
    email: "dmart2@gmail.com",
    address: "Banjara Hills, Hyderabad, Telangana",
    owner_id: owner.id,
  },
  {
    name: "Spencer Daily Store Chennai Branch",
    email: "spencer2@gmail.com",
    address: "T Nagar, Chennai, Tamil Nadu",
    owner_id: owner.id,
  },
  {
    name: "EasyDay Retail Grocery Store Jaipur",
    email: "easyday2@gmail.com",
    address: "Vaishali Nagar, Jaipur, Rajasthan",
    owner_id: owner.id,
  },
  {
    name: "Reliance Fresh Super Market Gurgaon",
    email: "reliance3@gmail.com",
    address: "Cyber City, Gurgaon, Haryana",
    owner_id: owner.id,
  },
  {
    name: "Big Bazaar Family Store Ahmedabad",
    email: "bigbazaar3@gmail.com",
    address: "Navrangpura, Ahmedabad, Gujarat",
    owner_id: owner.id,
  },
  {
    name: "D-Mart Grocery Retail Store Indore",
    email: "dmart3@gmail.com",
    address: "Vijay Nagar, Indore, Madhya Pradesh",
    owner_id: owner.id,
  },
  {
    name: "Spencer Shopping Mall Store Bhopal",
    email: "spencer3@gmail.com",
    address: "MP Nagar, Bhopal, Madhya Pradesh",
    owner_id: owner.id,
  },
  {
    name: "EasyDay Grocery Market Chandigarh",
    email: "easyday3@gmail.com",
    address: "Sector 17, Chandigarh, India",
    owner_id: owner.id,
  },
  {
    name: "Reliance Smart Point Retail Kanpur",
    email: "reliance4@gmail.com",
    address: "Kalyanpur, Kanpur, Uttar Pradesh",
    owner_id: owner.id,
  },
  {
    name: "Big Bazaar Hyper Store Surat Gujarat",
    email: "bigbazaar4@gmail.com",
    address: "Adajan, Surat, Gujarat",
    owner_id: owner.id,
  },
  {
    name: "D-Mart Mega Grocery Store Nagpur City",
    email: "dmart4@gmail.com",
    address: "Sitabuldi, Nagpur, Maharashtra",
    owner_id: owner.id,
  },
  {
    name: "Spencer Retail Shopping Store Patna",
    email: "spencer4@gmail.com",
    address: "Boring Road, Patna, Bihar",
    owner_id: owner.id,
  },
  {
    name: "EasyDay Super Market Ranchi Jharkhand",
    email: "easyday4@gmail.com",
    address: "Main Road, Ranchi, Jharkhand",
    owner_id: owner.id,
  },
]);

    console.log("Stores Created");

    console.log("✅ SEEDING DONE SUCCESSFULLY");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
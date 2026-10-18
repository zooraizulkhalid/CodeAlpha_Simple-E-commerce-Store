const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");
const products = require("../FrontEnd/products.js");

async function seedProducts() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "void_district",
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected Successfully!");

    // Insert or update products without creating duplicates
    for (const product of products) {
      await Product.findOneAndUpdate(
        { id: product.id },
        { $set: product },
        {
          upsert: true,
          runValidators: true,
        }
      );
    }

    console.log(`${products.length} products seeded successfully!`);
  } catch (error) {
    console.error("Seeding Failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();

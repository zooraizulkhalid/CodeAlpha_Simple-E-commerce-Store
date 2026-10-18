
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: String,
    alt: String,
    category: String,
    badge: String,
    subtitle: String,
    description: String,
    details: String,
    fit: String,

    sizes: [String],

    sizeGuide: {
      columns: [
        {
          key: String,
          label: String,
        },
      ],

      measurements: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },
    },

    reviews: [
      {
        name: String,
        rating: Number,
        date: String,
        title: String,
        comment: String,
      },
    ],

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);

import data from "@/lib/data"; // Import data
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import UserModel from "@/lib/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { users, products } = data; // Destructure data

  try {
    await dbConnect();

    // Delete existing users and insert new users
    await UserModel.deleteMany();
    await UserModel.insertMany(users);

    // Delete existing products and insert new products
    await ProductModel.deleteMany();
    await ProductModel.insertMany(products);

    return NextResponse.json({
      message: 'Seeded Successfully',
      users,
      products,
    });
  } catch (error) {
    console.error(error); // Log any errors
    return NextResponse.json({
      message: 'Error seeding data',
    });
  }
};

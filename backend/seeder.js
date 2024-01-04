import mongoose  from "mongoose";
import dotenv from  "dotenv";
import colors from "colors";
import products from "./data/products.js";
import users from "./data/users.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"


dotenv.config();
connectDB();

const importData = async () =>{
    try {
     await User.deleteMany();
       await Order.deleteMany();
      await Product.deleteMany();
       
      const createUsers = await User.insertMany(users)
      const adminUser = createUsers[0]._id

      const sampleProducts = products.map((product)=>{
        return{ ...product,user:adminUser}
      })

      await Product.insertMany(sampleProducts);
      console.log('Data Imported!'.green.inverse);
      process.exit()
    } catch (error) {
      console.error(`${error}`.red.inverse)
      process.exit(1)
    }
}

const deleteData = async () =>{
    try {
     await User.deleteMany();
     await Order.deleteMany();
     await Product.deleteMany();
      console.log('Data Deleted!'.green.inverse);
      process.exit()
    } catch (error) {
      console.error(`${error}`.red.inverse)
      process.exit(1)
    }
}



if(process.argv[2]==='-d'){
    deleteData()
}else{
    importData()
}
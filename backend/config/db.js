import mongoose from 'mongoose'

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connection established at ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`An error occured while establishing connection ${error}`);
        process.exit(1);
    }
}
console.log(process.env.MONGO_URI)

export default connectDB
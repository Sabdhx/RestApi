import mongoose from "mongoose"
import { config } from "./config"


const databaseConnection=async()=>{
 try {

    mongoose.connection.on("connected" , ()=>{
        console.log("connected successfully")
    })



      mongoose.connection.on("error ",(err)=>{
        console.error("failed to load mongodb" ,err)

      })
      await mongoose.connect(config.mongooseUrl as string);

 } catch (error) {
   console.error("faied to load mongoose" , error);
   process.exit(1)
 }
}

export default databaseConnection
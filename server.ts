import app from "./src/app"
import { config } from "./src/config/config"
import databaseConnection from "./src/config/mongodb"

const listner =async ()=>{
    databaseConnection()
    app.listen(config.port , ()=>{
        console.log("server listening at the port "+ config.port)
    })

    
}

listner()
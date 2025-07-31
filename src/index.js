import { connectdb, sequelize } from "./db/connectdb.js";
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./env"
})

import { User } from "./models/user.model.js";
import { Team } from "./models/team.model.js";
import { Task } from "./models/task.model.js";
import { TeamMember } from "./models/teamMember.model.js";
import './models/models.relationships.js'
async function startDB(){
   await connectdb()
   await sequelize.sync()
   console.log("Database created successfully")
}

startDB()

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port", process.env.PORT)
})
import express from "express"
import cors from "cors"
import CookieParser from "cookie-parser"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: (origin,callback)=>{
        callback(null,origin)
    },
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//Routes
import userRouter from "./routes/user.routes.js";
app.use("/User", userRouter)
import authRouter from "./routes/auth.routes.js";
app.use("/Auth", authRouter);
import teamRouter from "./routes/team.routes.js"
app.use("/Team",teamRouter)
import teamMemberRouter from "./routes/teamMember.route.js"
app.use("/ManageTeam",teamMemberRouter)

import taskRouter from "./routes/task.routes.js"
app.use("/Task", taskRouter)

export default app
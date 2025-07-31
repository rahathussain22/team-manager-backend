import { User } from "../models/user.model.js";
import { APIError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const getAllUser = asyncHandler(async(req, res)=>{
    const users = await User.findAll()
    
    res.status(200).json({
        message: "Users Found",
        data: users
    })
    
})
export {getAllUser}
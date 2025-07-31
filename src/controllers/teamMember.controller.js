import { User } from "../models/user.model.js";
import { Team } from "../models/team.model.js";
import { TeamMember } from "../models/teamMember.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
const addTeamMember = asyncHandler(async (req, res) => {
    const { teamId, userId, role } = req.body;

    // Step 1: Validate input
    if (!userId || !teamId || !role) {
        throw new APIError(400, "Please provide userId, teamId, and role");
    }

    // Step 2: Fetch user and their current team membership
    const user = await User.findOne({
        where: { id: userId },
        include: {
            model: TeamMember,
            as: 'memberOf'
        }
    });

    if (!user) {
        throw new APIError(404, "User not found");
    }

    // Step 3: Check if already a member of a team
    if (user.memberOf) {
        throw new APIError(409, "User is already in a team");
    }

    // Step 4: Add user to the team
    const newMember = await TeamMember.create({
        userId,
        teamId,
        role
    });

    // Step 5: Respond with success
    res.status(201).json({
        message: "User added to the team successfully",
        teamMember: newMember
    });
});
const removeTeamMember = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    // Step 1: Validate input
    if (!userId) {
        throw new APIError(400, "Please provide userId");
    }

    // Step 2: Find the team member entry
    const teamMember = await TeamMember.findOne({
        where: { 
                userId:userId }
    });

    if (!teamMember) {
        throw new APIError(404, "User is not part of this team");
    }
    // Step 3: Delete the team membership
    await teamMember.destroy();
    // Step 4: Respond with success
    res.status(200).json({
        message: "User removed from the team successfully"
    });
});

const getMembers = asyncHandler(async (req, res)=>{
    const{teamId}=req.params
    if(!teamId){
        throw new APIError(400,"Please provide team id")
    }
    const members= await TeamMember.findAll({
        where:{
            teamId:teamId
        },
        include: [
            {
                model: Team,
                as: 'teamAssigned'
            },
            {
                model: User,
                as: 'member'
            }
        ]
    })
    if(!members){
        throw new APIError(404, "No member Found in this team")
    }
    res.status(200).json({
        message:"Members find successful",
        data:members
    })
})


export { addTeamMember, removeTeamMember, getMembers }
import { Task } from "../models/task.model.js";
import { APIError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
const createTask = asyncHandler(async (req, res) => {

    const { name, createdBy, deadline, assignedTo } = req.body;

    if (!name || !createdBy || !deadline) {
        throw new APIError(400, "Please add the required information");
    }

    await Task.create({
        name,
        createdBy,
        assignedTo: assignedTo ? assignedTo : null,
        deadline: new Date(deadline)
    });

    res.status(200).json({
        message: " Task Successfully created"
    })

})
const assignTask = asyncHandler(async (req, res) => {
    const { taskId, teamId } = req.body;

    if (!taskId || !teamId) {
        throw new APIError(400, "Please provide both task ID and Team ID to assign");
    }

    // Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
        throw new APIError(404, "Task not found");
    }

    // Check if the task is already assigned to the same team
    if (task.assignedTo === teamId) {
        throw new APIError(400, "Task is already assigned to this team");
    }

    // Update task's assignedTo field
    task.assignedTo = teamId;
    await task.save();

    res.status(200).json({
        message: "Task successfully assigned to the team",
        task
    });
});
const deleteTask = asyncHandler(async (req, res) => {
    const { taskId, userId } = req.body;

    // Step 1: Validate input
    if (!taskId || !userId) {
        throw new APIError(400, "Please provide both taskId and userId");
    }

    // Step 2: Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
        throw new APIError(404, "Task not found");
    }

    // Step 3: Check if the requester is the creator
    if (task.createdBy !== userId) {
        throw new APIError(403, "Only the creator of the task can delete it");
    }

    // Step 4: Delete the task
    await task.destroy();

    res.status(200).json({
        message: "Task deleted successfully",
    });
});


const updateTask = asyncHandler(async (req, res) => {
    const { name, deadline, assignedTo, taskId } = req.body;

    if (!taskId) {
        throw new APIError(400, "Please provide task ID");
    }

    // Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
        throw new APIError(404, "Task not found");
    }

    // Update fields
    if (name) task.name = name;
    if (deadline) task.deadline = new Date(deadline);
    if (assignedTo !== undefined) task.assignedTo = assignedTo; // check for null/undefined

    await task.save();
    res.status(200).json({
        message: "Task Updated Successfully"
    })
})

const getAllTasks = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        throw new APIError(400, "User ID is required");
    }

    const userWithTasks = await User.findOne({
        where: { id: userId },
        include: [
            {
                model: Task,
                as: 'totalCreatedTasks'
            }
        ]
    });

    if (!userWithTasks) {
        throw new APIError(404, "User not found");
    }

    const userObj = userWithTasks.toJSON();

    if (userObj.totalCreatedTasks.length === 0) {
        throw new APIError(404, "No tasks found for this user");
    }

    // Optional: remove sensitive info
    delete userObj.password;
    delete userObj.refreshtoken;

    res.status(200).json({
        message: "Success",
        data: userObj.totalCreatedTasks
    });
});


const getUncompletedTasks = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        throw new APIError(400, "User ID missing");
    }
    const user = await User.findOne({
        where: { id: userId },
        include: [
            {
                model: Task,
                as: 'totalCreatedTasks',
                where: { iscompleted: false },
                attributes: ['id', 'name', 'assignedTo', 'createdBy', 'deadline', 'iscompleted'], // Specify the task details you want
            }
        ]
    });

    if (!user) {
        throw new APIError(404, "No user found with this id");
    }

    // Extract the tasks from the user object
    const userTasks = user.totalCreatedTasks;

    if (userTasks.length === 0) {
        throw new APIError(404, "No uncompleted tasks found for this user");
    }
    res.status(200).json({
        message: "Success",
        data: userTasks,
    });
});

export { createTask, deleteTask, updateTask, assignTask, getAllTasks, getUncompletedTasks }
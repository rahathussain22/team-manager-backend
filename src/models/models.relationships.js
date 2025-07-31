import { Team } from "./team.model.js";
import { User } from "./user.model.js";
import { Task } from "./task.model.js";
import { TeamMember } from "./teamMember.model.js";


Team.belongsTo(User, {foreignKey: 'createdBy', as: 'owner' } )
User.hasMany(Team, {foreignKey: 'createdBy', as: 'teamsCreated' } )

Task.belongsTo(Team, {foreignKey: 'assignedTo', as: 'teamAssigned'})
Team.hasMany(Task, {foreignKey: 'assignedTo', as : 'assignedTasks'})

Task.belongsTo(User, {foreignKey: 'createdBy', as: 'taskCreatedBy'})
User.hasMany(Task, {foreignKey: 'createdBy', as: 'totalCreatedTasks'})

TeamMember.belongsTo(Team, {foreignKey: 'teamId', as: 'teamAssigned'})
Team.hasMany(TeamMember, {foreignKey: 'teamId'})

TeamMember.belongsTo(User, { foreignKey: 'userId', as : 'member' });
User.hasOne(TeamMember, { foreignKey: 'userId', as : 'memberOf' }); 

export { User, Team, TeamMember, Task };

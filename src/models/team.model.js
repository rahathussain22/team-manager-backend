import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connectdb.js';
import { TeamMember } from './teamMember.model.js';
const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.INTEGER,
  }
}, {
  timestamps: true,
});

Team.beforeDestroy(async (team, options) => {
  await TeamMember.destroy(
    {
      where: {
        teamId: team.id
      },
      transaction: options.transaction
    }
  )
})

export { Team }

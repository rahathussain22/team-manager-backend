import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connectdb.js';

const TeamMember = sequelize.define('TeamMember', {
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export {TeamMember}

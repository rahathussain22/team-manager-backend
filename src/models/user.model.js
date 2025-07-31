import { DataTypes,  } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {sequelize} from '../db/connectdb.js';


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refreshtoken: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  timestamps: true
});

// ✅ Method to validate password
User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Method to generate Access token
User.prototype.generateAccessToken = function () {
  const token = jwt.sign(
    { 
      _id: this._id, 
      email: this.email ,
      name: this.name
      
    },
    process.env.ACCESS_TOKEN ,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // or '30d'
  );
  this.accesstoken = token;
  return token;
};
// Method to generate refresh token
User.prototype.generateRefreshToken = function () {
  const token = jwt.sign(
    { id: this.id, email: this.email },
    process.env.REFRESH_TOKEN ,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // or '30d'
  );
  this.refreshtoken = token;
  return token;
};

export { User };

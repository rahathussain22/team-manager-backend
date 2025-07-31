import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_URI,
  {
    dialect: "postgres",
    dialectOptions:{
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

export { connectdb, sequelize };

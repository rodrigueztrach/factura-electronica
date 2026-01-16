import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";  

const Cliente = sequelize.define("Cliente", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: "clientes",
  timestamps: false
});

export default Cliente;

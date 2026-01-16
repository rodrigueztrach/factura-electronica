import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";  

const Producto = sequelize.define("Producto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM("producto", "servicio"),
    allowNull: false,
    defaultValue: "producto"
  },
  estado: {
    type: DataTypes.ENUM("activo", "inactivo"),
    allowNull: false,
    defaultValue: "activo"
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "productos",
  timestamps: false
});

export default Producto;

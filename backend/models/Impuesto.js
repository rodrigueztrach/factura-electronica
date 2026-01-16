import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Impuesto = sequelize.define("Impuesto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_impuesto: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  porcentaje: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: "configuracion_impuestos",
  timestamps: false
});

export default Impuesto;

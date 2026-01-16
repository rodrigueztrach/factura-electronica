import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";  // ← IMPORT CORRECTO
import Cliente from "./Cliente.js";

const Factura = sequelize.define("Factura", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clienteId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: "id"
    }
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: "facturas",
  timestamps: false
});

Cliente.hasMany(Factura, { foreignKey: "clienteId" });
Factura.belongsTo(Cliente, { foreignKey: "clienteId" });

export default Factura;

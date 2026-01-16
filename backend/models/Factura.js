import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cliente from "./Cliente.js";

const Factura = sequelize.define("Factura", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_factura: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: "id"
    }
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  subtotal: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  impuestos: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM("pendiente","pagada","cancelada"),
    defaultValue: "pendiente"
  }
}, {
  tableName: "facturas",
  timestamps: false
});

Cliente.hasMany(Factura, { foreignKey: "id_cliente" });
Factura.belongsTo(Cliente, { foreignKey: "id_cliente" });

export default Factura;

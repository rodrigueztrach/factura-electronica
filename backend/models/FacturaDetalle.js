import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Factura from "./Factura.js";
import Producto from "./Producto.js";

const FacturaDetalle = sequelize.define("FacturaDetalle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_factura: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Factura,
      key: "id"
    },
    onDelete: "CASCADE"
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: "id"
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: "detalle_factura",
  timestamps: false
});

// Relaciones
Factura.hasMany(FacturaDetalle, { foreignKey: "id_factura", onDelete: "CASCADE" });
FacturaDetalle.belongsTo(Factura, { foreignKey: "id_factura" });

Producto.hasMany(FacturaDetalle, { foreignKey: "id_producto" });
FacturaDetalle.belongsTo(Producto, { foreignKey: "id_producto" });

export default FacturaDetalle;

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

console.log("Conectando a la base de datos en:", process.env.DB_HOST);

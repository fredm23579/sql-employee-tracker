const mysql = require('mysql2');
// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

try {
    // Create a connection pool
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    // Export the pool
    module.exports = pool.promise();
} catch (error) {
    console.error('Error creating connection pool:', error);
}

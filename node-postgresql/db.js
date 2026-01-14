const { Pool } = require("pg");


function oss () {
    return "oss"
};


async function connection() {
    if (global.connection) {
        return global.connection.connect();
    };

    const pool = new Pool ({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    const res = await client.query("select now()");
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;

    return pool.connect();
};

module.exports = {
    oss
};
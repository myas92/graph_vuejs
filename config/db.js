const neo4jModule = require('neo4j-driver')
require('dotenv').config()
let neo4jDriver;

// connect to the neo4j database with username & password
function configurationNeo4j() {
    try {
        const { DB_URL, DB_USERNAME, DB_PASSWORD } = process.env;
        if (!DB_URL || !DB_USERNAME || !DB_PASSWORD) {
            throw new Error('Please config .env(DB_URL, DB_USERNAME, DB_PASSWORD)')
        }
        const config = {
            maxTransactionRetryTime: 30000,
            maxConnectionPoolSize: 50,
            maxConnectionLifetime: 100000
        }
        const driver = neo4jModule.driver(DB_URL, neo4jModule.auth.basic(DB_USERNAME, DB_PASSWORD), config);
        neo4jDriver = driver;
        console.log('Connected to database')
    } catch (error) {
        console.error("Neo4j Database Error: ", error.message)
    }
}
// Return Neo4j client
function neo4j() {
    return neo4jDriver
}

module.exports = {
    configurationNeo4j,
    neo4j
}

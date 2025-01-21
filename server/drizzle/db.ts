import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const client = new Client({
    connectionString: process.env.DATABASE_URL // e.g. "postgresql://user:pass@localhost:5432/db"
});
client.connect();

export const db = drizzle(client);
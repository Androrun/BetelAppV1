import pg from 'pg'

export const pool = new pg.Pool({
    port: 5432,
    host: 'kala.db.elephantsql.com',
    user: 'byxyrpin',
    password: '7zbwSPqB02RugLpt_KTDWzzqT6wGVlXe',
    database: 'byxyrpin'
})

pool.on('connect', () => {
    console.log("Database connected");
});
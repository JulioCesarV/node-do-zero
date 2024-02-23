import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS videos`.then(() => {
//     console.log('Tabela apagada!')
// })

sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER
);
`.then(() => { // Esse ".then()" foi utilizado para que a execução aguarde a criação da tabela
    console.log('Tabela criada')
})
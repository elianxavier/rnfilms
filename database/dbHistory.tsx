import * as SQLite from "expo-sqlite"; // [1]

// Declarar 'db' fora da função para que seja acessível globalmente (ou passada como parâmetro)
let db: SQLite.SQLiteDatabase | null = null; // Informação não das fontes: 'db' precisa ser acessível globalmente.

async function initializeDatabase() {
  try {
    db = await SQLite.openDatabaseAsync("rnfilms.db"); // [2, 3]
    // Habilitar o modo de journal WAL é uma boa prática para desempenho [4]
    await db.execAsync("PRAGMA journal_mode = WAL;"); // [2, 4, 5]
    console.log("Banco de dados 'rnfilms.db' aberto com sucesso.");

    // Criar a tabela após o banco de dados ser aberto
    await createTable();
    console.log("Tabela 'films' verificada/criada.");
  } catch (error) {
    console.error("Erro ao abrir ou inicializar o banco de dados:", error);
  }
}

// Cria a tabela se não existir
export const createTable = async () => {
  if (!db) {
    console.error("Banco de dados não está inicializado.");
    return;
  }
  // db.execAsync é adequado para DDL (CREATE TABLE) [2, 5]
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS films (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      film_id INTEGER
    );
  `);
};

// Inserir um filme
export const saveOnHistoryBKP = async (film_id: number) => {
  if (!db) {
    console.error("Banco de dados não está inicializado.");
    return;
  }
  // db.runAsync para INSERTs [2, 6, 10]
  const result = await db.runAsync("INSERT INTO films (film_id) VALUES (?);", [
    film_id,
  ]);
  console.log(
    `Filme ${film_id} salvo. ID: ${result.lastInsertRowId}, Changes: ${result.changes}`
  ); // [2, 14, 15]
};

export const saveOnHistory = async (film_id: number) => {
  if (!db) {
    console.error("Banco de dados não está inicializado.");
    return;
  }

  // Insere o novo filme
  const result = await db.runAsync("INSERT INTO films (film_id) VALUES (?);", [
    film_id,
  ]);
  console.log(
    `Filme ${film_id} salvo. ID: ${result.lastInsertRowId}, Changes: ${result.changes}`
  );

  // Deleta os mais antigos, mantendo só os 20 mais recentes
  await db.runAsync(`
    DELETE FROM films
    WHERE id NOT IN (
      SELECT id FROM films
      ORDER BY id DESC
      LIMIT 20
    );
  `);
};

// Buscar todos os filmes
export const getFilms = async () => {
  if (!db) {
    console.error("Banco de dados não está inicializado.");
    return [];
  }
  // db.getAllAsync para SELECT * [2, 6, 8]
  const films = await db.getAllAsync<{ id: number; film_id: number }>(
    "SELECT DISTINCT film_id FROM ( SELECT * FROM films ORDER BY id DESC );"
  );
  return films;
};

// Deletar todos (exemplo)
export const deleteHistory = async () => {
  if (!db) {
    console.error("Banco de dados não está inicializado.");
    return;
  }
  // db.runAsync para DELETEs [2, 6, 10]
  const result = await db.runAsync("DELETE FROM films;");
  console.log(`Histórico deletado. Changes: ${result.changes}`); // [2, 14, 15]
};

// Chame a função para inicializar o banco de dados
initializeDatabase();

// Exemplo de uso (chame estas funções após o initializeDatabase ser concluído)
// (async () => {
//   await initializeDatabase(); // Certifique-se de que o DB esteja aberto
//   await saveOnHistory(123);
//   const films = await getFilms();
//   console.log("Filmes no histórico:", films);
// })();

const pool = require('./db');

const insertData = async (data) => {
    const { nome, idade, endereco, cpf, valor_pago, data_nascimento } = data;
    const query = {
      text: `
        INSERT INTO pagamentos (nome, idade, endereco, cpf, valor_pago, data_nascimento)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `,
      values: [nome, idade, endereco, cpf, valor_pago, data_nascimento]
    };

    try {
        const result = await pool.query(query);
        console.log("Resultado da inserção:", result);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir dados', err);
        throw err;
    }
  };

const getData = async () => {
  const query = 'SELECT * FROM pagamentos;';

  try {
    const result = await pool.query(query); 
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const deleteData = async (id) => {
    const query = 'DELETE FROM pagamentos WHERE id = $1 RETURNING *';

    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            return { error: 'Dados não encontrados' };
        }
        return { message: 'Dados deletados com sucesso' };
    } catch (err) {
        console.error('Erro ao deletar dados', err);
        throw err;
    }
};

const updateData = async (id, data) => {
    const { nome, idade, endereco, cpf, valor_pago, data_nascimento } = data;
    console.log(data);
    
    const query = {
        text: `
        UPDATE pagamentos
        SET nome = $1, idade = $2, endereco = $3, cpf = $4, valor_pago = $5, data_nascimento = $6
        WHERE id = $7
        RETURNING *;
        `,
        values: [nome, idade, endereco, cpf, valor_pago, data_nascimento, id] 
    };

    try {
        const result = await pool.query(query);
        if (result.rowCount === 0) {
            return { error: 'Dados não encontrados' };
        }
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao atualizar dados', err);
        throw err;
    }
};

const getPaginatedData = async (page, limit) => {
    const offset = (page - 1) * limit;
    try {
      const result = await pool.query(
        'SELECT * FROM pagamentos ORDER BY id LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      const countResult = await pool.query('SELECT COUNT(*) FROM pagamentos');
      const totalItems = parseInt(countResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalItems / limit);
      return {
        data: result.rows,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalItems,
        },
      };
    } catch (err) {
      console.error('Error executing query', err.stack);
      throw err;
    }
  };

module.exports = {
  insertData,
  getData,
  deleteData,
  updateData,
  getPaginatedData
};
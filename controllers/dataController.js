const { insertData, getData, deleteData, updateData } = require('../models/dataModel');

const createData = async (req, res) => {
  try {
    const data = req.body;
    const newData = await insertData(data);
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar dados' });
  }
};

const fetchData = async (req, res) => {
  try {
    const allData = await getData();
    res.status(200).json(allData);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }

};

const deleteDataHandler = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await deleteData(id);
      if (result.error) {
        return res.status(404).json(result);
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar dados' });
    }
  };


  const patchData = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = req.body;

    try {
        const result = await updateData(id, data);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar dados' });
    }
};

module.exports = {
  createData,
  fetchData,
  deleteDataHandler,
  patchData,
};
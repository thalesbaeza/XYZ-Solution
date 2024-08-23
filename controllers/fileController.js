const multer = require('multer');
const fs = require('fs');
const { insertData, getData } = require('../models/dataModel');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path')
const { format } = require('date-fns');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer upload do arquivo' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    try {
      const data = req.file.buffer.toString('utf-8');
      const records = parseRemFile(data);
      for (const record of records) {
        await insertData(record);
      }

      res.status(200).json({ message: 'Arquivo processado com sucesso' });
    } catch (error) {
      console.error('Erro ao processar o arquivo', error);
      res.status(500).json({ error: 'Erro ao processar o arquivo' });
    }
  });
};

const parseRemFile = (data) => {
  const records = [];
  const lines = data
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => line.replace(/\x00/g, ''))
    .map(line => line.replace(/[\uFFFD]/g, ''))
    .map(line => line.replace(/\r/g, ''));

  for (const line of lines) {
    const record = {
      nome: line.substring(0, 15).trim(),
      idade: parseInt(line.substring(15, 19).trim(), 10),
      endereco: line.substring(19, 53).trim(),
      cpf: line.substring(53, 64).trim(),
      valor_pago: parseFloat(line.substring(64, 80).trim()) / 100,
      data_nascimento: formatDate(line.substring(80, 90).trim())
    };
    records.push(record);
  }

  return records;
};

const formatDate = (dateString) => {
  if (dateString.length === 8) {
    return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}`;
  }
  return dateString;
};

const exportDataToCSV = async (req, res) => {
try {
    const data = await getData();

    const formattedData = data.map(record => {
    return {
        ...record,
        data_nascimento: format(new Date(record.data_nascimento), 'yyyy-MM-dd') 
    };
});

    const csvWriter = createObjectCsvWriter({
    path: './downloads/data_export.csv',
    header: [
        { id: 'nome', title: 'Nome' },
        { id: 'idade', title: 'Idade' },
        { id: 'endereco', title: 'Endereco' },
        { id: 'cpf', title: 'CPF' },
        { id: 'valor_pago', title: 'Valor Pago' },
        { id: 'data_nascimento', title: 'Data de Nascimento' }
    ]
});

    await csvWriter.writeRecords(formattedData);

    res.download('./downloads/data_export.csv');
} catch (err) {
    res.status(500).json({ error: 'Error exporting data to CSV' });
}
};

module.exports = {
    exportDataToCSV,
    uploadFile,
}
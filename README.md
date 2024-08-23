# XYZ Solution

XYZ Solution é uma aplicação Node.js que processa arquivos `.rem`, armazena dados em um banco de dados PostgreSQL e permite o upload de arquivos via API. Todo o ambiente de desenvolvimento está configurado usando Docker.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso](#uso)
- [Endpoints da API](#endpoints-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Insomnia](#configuração-do-insomnia)

## Pré-requisitos

Antes de começar, você precisará ter o Docker e o Docker Compose instalados em sua máquina. Você pode baixar e instalar o Docker [aqui](https://www.docker.com/get-started) e o Docker Compose [aqui](https://docs.docker.com/compose/install/).

## Instalação e Configuração

Siga as etapas abaixo para configurar o projeto localmente usando Docker:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/thalesbaeza/XYZ-Solution.git
   cd XYZ-Solution

2. **Construa as imagens no Docker:**

    docker-compose build

3. **Inicie os contêineres:**

    docker-compose up

# Estrutura do Projeto

## A estrutura do projeto é organizada da seguinte maneira:

   ```
   XYZ-Solution/
   │
   ├── downloads/
   │   └── data_export.csv       # Diretório para exportar arquivos
   │
   ├── uploads/                 # Diretório para armazenar uploads de arquivos
   │   └── pagamentos_20231011.rem  # Exemplo de arquivo .rem
   │
   ├── routes/
   │   ├── fileRoutes.js        # Rotas para upload de arquivos
   │   └── dataRoutes.js        # Rotas para manipulação de dados
   │
   ├── controllers/
   │   ├── fileController.js    # Lógica para upload e processamento de arquivos
   │   └── dataController.js    # Lógica para manipulação de dados
   │
   ├── models/
   │   └── dataModel.js         # Modelo para manipulação dos dados do arquivo
   │
   ├── insomnia/
   │   └── Insomnia_2024-08-23.json  # Importar JSON no Insomnia para ter acesso aos endpoints
   │
   ├── .gitignore               # Arquivos e diretórios ignorados pelo Git
   ├── docker-compose.yml       # Arquivo de configuração do Docker Compose
   ├── Dockerfile               # Dockerfile para configurar o contêiner Node.js
   ├── package.json             # Gerenciador de dependências Node.js
   ├── app.js                   # Arquivo principal da aplicação
   └── README.md                # Documentação do projeto
   ```

# Configurando o Insomnia

1. **Importando a Configuração**
    * Abra o Insomnia e vá para o menu "Workspace".
    * Selecione "Import/Export".
    * Escolha a aba "Import Data".
    * Selecione "From File" e importe o arquivo Insomnia_2024-08-23.json localizado na pasta insomnia/.

2. **Criando um Novo Espaço de Trabalho e Coleção**
    * No Insomnia, crie um novo espaço de trabalho ou use um existente.
    * Crie uma nova coleção chamada "XYZ Solution API" para organizar as requisições.

3. **Adicione as Requisições**

# Endpoints

1. **Criar Dados**

    * Método HTTP: POST
    * URL: http://localhost:3000/api/data/
    * Configuração do Corpo: Selecione JSON e adicione o seguinte payload:

``` json
{
  "nome": "João",
  "idade": 25,
  "endereco": "Rua A, 123",
  "cpf": "12345678900",
  "valor_pago": 100.50,
  "data_nascimento": "1999-01-01"
}
```

2. **Buscar Dados**
    * Método HTTP: GET
    * URL: http://localhost:3000/api/data/

3. **Excluir Dados por ID**
    * Método HTTP: DELETE
    * URL: http://localhost:3000/api/data/:id
    * Substitua :id pelo ID do registro que deseja excluir (por exemplo, http://localhost:3000/api/data/1).

4. **Atualizar Dados por ID**
    * Método HTTP: PATCH
    * URL: http://localhost:3000/api/data/:id
    * Substitua :id pelo ID do registro que deseja atualizar (por exemplo, http://localhost:3000/api/data/1).
    * Configuração do Corpo: Selecione JSON e adicione o campo que deseja atualizar:
      
``` json
{
  "endereco": "Rua B, 456"
}
```
5. **Upload de Arquivos**
    * Método HTTP: POST
    * URL: http://localhost:3000/api/files/upload
    * Configuração do Corpo: Selecione Form Data e adicione um campo:
    * Chave: file
    * Valor: Selecione um arquivo .rem do seu sistema.

6. **Exportar Dados para CSV**
    * Método HTTP: GET
    * URL: http://localhost:3000/api/files/export

# Configurando Timeout no Insomnia
    * Para aumentar o tempo limite das requisições para 5 minutos:

        * No Insomnia, clique no ícone de engrenagem no canto inferior direito.
        * Selecione "Preferences".
        * Vá para a aba "Network".
        * Ajuste o valor de "Request Timeout" para 300000 milissegundos (5 minutos).
        * Clique em "Save" para aplicar as alterações.
        * Essa documentação deve ajudar a configurar o Insomnia para testar os endpoints da API conforme a estrutura do seu projeto.

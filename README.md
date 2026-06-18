# 🎬 Catálogo de Filmes API REST

API REST desenvolvida com Node.js, Express e MySQL para gestão de filmes e séries.

---

# 🚀 Tecnologias utilizadas

* Node.js
* Express
* MySQL
* mysql2/promise
* dotenv

---

# 📦 Instalação

## Clonar o repositório

```bash
git clone https://github.com/albertmoliveira88-ux/catalogo-filmes.git
```

## Entrar na pasta do projeto

```bash
cd catalogo-filmes
```

## Instalar dependências

```bash
npm install
```

---

# ⚙️ Configuração

Criar um ficheiro `.env` na raiz do projeto:

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=catalogo_filmes
```

---

# 🗄️ Base de dados

Abrir o ficheiro:

```txt
database.sql
```

Executar o script completo no MySQL Workbench.

O script:

* cria a base de dados;
* cria a tabela `filmes`;
* insere dados iniciais.

---

# ▶️ Executar o servidor

Modo desenvolvimento:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Servidor disponível em:

```txt
http://localhost:3000
```

---

# 📌 Endpoints

| Método | Endpoint                | Descrição              |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/estado`           | Verifica estado da API |
| GET    | `/api/filmes`           | Lista todos os filmes  |
| GET    | `/api/filmes/:id`       | Obter filme por ID     |
| POST   | `/api/filmes`           | Criar filme            |
| PUT    | `/api/filmes/:id`       | Atualizar filme        |
| PATCH  | `/api/filmes/:id/visto` | Alternar estado visto  |
| DELETE | `/api/filmes/:id`       | Remover filme          |

---

# 🧪 Exemplo JSON

## POST / PUT

```json
{
  "titulo": "Interstellar",
  "realizador": "Christopher Nolan",
  "genero": "ficcao",
  "ano": 2014,
  "tipo": "filme",
  "avaliacao": 5
}
```

---

# ✅ Funcionalidades

* CRUD completo
* Integração com MySQL
* Validação de dados
* Tratamento de erros
* API RESTful

---

# 📁 Estrutura do projeto

```txt
catalogo-filmes/
│
├── server.js
├── database.sql
├── package.json
├── package-lock.json
├── .env.example
├── README.md
└── .gitignore
```

---

# 👨‍💻 Autor

Albert Oliveira

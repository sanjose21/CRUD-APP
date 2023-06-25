This is an example of a full-stack application using Create, Read, Update, and Delete (CRUD) operations with Vue.js, MongoDB, PostgreSQL (VMP).

To start the application, follow these steps:

**Setting up Environment Variables:**
1. Clone the repository to your local machine.
2. Create a `.env` file at the root of the project and add the following variables:

```bash
# Global variables
DATABASENAME=inventory
DATABASEUSER=admin
DATABASEPASSWORD=password

# API environment variables
APIPORT=3000
DBHOST=localhost

# UI environment variables
UIPORT=3001
```

**Setting up Docker:**
1. Create a `docker-compose.yml` file (an example can be found in the project's root directory) with the following content:

```yml
services:
  db:
    image: postgres
    container_name: db
    env_file:
      - .env
    restart: always
    ports:
      - 5432:5432
    volumes:
      - ./db:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=${DATABASEUSER}
      - POSTGRES_DB=${DATABASENAME}
      - POSTGRES_PASSWORD=${DATABASEPASSWORD}
```
2. Run `docker-compose up -d` to start the Docker service.

**Setting up and Starting the API/UI servers**

1. Run 'npm run app'

**Shutting down the API/UI servers**

1. Run 'npm run close
   '

**Note:**
The UI will be accessible at `http://localhost:3001`.
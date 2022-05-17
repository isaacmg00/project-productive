# project-productive

## Mac/Linux development environment

navigate to a directory where you want to store project files

```sh
git clone https://github.com/isaacmg00/project-productive
cd project-productive
cd client
npm install
npm i react-scripts
cd ..
cd server
npm install
```

start the react app dev server. make sure you're in the client/ directory

```sh
npm start
```

start the backend (not required to run react). make sure you're in the server/ directory this time

```sh
npm start
```

# Setup/Install PostgreSQL Database
### Install: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads 
### Install guide: https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql-macos/
Once you have installed PostgreSQL, navigate to ```server/db/postgresDB.sql``` and copy the commands seen there to create the database along with its tables. Additionally, create a file, ```index.js``` inside of the db folder that contains your db credentials. 

```
const { Pool } =  require("pg");
const db =  new  Pool({
	user:  "<your user>",
	database:  "comp484_final",
	password:  "<password>",
	port:  5432,
	host:  "localhost",
});
module.exports  = { db }
```
After that, the backend should be all set up. 

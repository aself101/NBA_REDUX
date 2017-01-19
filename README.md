# NBA Redux

#### Personal project pulling NBA stats and data.

##### Includes boxscores from any date
##### Current standings
##### Current tankathon
##### Player profiles
##### Team listing


### Stack
#### Front-end

- ReactJS
- Redux
- React-router

#### Back-end
- ExpressJS
- MySQL
- LevelDB
- Authentication with: Passport & JSON-Web Tokens


## Dependencies
##### MySQL
##### Node JS

## Server
##### Create an auth database and import the sql file
##### Run the nba-chron script to populate leveldb instances
```
mysql -u [username] -p auth < auth.sql
yarn install
node nba-chron.js
npm run dev
```
## Client
```
yarn install
npm start
```


## Create a user account to access NBA dashboard profile

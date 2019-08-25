## Description

Small social network for developers build with Node, Express and MySQL for back-end and React, Redux and Bootstrap for front-end.

You can create profile with education and experience, view others profile, make comments and delete them...

View live demo <a href="https://devnet12.herokuapp.com/">here</a> or go to "Installation and Usage" and follow the instructions to install and use.

## Technologies & Tools

### Front-end:
* React
* Redux
* Bootstrap
* Axios

### Backend:
* Node
* MySQL
* Express
* Passport

## Installation and Usage

### Requirements:
* Node.js installed

I have used XAMPP for database server. Informations for creating MySQL tables are in sql folder.

### Quick start: 
1. Install server-side dependencies:
```
$ cd server
$ npm install
```
2. Install client-side dependencies:
```
$ cd client
$ npm install
```
3. In server/config create a keys.js with:<br/>
```
module.exports = {
  secretOrKey: "YOUR_OWN_SECRET",
  mysqlInfo: {
    host: 'YOUR_LOCALHOST',
    user: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
    port: YOUR_PORT,
    database: 'YOUR_DATABASE_NAME'
  }
};
```
4. Start your client
```
$ cd client
$ npm run start
```
5. Start your server
```
$ cd server
$ npm run server
```

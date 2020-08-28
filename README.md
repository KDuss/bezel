# Bezel

Bezel is a web based tool, which enables explorative search on the web.


## Getting Started
Prerequest: [MongoDB](https://www.mongodb.com/download-center/community), [Node](https://nodejs.org/en/) version >= 14 and [NPM](https://www.npmjs.com/) are installed.

First clone the project:
```bash
git clone https://github.com/KDuss/bezel.git
npm install
```

### Start application
First run database:
 ```bash
   mongod --dbpath <path database store>
 ```
 Then start application:
 ```bash
   npm run run
 ```
### Testing
To trigger the tests you have to run the application and direct to:
 ```
   domain/test
 ```
Default domain for this project is localhost:8000


For full documentation, visit the **[developer documentation](https://www.algolia.com/doc/api-client/getting-started/install/javascript/)**.





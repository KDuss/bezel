![alt logo](/resources/bezel-logo.png)



Bezel is a web application that allows users to browse through datasets using faceted search.

For the full documentation, visit the **[developer documentation](https://kduss.github.io/bezel/)**.


## Getting Started
### Prerequisites

* [MongoDB](https://www.mongodb.com/download-center/community)

* [Node](https://nodejs.org/en/) version >= 14 
* [NPM](https://www.npmjs.com/)

Clone the project and install the dependencies:
```bash
git clone https://github.com/KDuss/bezel.git
npm install
```

### Start application
Run the database:
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
   {domain}/test
 ```
Default domain for this project is localhost:8000

### Sample Datasets

You can find sample facet descriptions for the following datasets in the folder ``public/facetDescriptions``.

* Tennis matches: https://www.kaggle.com/jordangoblet/atp-tour-20002016 
* Flight delays: https://www.kaggle.com/usdot/flight-delays?select=flights.csv



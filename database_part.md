# MongoDB

MongoDB is used as the default database.

## Configure MongoDB

You can create a new database instance for the new dataset.

Start the MongoDB:

```
mongod --dbpath <Pfad zum Ordner wo Daten abgelegt werden können>
```
 Create new database:

```
mongo
use DATABASE_NAME
```
Read in .csv or other data formats:

```
mongoimport --db=<DATABASE_NAME> --type=csv --headerline --file=<SOURCE>
```
 Check that the data has been added correctly:

```bash
> use DATABASE_NAME
switched to db DATABASE_NAME
> db.<COLLECTION_NAME>.find()
{ "_id" : ObjectId("5e87982aafd6d6fb8fbceb9e"), "ID" : 2, "Name" : "Muster1", "Land" : "Deutschland" }
{ "_id" : ObjectId("5e87982aafd6d6fb8fbceb9f"), "ID" : 3, "Name" : "Muster2", "Land" : "Schweiz" }
{ "_id" : ObjectId("5e87982aafd6d6fb8fbceba0"), "ID" : 1, "Name" : "Muster13", "Land" : "Schweiz" }
```
For other data formats see [mongoimport](https://docs.mongodb.com/manual/reference/program/mongoimport/).



**Important**: Don't forget to update the database and collection name in the config file.

More information about the usage of MongoDB with Node can be found [here](https://docs.mongodb.com/drivers/node).


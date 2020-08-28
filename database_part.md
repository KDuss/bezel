# MongoDB

MongoDB is used ad default database in this project.

## Configure MongoDB

If you want you can create a new database instance for the new dataset.
Therefore you have first to run mongodb:

```
   mongod --dbpath <Pfad zum Ordner wo Daten abgelegt werden können>
```
   And then a new databse name can be set with:

```
   mongo
   use DATABASE_NAME
```
Now you can read in csv or other data formats:

```
   mongoimport --db=<DATABASE_NAME> --type=csv --headerline --file=<SOURCE>
```
   With a quick check you can proof if the data had been read in correctly:
   
```bash
   > use DATABASE_NAME
   switched to db DATABASE_NAME
   > db.<COLLECTION_NAME>.find()
   { "_id" : ObjectId("5e87982aafd6d6fb8fbceb9e"), "ID" : 2, "Name" : "Muster1", "Land" : "Deutschland" }
   { "_id" : ObjectId("5e87982aafd6d6fb8fbceb9f"), "ID" : 3, "Name" : "Muster2", "Land" : "Schweiz" }
   { "_id" : ObjectId("5e87982aafd6d6fb8fbceba0"), "ID" : 1, "Name" : "Muster13", "Land" : "Schweiz" }
```
   For other data formats see [mongoimport](https://docs.mongodb.com/manual/reference/program/mongoimport/).

After that the correct DATABASE_NAME and COLLECTION_NAME have to be set in the config file.
  
More information about the usage of MongoDB with Node can be found [here](https://docs.mongodb.com/drivers/node) 


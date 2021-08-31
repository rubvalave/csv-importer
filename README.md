# csv-importer
Small CSV importer app.


## How to start
Basic requirements:
Node version required for tests: 12+
Postman


Just ***npm install*** every dependency and run ***npm run infra:up*** to create your own dockerized apps.

## How to use
After setting up the dockers you will find two apps in ports 8000 and 8100 of your local host that will be posting-app and getting-app respectively.

### Posting-App

Using Postman just do a POST request to http/localhost:8000/create-from-csv
 ![Posting app info](https://github.com/rubander/csv-importer/blob/02e09f7343e0c30f30b5dbbe3f55f3271266b2b2/assets/images/posting-app-upload-example.PNG)

Use the "emmissions.csv" file from sample-files folder and choose form-data and a "file" name for the field when doing the POST request.

The endpoint has validation for the headers in the CSV file, so it must follow what the "emmissions.csv" file specifies. (There is another file in this folder used for tests that will throw an error).


### Tests
Some basic tests were included for the posting app. Just run ***npm run test*** at the root level of the project to see the combination of Mocha and Chai working at what they do best. (Spoiler: not coffee and tea
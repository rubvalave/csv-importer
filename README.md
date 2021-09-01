# csv-importer
Small CSV importer app.


## How to start
Basic requirements:
Node version required for tests: 12+
Postman
Docker 3+

1. Git clone this repo
2. ***npm install***
3. ***npm run infra:up***

## How to use
After setting up Docker you will find two apps in ports 8000 and 8100 of your local host that will be posting-app and getting-app respectively.

### Posting-App
Using Postman just do a POST request to http://localhost:8000/create-from-csv
 ![Posting app info](https://github.com/rubander/csv-importer/blob/02e09f7343e0c30f30b5dbbe3f55f3271266b2b2/assets/images/posting-app-upload-example.PNG)

Use the "emmissions.csv" or "bigemmissions.csv" files from sample-files folder and choose form-data and a "file" name for the field when doing the POST request.

The endpoint has validation for the headers in the CSV file, so it must follow what the "emmissions.csv" or "bigemmissions.csv" file specifies. (There is another file in this folder used for tests that will throw an error).


### Getting-App
Using Postman just do a GET request to http://localhost:8100/
 ![Getting app info](https://github.com/rubander/csv-importer/blob/ff9b91d12ed8f848dc67187118b305d6ead0069c/assets/images/getting-app-query-example.PNG)

And experiment with filters! You can see everything that can be used in the Postman screenshot above but just in case here is a list and how to use them:

1. country: Country in the files provided are composed of three letters as a definition for every country. In this query it uses free text search only for this field, so anything you include should try to find matches among this three letters field.
2. sector: Same as country with the difference of having longer strings.
3. parentSector: Same as sector.
4. orderBy: Sorting for dummies! Just add the field you want to order followed by a dot and the method for sorting ('asc' and 'des') and voilà! Example: country.des, 2001.asc, parentSector.asc, etc.
5. yearAmount: Do you want to find which years have specific amounts of emmissions? Or those with more than a specific amount? You can do it now following this pattern: year,method,amount. However, just a couple of notes because regex are hard: the amount needs to include the decimal numbers even if it is just 0 otherwise it will fail spectacularly. Examples: 1945,gte,12.0  1991,lt,0.52 2011,eq,132.0
6. searchTerm: Do you want to search for a record but can only remember some letters in any of the strings? Don't worry with searchTerm we got you covered. This query param will try to find any match in any of the string-based fields in the schema (country, sector and parentSector) so for example a query with "ind" will look either for the country India as for Industrial in any of the other fields.


### Tests
Some basic tests were included for the posting app. Just run ***npm run test*** at the root level of the project to see the combination of Mocha and Chai working at what they do best. (Spoiler: not coffee and tea)

# food_recommendation

## Setup

You need to install 

  - Docker: https://docs.docker.com/install/
  - Docker-Compose: https://docs.docker.com/compose/install/
  
After instaling docker and docker-compose you need to run the command `make up`. 

Running `make up` would start the **nodejs** and the **postgres** container.

Once the postgres container is up you need to run `make db` to create the `food_recommendation` database.

After that you need to run `make migrate` to create the following database tables/schema necessary for the app:

1. Hotel - name
2. Dish - name, price and hotel_id(foreign_key)
3. User - firstName, lastName, email, password
4. HotelUser - hotel_id(foreign_key), user_id(foreign_key)

Next run `make seed` which will populate the database with 2 users, 2 hotels and 2 dishes.

## Curl Requests

### Login

User 1

`curl -i -X POST -H "Content-Type: application/json" -d '{ "email": "john@lalaland.com","password":"yipeekayak"}' localhost:3000/api/login`

User2

`curl -i -X POST -H "Content-Type: application/json" -d '{ "email": "jake@brooklyn.com","password":"notadoctor"}' localhost:3000/api/login`
    
Response

``` javascript
    {
      "auth":true,
      "token: {
        "id":4,
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUyMDI2MTIzLCJleHAiOjE1NTIxMTI1MjN9.I-K7Zge7o2lsvspqNfuHzEXsjgtKwlfIZBNp3KlPHGw",
        "user_id":1,
        "updatedAt":"2019-03-08T06:22:03.775Z",
        "createdAt":"2019-03-08T06:22:03.775Z"
      }
    }
```

### Get Dish
```
curl -i -X DELETE -H "Content-Type: application/json" -H "x-access-token: <your-token-here>" localhost:3000/api/dishes/1
```

### Create Dish
```
curl -i -X POST -H "Content-Type: application/json" -H "x-access-token:<your-token-here>" -d '{"name": "hakunamatata3","hotel_id":1}' localhost:3000/api/dishes/
```

### Update Dish
```
curl -i -X PUT -H "ConteOST-Type: application/json" -H "x-access-token:<your-token-here>" -d '{"name": "hakunamatata1",hotel_id:1}' localhost:3000/api/dishes/
```

### Delete Dish
```
curl -i -X DELETE -H "Content-Type: application/json" -H "x-access-token:<your-token-here>" localhost:3000/api/dishes/9
```
### List Dishes
```
curl -i -H "Content-Type: application/json" -H "x-access-token:<your-token-here>" localhost:3000/api/dishes/
```
### List Hotels
```
curl -i -H "Content-Type: application/json" -H "x-access-token: " localhost:3000/api/hotel/
```

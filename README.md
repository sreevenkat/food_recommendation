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

```
curl -i -X POST -H "Content-Type: application/json" -d '{ "email": "john@lalaland.com","password":"yipeekayak"}' localhost:3000/api/login
```

User2

```
curl -i -X POST -H "Content-Type: application/json" -d '{ "email": "jake@brooklyn.com","password":"notadoctor"}' localhost:3000/api/login
```
    
Response

``` javascript
    {
      "auth":true,
      "token": {
        "id":4,
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUyMDI2MTIzLCJleHAiOjE1NTIxMTI1MjN9.I-K7Zge7o2lsvspqNfuHzEXsjgtKwlfIZBNp3KlPHGw",
        "user_id":1,
        "updatedAt":"2019-03-08T06:22:03.775Z",
        "createdAt":"2019-03-08T06:22:03.775Z"
      }
    }
```

### List Dishes

```
curl -i -H "Content-Type: application/json" -H "x-access-token: <your-token-here>" localhost:3000/api/dishes/
```

Response

```
[
  {
    "id":2,
    "name":"Mushroom",
    "hotel_id":1,
    "price":null,
    "createdAt":"2019-03-08T03:25:17.530Z",
    "updatedAt":"2019-03-08T03:25:17.530Z",
    "Hotel":{
      "id":1,
      "name":"Hotel E",
      "createdAt":"2019-03-08T03:25:17.501Z",
      "updatedAt":"2019-03-08T03:25:17.501Z"
    }
  },
  .
  .
  .
]
```

### Get Dish
```
curl -i -H "Content-Type: application/json" -H "x-access-token: <your-token-here>" localhost:3000/api/dishes/1
```

Response
```
{
  "id":2,
  "name":"Mushroom",
  "hotel_id":1,
  "price":null,
  "createdAt":"2019-03-08T03:25:17.530Z",
  "updatedAt":"2019-03-08T03:25:17.530Z",
  "Hotel":{
    "id":1,
    "name":"Hotel E",
    "createdAt":"2019-03-08T03:25:17.501Z",
    "updatedAt":"2019-03-08T03:25:17.501Z"
  }
}
```

### Create Dish
```
curl -i -X POST -H "Content-Type: application/json" -H "x-access-token:<your-token-here>" -d '{"name": "hakunamatata3","hotel_id":1}' localhost:3000/api/dishes/
```

Response
```
{
  "id":18,
  "hotel_id":1,
  "name":"hakunamatata3",
  "updatedAt":"2019-03-08T01:26:14.542Z",
  "createdAt":"2019-03-08T01:26:14.542Z",
  "price":null
}
```


### Update Dish
```
curl -i -X PUT -H "ConteOST-Type: application/json" -H "x-access-token:<your-token-here>" -d '{"name": "hakunamatata1",hotel_id:1}' localhost:3000/api/dishes/
```

Response

```
{
  "id":1,
  "name":"hakunamatata1",
  "hotel_id":1,
  "price":null,
  "createdAt":"2019-03-07T07:14:44.401Z",
  "updatedAt":"2019-03-08T01:22:05.006Z",
  "Hotel":{
    "id":1,
    "name":"Hotel A",
    "createdAt":"2019-03-07T07:14:44.339Z",
    "updatedAt":"2019-03-07T07:14:44.339Z"
   }
}
```

### Delete Dish
```
curl -i -X DELETE -H "Content-Type: application/json" -H "x-access-token:<your-token-here>" localhost:3000/api/dishes/9
```

Response: 204 No content

### List Hotels
```
curl -i -H "Content-Type: application/json" -H "x-access-token: " localhost:3000/api/hotel/
```

Response
```
[
  {
    "id":2,
    "name":"Hotel B",
    "createdAt":"2019-03-08T07:21:58.531Z",
    "updatedAt":"2019-03-08T07:21:58.531Z",
    "dishes":[{
      "id":1,
      "name":"hakunamatata1",
      "hotel_id":1,
      "price":null,
      "createdAt":"2019-03-07T07:14:44.401Z",
      "updatedAt":"2019-03-08T01:22:05.006Z",
     },
     .
     .
    ]
  },
  .
  .
  .
]
```

What I couldn't do but would do in the next iteration

1. Finish the kubernetes build i was trying to get working
2. Switch to FeathersJS to convert this app into a microservices architecture 

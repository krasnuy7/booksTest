# Install

1) Install MongoDB (https://docs.mongodb.com/manual/administration/install-community/)

2) Install server & client dependencies ```npm i && cd client && npm i && cd ../```

3) Install node-mongo-seeds ```npm i -g node-mongo-seeds```

4) Seed database ```seed```

5) Run dev server ```npm start```


# Project

Front-end is located in ```client``` directory (note that client dependencies are separated from server)
```npm start``` runs both server and client

# Task

Your goal is to develop book collections web app.

Collection and books are represented as json objects:

```
// Collection
{
    "name": "Collection name",
    "description": "Books collection description",
    "books": [...] // list of books
}

// Book
{
    "name": "Book name",
    "author": "Book Author",
    "price": 100,
    "rating": 5 // optional
}
```

Required features:

* Display list of collections

* Display single collection with included books

* Edit collection data

* Add/Remove Book from collection

* Rate book

* Create book and collection forms (as popups)

* Using Redux for state management

* Using Redux-Saga or Redux-Observable for managing side effects


Nice-to-haves:

* styled-components

* react-router v4


Visual part is not so important and totally up to you.
You can use any CSS Framework or React Components lib

# Api

### Collections
```
GET /api/collections - get collections list
```
```
POST /api/collections - create new collection
params: {
    "name", <- String, required
    "description" <- String, required
}
```
```
GET /api/collections/:id - get collection
```
```
DELETE /api/collections/:id - delete collection
```
```
PUT /api/collections/:id - edit collection
params: {
    "name", <- String
    "description" <- String
}
```
```
POST /api/collections/:collectionId/books - add book to collection
params: {
    "bookId", <- String, required
}
```
```
DELETE /api/collections/:collectionId/books/:bookId - remove book from collection
```

### Books

```
GET /api/books/ - get books list
```
```
POST /api/books - create new book
params: {
    "name", <- String, required
    "author", <- String, required
    "price", <- Number, required
    "rating" <- Number [0-5], optional
}
```
```
GET /api/books/:id - get book
```
```
DELETE /api/books/:id - delete book
```
```
PUT /api/books - edit book
params: {
    "name", <- String
    "author", <- String
    "price", <- Number
    "rating" <- Number [0-5]
}
```
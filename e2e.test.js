const app = require('./app');
const supertest = require('supertest');
const request = supertest(app);
const messageCode = require('./helpers/messageCode');
const { it } = require('@jest/globals');

it('POST: Posts book to BOOKS array success', done => {
    request.post('/book').send({
        "book": "Prisoner of Birth"
    }).expect(200, {
        status: 201,
        ...messageCode.BOOK_ADDED_SUCCESSFULLY
    }, done)
});

it('POST: Posts book to BOOKS array with empty book name', done => {
    request.post('/book').send({
        "book": ""
    }).expect(200, {
        "status": 422,
        "code": "VALIDATION_ERROR",
        "message": "\"book\" is not allowed to be empty"
    }, done)
});

it('POST: Posts book to BOOKS array when book is already present', done => {
    request.post('/book').send({
        "book": "Prisoner of Birth"
    }).expect(200, {
        status: 400,
        ...messageCode.BOOK_ALREADY_PRESENT
    }, done)
});

it('GET: Get all books success', done => {
    request.get('/book')
    .expect(200, {
        books: [
            "Prisoner of Birth"
        ]
    }, done)
});

it('GET: Get book by id success', done => {
    request.get('/book/' + 0)
    .expect(200, {
        book: "Prisoner of Birth"
    }, done)
})

it('GET: Get book by id failure', done => {
    request.get('/book/' + 200)
    .expect(200, {
        status: 404,
        ...messageCode.BOOK_NOT_FOUND
    }, done)
})

it('PATCH: Update book successful', done => {
    request.patch('/book').send({
        "original_book": "Prisoner of Birth",
        "new_book": "Harry Potter"
    }).expect(200, {
        status:204,
        ...messageCode.BOOK_REPLACED_SUCCESSFULLY
    }, done)
})

it('PATCH: Update book failure when book name is not available in the array', done => {
    request.patch('/book').send({
        "original_book": "Prisoner of Birth",
        "new_book": "Twilight"
    }).expect(200, {
        status: 404,
        ...messageCode.BOOK_NOT_FOUND
    }, done)
})

it('PATCH: Update book failure when new book name is already present in the array', done => {
    request.patch('/book').send({
        "original_book": "Harry Potter",
        "new_book": "Harry Potter"
    }).expect(200, {
        status: 400,
        ...messageCode.BOOK_ALREADY_PRESENT
    }, done)
})

it('PATCH: Update book failure when orginal_book is empty', done => {
    request.patch('/book').send({
        "original_book": "",
        "new_book": "Twilight"
    }).expect(200, {
        "status": 422,
        "code": "VALIDATION_ERROR",
        "message": "\"original_book\" is not allowed to be empty"
    }, done)
})

it('PATCH: Update book failure when new_book is empty', done => {
    request.patch('/book').send({
        "original_book": "Twilight",
        "new_book": ""
    }).expect(200, {
        "status": 422,
        "code": "VALIDATION_ERROR",
        "message": "\"new_book\" is not allowed to be empty"
    }, done)
})

it('PATCH: Update book failure when both the fields are empty', done => {
    request.patch('/book').send({
        "original_book": "",
        "new_book": ""
    }).expect(200, {
        "status": 422,
        "code": "VALIDATION_ERROR",
        "message": "\"original_book\" is not allowed to be empty. \"new_book\" is not allowed to be empty"
    }, done)
})


it('DELETE: Delete book success', done => {
    request.delete('/book').send({
        "book": "Harry Potter"
    })
    .expect(200, {
        status: 204,
        ...messageCode.BOOK_DELETED_SUCCESSFULLY
    }, done)
})

it('DELETE: Delete book failure', done => {
    request.delete('/book').send({
        "book": "Twilight"
    })
    .expect(200, {
        status: 404,
        ...messageCode.BOOK_NOT_FOUND
    }, done)
})

it('DELETE: Delete book failure when book name is not present', done => {
    request.delete('/book').send({
        "book": ""
    })
    .expect(200, {
        "status": 422,
        "code": "VALIDATION_ERROR",
        "message": "\"book\" is not allowed to be empty"
    }, done)
})

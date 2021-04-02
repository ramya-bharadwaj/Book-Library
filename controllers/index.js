const { Books } = require('./../models');
const messageCode = require('./../helpers/messageCode');

const BOOKS = [];

const addBooks = (req, res, next) => {
    const book = req.body.book;
    if(!BOOKS.includes(book)) {
        BOOKS.push(book);
        res.json({
            status: 201,
            ...messageCode.BOOK_ADDED_SUCCESSFULLY
        }).status(201);
    } else {
        next({
            status: 400,
            ...messageCode.BOOK_ALREADY_PRESENT
        });
    }
}

const getAllBooks = (req, res, next) => {
    res.json({
        books: BOOKS
    }).status(200);
}

const getBookById = (req, res, next) => {
    const id = parseInt(req.params.id);
    if(typeof(BOOKS[id]) !== 'undefined') {
        res.json({
            book: BOOKS[id]
        }).status(200)
    } else {
        next({
            status:404,
            ...messageCode.BOOK_NOT_FOUND
        })
    }
}

const deleteBook = (req, res, next) => {
    const book = req.body.book;
    if(BOOKS.includes(book)) {
        BOOKS.splice(BOOKS.indexOf(book),1)
        res.status(200).json({
            status: 204,
            ...messageCode.BOOK_DELETED_SUCCESSFULLY
        })
    } else {
        next({
            status: 404,
            ...messageCode.BOOK_NOT_FOUND
        })
    }
}

const updateBook = (req, res, next) => {
    const reqObj = req.body;
    if(BOOKS.includes(reqObj.original_book)) {
        if(!BOOKS.includes(reqObj.new_book)) {
            BOOKS[BOOKS.indexOf(reqObj.original_book)] = reqObj.new_book
            res.status(200).json({
                status:204,
                ...messageCode.BOOK_REPLACED_SUCCESSFULLY
            })
        } else {
            next({
                status: 400,
                ...messageCode.BOOK_ALREADY_PRESENT
            })
        }
    } else {
        next({
            status: 404,
            ...messageCode.BOOK_NOT_FOUND
        })
    }
}

module.exports = { addBooks, getAllBooks, getBookById, deleteBook, updateBook };
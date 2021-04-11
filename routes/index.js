const { Router } = require('express');
const { bookValidation, updateBookValidation } = require('./../helpers/validation');
const { addBooks, getAllBooks, getBookById, deleteBook, updateBook, putBook } = require('./../controllers');

const router = Router();

router.post('/', bookValidation, addBooks);

router.get('/', getAllBooks);

router.patch('/', updateBookValidation, updateBook);

router.delete('/', bookValidation, deleteBook);

router.get('/:id', getBookById);

router.put('/', putBook);

module.exports = router;

import { Request, Response } from 'express';
import { route, GET, POST, PATCH, DELETE, before } from 'awilix-router-core';
import { IBookService } from '../services/BookService';
import { IBookDTO, IBookRequestDTO } from '../dtos/book';
import { IHttpHandler } from './shared/HttpHandler';
import { IBookArrayResponseDTO } from './../dtos/book';

@route('/books')
export class BookController {
    constructor(
        private readonly bookService: IBookService,
        private readonly httpHandler: IHttpHandler
    ) { }

    @GET()
    async getAll() {
        const booksOrFailure = await this.bookService.getAllBooks();

        return booksOrFailure.isFailure ? (
            this.httpHandler.fromResultError(booksOrFailure)
        ) : (
            this.httpHandler.ok({ books: booksOrFailure.value } as IBookArrayResponseDTO)
        );
    }

    @route('/:id')
    @GET()
    async getById(req: Request, res: Response) {
        return this.httpHandler.ok('Action Not Implemented');
    }

    @POST()
    async create(req: Request) {
        const bookDTO = req.body as IBookRequestDTO;
        const result = await this.bookService.createBook(bookDTO);

        return result.isFailure ? (
            this.httpHandler.fromResultError(result)
        ) : (
            this.httpHandler.ok()
        );
    }

    @route('/:id')
    @DELETE()
    delete(req: Request, res: Response) {
        return this.httpHandler.ok('Action Not Implemented');
    }

    @route('/:id')
    @PATCH()
    async update(req: Request, res: Response) {
        const bookUpdatesDTO = req.body.book as Partial<IBookDTO>;
        const result = await this.bookService.updateBookById(req.params.id, bookUpdatesDTO);

        return result.isFailure ? (
            this.httpHandler.fromResultError(result)
        ) : (
            this.httpHandler.ok()
        )
    }
}

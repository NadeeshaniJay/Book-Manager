import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { AddBook } from '../models/addbook';

@Injectable({
  providedIn: 'root',
})

export class BookService {
  private apiUrl = 'http://localhost:5013/api/Books';

  constructor(private http: HttpClient) {}

  getAllBooks() : Observable <Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: Book): Observable<AddBook> {
    return this.http.post<AddBook>(`${this.apiUrl}`, book);
  }

  updateBook(id: number, book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

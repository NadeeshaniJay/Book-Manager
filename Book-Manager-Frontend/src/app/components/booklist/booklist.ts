import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/bookservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bookform } from "../bookform/bookform";

@Component({
  selector: 'app-booklist',
  imports: [CommonModule, FormsModule, Bookform],
  templateUrl: './booklist.html',
  styleUrl: './booklist.css'
})

export class Booklist implements OnInit {

  books: Book[] = [];
  selectedBook: Book | null = null;
  searchTerm = '';
  showModal = false;
  isEditMode = false;

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = [...data];
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  get filteredBooks(): Book[] {
    if (!this.searchTerm) return this.books;
    const term = this.searchTerm.toLowerCase();

    return this.books.filter(b =>
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term) ||
      b.isbn.toLowerCase().includes(term)
    );
  }

  openAddModal() {
    this.selectedBook = null;
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(book: Book) {
    this.selectedBook = { ...book };
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBook = null;
    this.isEditMode = false;
  }

  closeModalOnOverlay(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (err) => {
          console.error('Error deleting book:', err);
          alert('Failed to delete book. Please try again.');
        }
      });
    }
  }

  onBookSaved() {
    this.closeModal();
    this.loadBooks();
  }

}

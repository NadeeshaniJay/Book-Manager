import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/bookservice';
import { Book } from '../../models/book';

@Component({
  selector: 'app-bookform',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './bookform.html',
  styleUrl: './bookform.css',
})

export class Bookform implements OnChanges {

  @Input() editBook: Book | null = null;
  @Output() bookSaved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationDate: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editBook'] && this.editBook) {
      this.isEditMode = true;

      this.form.patchValue({
        title: this.editBook.title,
        author: this.editBook.author,
        isbn: this.editBook.isbn,
        publicationDate: this.editBook.publicationDate.substring(0, 10)
      });
    }

    if (changes['editBook'] && !this.editBook) {
      this.reset();
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const bookData: Book = {
      ...this.form.value,
      id: this.editBook?.id || 0
    };

    if (this.isEditMode && this.editBook) {
      this.bookService.updateBook(this.editBook.id, bookData).subscribe({
        next: () => {
          console.log('Book updated, emitting bookSaved event');
          alert('Book updated successfully!');
          this.bookSaved.emit();
        },
        error: (err) => {
          console.error('Error updating book:', err);
          alert('Failed to update book. Please try again.');
        }
      });
    } else {
      this.bookService.addBook(bookData).subscribe({
        next: () => {
          console.log('Book added, emitting bookSaved event');
          alert('Book added successfully!');
          this.bookSaved.emit();
        },
        error: (err) => {
          console.error('Error adding book:', err);
          alert('Failed to add book. Please try again.');
        }
      });
    }
  }

  reset() {
    this.form.reset();
    this.isEditMode = false;
    this.editBook = null;
  }

  cancelEdit() {
    this.cancelled.emit();
  }
}

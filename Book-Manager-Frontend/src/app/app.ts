import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Booklist } from "./components/booklist/booklist";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Booklist],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('book-manager-frontend');
}

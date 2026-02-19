using Book_Manager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Book_Manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private static List<Book> books = new List<Book>
        {
            new Book { Id = 1, Title = "Atomic Habits", Author = "James Clear", Isbn = "9780735211292", PublicationDate = new DateTime(2018, 10, 16) },
            new Book { Id = 2, Title = "The Alchemist", Author = "Paulo Coelho", Isbn = "9780061122415", PublicationDate= new DateTime(1988) },
            new Book { Id = 3, Title = "Gamperaliya", Author = "Martin Wickramasinghe", Isbn = "9789550201365", PublicationDate = new DateTime(1944) }
        };

        private static int nextId = 4;

        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var allBooks = books.ToList();
            return Ok(allBooks);
        }

        [HttpGet("{id}")]
        public IActionResult GetBook(int id)
        {
            var book = books.FirstOrDefault(x => x.Id == id);
            if (book == null) return NotFound();

            return Ok(book);
        }

        [HttpPost]
        public IActionResult AddBook(AddBookDto addBookDto) 
        {
            var book = new Book()
            { 
                Id = nextId++,
                Title = addBookDto.Title, 
                Author = addBookDto.Author, 
                Isbn=addBookDto.Isbn, 
                PublicationDate = addBookDto.PublicationDate  
            };
            books.Add(book);
            return Ok(book);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, UpdateBookDto updateBookDto)
        {
            var book = books.FirstOrDefault(x => x.Id == id);
            if (book == null) return NotFound();

            book.Title = updateBookDto.Title;
            book.Author = updateBookDto.Author;
            book.Isbn = updateBookDto.Isbn;
            book.PublicationDate = updateBookDto.PublicationDate;

            return Ok(book);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = books.FirstOrDefault(b => b.Id == id);
            if (book == null) return NotFound();

            books.Remove(book);
            return Ok(book);
        }
    }
}

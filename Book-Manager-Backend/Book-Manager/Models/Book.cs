namespace Book_Manager.Models
{
    public class Book
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public string? Isbn { get; set; }
        public DateTime PublicationDate { get; set; }
    }
}

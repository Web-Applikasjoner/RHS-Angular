using System.Text.Json.Serialization;

namespace HRS_Angular.Models
{
    public class Item
    {
        [JsonPropertyName("ItemId")]

        public int ItemId { get; set; }

        [JsonPropertyName("Category")]
        public string Category { get; set; } = string.Empty;

        [JsonPropertyName("Location")]
        public string Location { get; set; } = string.Empty;

        [JsonPropertyName("Rooms")]
        public int Rooms { get; set; }

        [JsonPropertyName("Area")]
        public int Area { get; set; }

        [JsonPropertyName("Renting")]
        public int Renting { get; set; }

        [JsonPropertyName("Description")]
        public string? Description { get; set; }

        [JsonPropertyName("ImageUrl")]
        public string? ImageUrl { get; set; }
    }
}

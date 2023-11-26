using System.Text.Json.Serialization;
using Castle.Core.Resource;
using System.ComponentModel.DataAnnotations;

namespace RHS_Angular.Models
{
    public class Booking
    {
        [JsonPropertyName("BookingId")]
        public int BookingId { get; set; }
        [JsonPropertyName("UserId")]
        public string BookingDate { get; set; } = String.Empty;
        [JsonPropertyName("UserId")]

        [DataType(DataType.Date)]
        public DateTime? StartDate { get; set; }
        [JsonPropertyName("UserId")]

        [DataType(DataType.Date)]
        public DateTime? EndDate { get; set; }
        [JsonPropertyName("UserId")]
        public int UserId { get; set; }
        [JsonPropertyName("UserId")]
        public virtual User User { get; set; } = default!;
        [JsonPropertyName("UserId")]

        public int ItemId { get; set; }
        [JsonPropertyName("UserId")]
        public virtual Item? Items { get; set; }
    }
}
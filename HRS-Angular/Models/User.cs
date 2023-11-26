using System.Text.Json.Serialization;

namespace HRS_Angular.Models
{
    public class User
    {
        [JsonPropertyName("UserId")]

        public int UserId { get; set; }

        [JsonPropertyName("Name")]
        public string Name { get; set; }

        [JsonPropertyName("Email")]
        public string Email { get; set; }

        [JsonPropertyName("Phone")]
        public string Phone { get; set; }


        [JsonPropertyName("Password")]
        public string Password { get; set; }
    }
}

using RHS_Angular.Models;

namespace RHS_Angular.DAL
{
    public static class DBInit
    {

        public static void Seed(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            ItemDbContext context = serviceScope.ServiceProvider.GetRequiredService<ItemDbContext>();

            SeedItems(context);
            SeedUsers(context);
            SeedBookings(context);
        }
        //context.Database.EnsureDeleted();
        //context.Database.EnsureCreated();
        private static void SeedItems(ItemDbContext context)
        {

            if (!context.Items.Any())
            {
                var items = new List<Item>
            {
                new Item
                {
            Category="House",
            Location ="Drammen",
            Rooms=6,
            Area = 150,
            Renting =19500,
            Description="A new build house",
            ImageUrl="assets/images/House1.jpg"
                },
                new Item
                {
                    Category="House",
            Location ="Drammen",
            Rooms=6,
            Area = 160,
            Renting =17500,
            Description="A new build house",
            ImageUrl="assets/images/House2.jpg"

                },
                new Item
                {
                    Category="House",
            Location ="Oslo",
            Rooms=6,
            Area = 170,
            Renting =18500,
            Description="A new build house",
            ImageUrl="assets/images/House3.jpg"

                }

            };
                context.AddRange(items);
                context.SaveChanges();
            }
        }
        private static void SeedUsers(ItemDbContext context)
        {

            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User { Name = "Noeh Hansen", Email = "noeh@oslomet.com", Phone = "123456789", Password = "Aa.1234" },
                    new User { Name = "Johan Hansen", Email = "johan@oslomet.com", Phone = "987654321", Password = "Aa.1234" },
                    new User { Name = "Admin", Email = "admin@rhs.com", Phone = "555555555", Password = "Aa.1234" }
                };
                context.Users.AddRange(users);
                context.SaveChanges();
            }
        }
        private static void SeedBookings(ItemDbContext context)
        {

            if (!context.Bookings.Any())
            {
                var bookings = new List<Booking>
            {
                new Booking {BookingDate = DateTime.Today.ToString("yyyy-MM-dd"), ItemId = 1, UserId = 2},
                new Booking {BookingDate = DateTime.Today.ToString("yyyy-MM-dd"), ItemId = 2, UserId = 1}
                
            };
                context.AddRange(bookings);
                context.SaveChanges();
            }
        }
    }
}

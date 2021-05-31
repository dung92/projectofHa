using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace GymManage.EntityFrameworkCore
{
    public static class GymManageDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<GymManageDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<GymManageDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}

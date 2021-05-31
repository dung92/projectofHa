using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using GymManage.Configuration;
using GymManage.Web;

namespace GymManage.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class GymManageDbContextFactory : IDesignTimeDbContextFactory<GymManageDbContext>
    {
        public GymManageDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<GymManageDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            GymManageDbContextConfigurer.Configure(builder, configuration.GetConnectionString(GymManageConsts.ConnectionStringName));

            return new GymManageDbContext(builder.Options);
        }
    }
}

using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using GymManage.EntityFrameworkCore;
using GymManage.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace GymManage.Web.Tests
{
    [DependsOn(
        typeof(GymManageWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class GymManageWebTestModule : AbpModule
    {
        public GymManageWebTestModule(GymManageEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(GymManageWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(GymManageWebMvcModule).Assembly);
        }
    }
}
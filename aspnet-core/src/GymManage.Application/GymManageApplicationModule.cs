using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using GymManage.Authorization;

namespace GymManage
{
    [DependsOn(
        typeof(GymManageCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class GymManageApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<GymManageAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(GymManageApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}

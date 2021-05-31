using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace GymManage.Controllers
{
    public abstract class GymManageControllerBase: AbpController
    {
        protected GymManageControllerBase()
        {
            LocalizationSourceName = GymManageConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

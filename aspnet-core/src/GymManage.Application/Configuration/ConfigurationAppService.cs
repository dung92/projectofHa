using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using GymManage.Configuration.Dto;

namespace GymManage.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : GymManageAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

using System.Threading.Tasks;
using GymManage.Configuration.Dto;

namespace GymManage.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

using Abp.Authorization;
using GymManage.Authorization.Roles;
using GymManage.Authorization.Users;

namespace GymManage.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

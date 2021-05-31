using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace GymManage.Authorization
{
    public class GymManageAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            context.CreatePermission(PermissionNames.Pages_Dashboard, L("Dashboard"));

            context.CreatePermission(PermissionNames.Pages_Home, L("Home"));

            var admin = context.CreatePermission(PermissionNames.Pages_Admin, L("Admin"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Base, L("Sản phẩm"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Base_Option, L("Gói thời hạn"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Base_Service, L("Dịch vụ"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Base_Product, L("Bộ môn"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Base_ProductCategory, L("Sản phẩm"));

            admin.CreateChildPermission(PermissionNames.Pages_Admin_Internal, L("Nội bộ"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Internal_Employee, L("Nhân viên"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Internal_Position, L("Chức vụ"));

            admin.CreateChildPermission(PermissionNames.Pages_Admin_Main, L("Hoạt động chính"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Main_CheckIn, L("Check in"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Main_Bill, L("Hóa đơn"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Main_Cash, L("Thanh toán"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Main_Customer, L("Khách hàng"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Main_ProductInBill, L("Chi tiết hóa đơn"));

            admin.CreateChildPermission(PermissionNames.Pages_Admin_Class, L("Quản lý lớp học"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Class_Class, L("Lớp học"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Class_Student, L("Học viên"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Class_ClassCategory, L("Phân loại lớp"));

            admin.CreateChildPermission(PermissionNames.Pages_Admin_Time_SessionWork, L("Ca học"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Time_TimeTable, L("Lịch học"));
            admin.CreateChildPermission(PermissionNames.Pages_Admin_Time_Register, L("Đăng ký lịch dạy"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, GymManageConsts.LocalizationSourceName);
        }
    }
}

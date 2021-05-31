using GymManage.Catalog.InternalManage.Employee.Request;
using GymManage.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.InternalManage.Employee
{
    public interface IEmployeeAppService
    {
        Task<List<EmployeeViewModel>> GetAllEmployee(GetEmployeeRequest request);

        Task<List<EmployeeViewModel>> GetEmployeeByPosition(int positionId);

        Task CreateOrUpdateEmployee(CreateOrUpdateEmployeeRequest request);

        Task DeleteEmployee(int id);
    }
}

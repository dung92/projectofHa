using GymManage.Catalog.MainAction.CustomerInTimeTable.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.MainAction.CustomerInTimeTable
{
    public interface ICustomerInTimeTableAppService
    {
        Task<List<CustomerInTimeTableViewModel>> GetAllCustomerInTimeTable(GetCustomerInTimeTableRequest request);
        Task<List<CustomerInTimeTableViewModel>> GetCustomerByTimeTableId(int id);

        Task<List<CustomerInTimeTableViewModel>> GetTimetableByCustomerId(int id);
        Task DeleteCustomeInTimeTable(int id);
        Task CreateOrUpdateCustomerInTimeTable(CreateOrUpdateCustomerInTimeTableRequest request);
    }
}

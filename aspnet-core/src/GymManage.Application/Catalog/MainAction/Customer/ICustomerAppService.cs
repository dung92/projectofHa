using GymManage.Catalog.Customer.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.Customer
{
    public interface ICustomerAppService
    {
        Task<List<CustomerViewModel>> GetAllCustomer(GetCustomerRequest request);

        Task<List<CustomerViewModel>> GetCustomerById(int id);
        Task CreateOrUpdateCustomer(CreateOrUpdateCustomerRequest request);

        Task DeleteCustomer(int id);

        Task<bool> Login(string userName, string password);

    }
}

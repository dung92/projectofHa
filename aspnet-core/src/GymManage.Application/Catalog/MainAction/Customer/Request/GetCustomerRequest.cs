using Abp.AutoMapper;
using GymManage.Customer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.Customer.Request
{
    [AutoMapFrom(typeof(CustomerEntity))]
    public class GetCustomerRequest
    {
        public string Keyword { get; set; }
    }
}

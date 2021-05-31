using Abp.AutoMapper;
using GymManage.Product;
using GymManage.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.Service.Request
{
    [AutoMapFrom(typeof(ServiceEntity))]
    public class GetServiceRequest 
    {
        public string KeyWord { get; set; }
    }
}

using Abp.AutoMapper;
using GymManage.Option;
using GymManage.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.BaseProduct.Option.Request
{
    [AutoMapFrom(typeof(OptionEntity))]
    public class GetOptionRequest 
    {
        public string KeyWord { get; set; }
    }
}

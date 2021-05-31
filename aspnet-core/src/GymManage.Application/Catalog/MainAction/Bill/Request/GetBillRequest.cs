using Abp.AutoMapper;
using GymManage.Bill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.MainAction.Bill.Request
{
    [AutoMapFrom(typeof(BillEntity))]
    public class GetBillRequest
    {
        public string Keyword { get; set; }
        public DateTime? FromDateFilter { get; set; }
        public DateTime? ToDateFilter { get; set; }
    }
}

using GymManage.Catalog.MainAction.Bill.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.MainAction.Bill
{
    public interface IBillAppService
    {
        Task<List<BillViewModel>> GetAllBill(GetBillRequest request);
        Task<int> CreateOrUpdateBill(CreateOrUpdateBillRequest request);
        Task DeleteBill(int id);
    }
}

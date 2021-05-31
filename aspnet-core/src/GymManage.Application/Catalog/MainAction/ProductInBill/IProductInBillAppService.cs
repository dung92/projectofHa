using GymManage.Catalog.ProductInBill.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductInBill
{
    public interface IProductInBillAppService
    {
        Task<List<ProductInBillViewModel>> GetAllProductInBill(GetProductInBillRequest request);

        Task<List<ProductInBillViewModel>> GetProductInBillByCustomerId(int customerId);

        Task CreateOrUpdateProductInBill (CreateOrUpdateProductInBillRequest request);

        Task DeleteProductInBill(int id);
    }
}

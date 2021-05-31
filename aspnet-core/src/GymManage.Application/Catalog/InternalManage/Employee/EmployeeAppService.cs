using Abp.Domain.Repositories;
using GymManage.Catalog.InternalManage.Employee.Request;
using GymManage.Employee;
using GymManage.EmployeePosition;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.InternalManage.Employee
{
    public class EmployeeAppService : GymManageAppServiceBase, IEmployeeAppService
    {
        private readonly IRepository<EmployeeEntity> _employeeRepos;
        private readonly IRepository<EmployeePositionEntity> _positionRepos;
        public EmployeeAppService(IRepository<EmployeeEntity> employeeRepos, IRepository<EmployeePositionEntity> positionRepos)
        {
            _employeeRepos = employeeRepos;
            _positionRepos = positionRepos;
        }
        public async Task CreateOrUpdateEmployee(CreateOrUpdateEmployeeRequest request)
        {
            if (request.Born != null || request.FromDate != null || request.Salary != null || request.PositionId != null || request.Status != null)
            {
                var data = new EmployeeEntity
                {
                    Name = request.Name,
                    UserName = request.UserName,
                    Password = request.Password,
                    Born = request.Born.Value,
                    Adress = request.Adress,
                    PhoneNumber = request.PhoneNumber,
                    Salary = request.Salary.Value,
                    FromDate = request.FromDate.Value,
                    Status = request.Status.Value,
                    PositionId = request.PositionId.Value
                };

                if (request.Id > 0)
                {
                    data.Id = request.Id.Value;
                    await _employeeRepos.UpdateAsync(data);
                }
                else
                {
                    await _employeeRepos.InsertAsync(data);
                }
            }
            else
            {
                var data = new EmployeeEntity
                {
                    Name = request.Name,
                    UserName = request.UserName,
                    Password = request.Password,
                    Adress = request.Adress,
                    PhoneNumber = request.PhoneNumber,
                };

                if (request.Id > 0)
                {
                    data.Id = request.Id.Value;
                    await _employeeRepos.UpdateAsync(data);
                }
                else
                {
                    await _employeeRepos.InsertAsync(data);
                }
            }

        }

        public async Task DeleteEmployee(int id)
        {
            var data = await _employeeRepos.GetAsync(id);
            await _employeeRepos.DeleteAsync(data);
        }

        public async Task<List<EmployeeViewModel>> GetAllEmployee(GetEmployeeRequest request)
        {
            //var employeeQuery = _employeeRepos.GetAll();
            //var positionQuery = _positionRepos.GetAll();

            //var query = from e in employeeQuery
            //            join p in positionQuery on e.PositionId equals p.Id
            //            select new { e, p };

            //if (!string.IsNullOrEmpty(request.Keyword))
            //{
            //    query = query.Where(x => x.e.Name.Contains(request.Keyword));
            //}

            //var data = await query.Select(x =>
            //new EmployeeViewModel()
            //{

            //    Id = x.e.Id,
            //    Name = x.e.Name,
            //    UserName = x.e.UserName,
            //    Password = x.e.Password,
            //    Born = x.e.Born.Value,
            //    Adress = x.e.Adress,
            //    Salary = x.e.Salary.Value,
            //    PhoneNumber = x.e.PhoneNumber,
            //    FromDate = x.e.FromDate.Value,
            //    Status = x.e.Status.Value,
            //    PositionId = x.e.PositionId.Value,
            //    PositionName = x.p.Name,
            //    PositionDescription = x.p.Description,
            //    PositionBaseSalary = x.p.BaseSalary,
            //    PositionBonus = x.p.Bonus
            //}).ToListAsync();



            var data = await _employeeRepos.GetAll().Select(x => new EmployeeViewModel
            {
                Id = x.Id,
                Name = x.Name,
                UserName = x.UserName,
                Password = x.Password,
                Born = x.Born.Value,
                Adress = x.Adress,
                PhoneNumber = x.PhoneNumber,
                Salary = x.Salary.Value,
                FromDate = x.FromDate.Value,
                Status = x.Status.Value,
                PositionId = x.PositionId.Value
            }).ToListAsync();

            return data;
        }

        public async Task<List<EmployeeViewModel>> GetEmployeeByPosition(int positionId)
        {
            var data = await _employeeRepos.GetAll().Where(x => x.PositionId == positionId).Select(x => new EmployeeViewModel()
            {
                Id = x.Id,
                Name = x.Name,
                UserName = x.UserName,
                Password = x.Password,
                Born = x.Born.Value,
                Adress = x.Adress,
                PhoneNumber = x.PhoneNumber,
                Salary = x.Salary.Value,
                FromDate = x.FromDate.Value,
                Status = x.Status.Value,
                PositionId = x.PositionId.Value

            }).ToListAsync();

            return data;
        }
    }
}

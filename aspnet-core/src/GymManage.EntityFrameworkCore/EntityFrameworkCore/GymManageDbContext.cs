using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using GymManage.Authorization.Roles;
using GymManage.Authorization.Users;
using GymManage.MultiTenancy;
using GymManage.Product;
using GymManage.Bill;

using GymManage.Customer;
using GymManage.Employee;
using GymManage.EmployeePosition;

using GymManage.ProductCategory;
using GymManage.ProductInBill;

using GymManage.TrainingClass;
using GymManage.TrainingClassCategory;
using GymManage.Option;
using GymManage.Service;
using GymManage.TimeTable;
using GymManage.AppEntity.SessionWork;
using GymManage.AppEntity.CustomerInTimeTable;
using GymManage.EntityFrameworkCore.Seed;
using System;

namespace GymManage.EntityFrameworkCore
{
    public class GymManageDbContext : AbpZeroDbContext<Tenant, Role, User, GymManageDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<BillEntity> Bills { get; set; }
        public DbSet<CustomerEntity> Customers { get; set; }
        public DbSet<EmployeeEntity> Employees { get; set; }
        public DbSet<EmployeePositionEntity> EmployeePositions { get; set; }
        public DbSet<ProductCategoryEntity> ProductCategories { get; set; }
        public DbSet<ProductInBillEntity> ProductInBills { get; set; }
        public DbSet<TrainingClassEntity> TrainingClasses { get; set; }
        public DbSet<TrainingClassCategoryEntity> TrainingClassCategories { get; set; }
        public DbSet<OptionEntity> Options { get; set; }
        public DbSet<ServiceEntity> Services { get; set; }
        public DbSet<CustomerInTimeTableEntity> CustomerInClass { get; set; }
        public DbSet<TimeTableEntity> TimeTables { get; set; }
        public DbSet<SessionWorkEntity> Sessions { get; set; }

        public GymManageDbContext(DbContextOptions<GymManageDbContext> options)
            : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EmployeePositionEntity>().HasData(
              new EmployeePositionEntity() { Id = 1, Name = "Giáo viên", Description = "người giảng dạy tại các lớp học", BaseSalary = 120, Bonus = 10 }
              );

            modelBuilder.Entity<EmployeeEntity>().HasData(
                new EmployeeEntity() { Id = 1, Name = "Trống", Born = DateTime.Now, Adress = "NaN", PhoneNumber = "000", Salary = 0, FromDate = DateTime.Now, Status = true, PositionId = 1, Password = "", UserName = "" }
                );
        }
    }
}

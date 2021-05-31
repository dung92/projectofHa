import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {
    Router,
    RouterEvent,
    NavigationEnd,
    PRIMARY_OUTLET
} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MenuItem} from '@shared/layout/menu-item';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[];
    menuItemsMap: { [key: number]: MenuItem } = {};
    activatedMenuItems: MenuItem[] = [];
    routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
    homeRoute = '/app';

    constructor(injector: Injector, private router: Router) {
        super(injector);
        this.router.events.subscribe(this.routerEvents);
    }

    ngOnInit(): void {
        this.menuItems = this.getMenuItems();
        this.patchMenuItems(this.menuItems);
        this.routerEvents
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
                const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
                const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
                    .children[PRIMARY_OUTLET];
                if (primaryUrlSegmentGroup) {
                    this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
                }
            });
    }

    getMenuItems(): MenuItem[] {
        return [         
            new MenuItem(this.l('Tổng quan'), '/app/home', 'fas fa-chart-line', 'Pages.Home'),

            new MenuItem(
                this.l('Quản lý hệ thống'),
                '',
                'fas fa-tasks',
                '',
                [
                    new MenuItem(
                        this.l('Phân quyền'),
                        '/app/roles',
                        'fas fa-theater-masks',
                        'Pages.Roles'
                    ),
                    new MenuItem(
                        this.l('Người thuê'),
                        '/app/tenants',
                        'fas fa-building',
                        'Pages.Tenants'
                    ),
                    new MenuItem(
                        this.l('Người dùng'),
                        '/app/users',
                        'fas fa-users',
                        'Pages.Users'
                    ),          
        
                ]
            ),

            //main action
            new MenuItem(
                this.l('Hoạt động chính'),
                '',
                'fas fa-home',
                '',
                [
                    new MenuItem(
                        this.l('Khách hàng'),
                        '/app/admin/main/customer',
                        'fas fa-user-tie',
                        'Pages.Admin.Main.Customer'
                    ),
                    new MenuItem(
                        this.l('Hóa đơn'),
                        '/app/admin/main/bill',
                        'fas fa-money-bill',
                        'Pages.Admin.Main.Bill'
                    ),
                    new MenuItem(
                        this.l('Thanh toán'),
                        '/app/admin/main/cash',
                        'fas fa-cash-register',
                        'Pages.Admin.Main.Cash'
                    ),
                    new MenuItem(
                        this.l('Check in'),
                        '/app/admin/main/check-in',
                        'fas fa-check-circle',
                        'Pages.Admin.Main.CheckIn'
                    ),
                    new MenuItem(
                        this.l('Chi tiết hóa đơn'),
                        '/app/admin/main/bill-manage',
                        'fas fa-info-circle',
                        'Pages.Admin.Main.ProductInBill'
                    ),
                ]
            ),
            
            //base product
            new MenuItem(
                this.l('Sản phẩm'),
                '',
                'fas fa-shopping-cart',
                '',
                [
                    new MenuItem(
                        this.l('Gói thời hạn'),
                        '/app/admin/base/option',
                        'far fa-clock',
                        'Pages.Admin.Base.Option'
                    ),
                    new MenuItem(
                        this.l('Bộ môn'),
                        '/app/admin/base/product',
                        'fas fa-dumbbell',
                        'Pages.Admin.Base.Product'
                    ),
                    new MenuItem(
                        this.l('Dịch vụ'),
                        '/app/admin/base/service',
                        'fas fa-credit-card',
                        'Pages.Admin.Base.Service'
                    ),
                    new MenuItem(
                        this.l('Danh mục sản phẩm'),
                        '/app/admin/base/product-category',
                        'fab fa-product-hunt',
                        'Pages.Admin.Base.ProductCategory'
                    ),
                ]
            ),
            //internal manage
            new MenuItem(
                this.l('Nội bộ'),
                '',
                'fas fa-clipboard',
                '',
                [
                    new MenuItem(
                        this.l('Nhân viên'),
                        '/app/admin/internal/employee',
                        'fas fa-id-badge',
                        'Pages.Admin.Internal.Employee'
                    ),
                    new MenuItem(
                        this.l('Chức vụ'),
                        '/app/admin/internal/position',
                        'fas fa-user-tag',
                        'Pages.Admin.Internal.Position'
                    ),
                ]
            ),
            
            //training class
            new MenuItem(
                this.l('Quản lý lớp học'),
                '',
                'fas fa-graduation-cap',
                '',
                [                  
                    new MenuItem(
                        this.l('Danh sách lớp học'),
                        '/app/admin/class/class',
                        'fas fa-chalkboard',
                        'Pages.Admin.Class.Class'
                    ),
                    new MenuItem(
                        this.l('Phân loại lớp học'),
                        '/app/admin/class/class-category',
                        'fas fa-book',
                        'Pages.Admin.Class.ClassCategory'
                    ),
                    new MenuItem(
                        this.l('Học viên'),
                        '/app/admin/class/student',
                        'fas fa-user-graduate',
                        'Pages.Admin.Class.Student'
                    ),
                ]
            ),

            //timetable
            new MenuItem(
                this.l('Thời gian biểu'),
                '',
                'fas fa-clock',
                '',
                [                  
                    new MenuItem(
                        this.l('Ca học'),
                        '/app/admin/time/session-work',
                        'far fa-clipboard',
                        'Pages.Admin.Time.SessionWork'
                    ),
                    new MenuItem(
                        this.l('Lịch học'),
                        '/app/admin/time/timetable',
                        'far fa-calendar-alt',
                        'Pages.Admin.Time.TimeTable'
                    ),
                    new MenuItem(
                        this.l('Đăng kí lịch dạy'),
                        '/app/admin/time/register',
                        'far fa-calendar-alt',
                        'Pages.Admin.Time.Register'
                    ),
                ]
            ),
        ];
    }

    patchMenuItems(items: MenuItem[], parentId?: number): void {
        items.forEach((item: MenuItem, index: number) => {
            item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
            if (parentId) {
                item.parentId = parentId;
            }
            if (parentId || item.children) {
                this.menuItemsMap[item.id] = item;
            }
            if (item.children) {
                this.patchMenuItems(item.children, item.id);
            }
        });
    }

    activateMenuItems(url: string): void {
        this.deactivateMenuItems(this.menuItems);
        this.activatedMenuItems = [];
        const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
        foundedItems.forEach((item) => {
            this.activateMenuItem(item);
        });
    }

    deactivateMenuItems(items: MenuItem[]): void {
        items.forEach((item: MenuItem) => {
            item.isActive = false;
            item.isCollapsed = true;
            if (item.children) {
                this.deactivateMenuItems(item.children);
            }
        });
    }

    findMenuItemsByUrl(
        url: string,
        items: MenuItem[],
        foundedItems: MenuItem[] = []
    ): MenuItem[] {
        items.forEach((item: MenuItem) => {
            if (item.route === url) {
                foundedItems.push(item);
            } else if (item.children) {
                this.findMenuItemsByUrl(url, item.children, foundedItems);
            }
        });
        return foundedItems;
    }

    activateMenuItem(item: MenuItem): void {
        item.isActive = true;
        if (item.children) {
            item.isCollapsed = false;
        }
        this.activatedMenuItems.push(item);
        if (item.parentId) {
            this.activateMenuItem(this.menuItemsMap[item.parentId]);
        }
    }

    isMenuItemVisible(item: MenuItem): boolean {
        if (!item.permissionName) {
            return true;
        }
        return this.permission.isGranted(item.permissionName);
    }
}

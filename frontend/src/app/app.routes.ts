import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Main } from './layouts/main/main';
import { ProductDetails } from './pages/product-details/product-details';
import { AddProduct } from './pages/add-product/add-product';
import { UpdateProduct } from './pages/update-product/update-product';
import { Categories } from './pages/categories/categories';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { ConfirmEmail } from './pages/confirm-email/confirm-email';
import { ForgetPassword } from './pages/forget-password/forget-password';
import { ResetPassword } from './pages/reset-password/reset-password';
import { Profile } from './pages/profile/profile';
import { adminGuard } from './guards/admin-guard';
import { CartPage } from './pages/cart/cart';
import { CheckoutPage } from './pages/checkout/checkout';
import { OrdersPage } from './pages/orders/orders';
import { PaymentSuccess } from './pages/payment-success/payment-success';
import { PaymentCancel } from './pages/payment-cancel/payment-cancel';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { ManageOrders } from './pages/manage-orders/manage-orders';
import { OrderDetails } from './pages/order-details/order-details';



export const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "", component: Main, children: [
    {path: "home", component: Home},
    {path: "products", component: Products},
    {path: "products/new", component: AddProduct, canActivate: [adminGuard]},
    {path: "products/:id/edit", component: UpdateProduct, canActivate: [adminGuard]},
    {path: "products/:id", component: ProductDetails},
    {path: "categories", component: Categories},
    {path: "login", component: Login},
    {path: "signup", component: Signup},
    {path: "confirm-email", component: ConfirmEmail},
    {path: "forget-password", component: ForgetPassword},
    {path: "profile", component: Profile},
    {path: "cart", component: CartPage},
    {path: "checkout", component: CheckoutPage},
    {path: "orders", component: OrdersPage},
    {path: "success", component: PaymentSuccess},
    {path: "cancel", component: PaymentCancel},
    {path: "admin/dashboard", component: AdminDashboard, canActivate: [adminGuard]},
    {path: "admin/orders", component: ManageOrders, canActivate: [adminGuard]},
    {path: "orders/:id", component: OrderDetails, canActivate: [adminGuard]},
    {path: "reset-password/:token", component: ResetPassword},
  ]},
];

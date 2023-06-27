import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import AdminAuthRoute from '@routes/admin/auth.route';
import AdminOrderRoute from '@routes/admin/order.route';
import AdminTagRoute from '@routes/admin/tag.route';
import AdminUsersRoute from '@routes/admin/users.route';
import OrderRoute from '@routes/order.route';
import ProductsRoute from '@routes/product.route';
import TagRoute from '@routes/tag.route';
import AddressRoute from '@routes/address.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProductsRoute(),
  new OrderRoute(),
  new TagRoute(),
  new AdminAuthRoute(),
  new AdminUsersRoute(),
  new AdminOrderRoute(),
  new AdminTagRoute(),
  new AddressRoute(),
]);

app.listen();

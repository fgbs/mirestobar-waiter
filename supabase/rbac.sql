-- Custom types
create type public.app_role as enum ('admin', 'owner', 'manager', 'waiter', 'client');
create type public.app_permission as enum (
  'restaurant.create', 'restaurant.read', 'restaurant.update', 'restaurant.delete',
  'branch.create', 'branch.read', 'branch.update', 'branch.delete',
  'category.create', 'category.read', 'category.update', 'category.delete',
  'menu.create', 'menu.read', 'menu.update', 'menu.delete',
  'item.create', 'item.read', 'item.update', 'item.delete',
  'table.create', 'table.read', 'table.update', 'table.delete',
  'order.create', 'order.read', 'order.update', 'order.delete',
  'cart.create', 'cart.read', 'cart.update', 'cart.delete'
);

-- USER ROLES
create table public.user_roles (
  id        bigint generated by default as identity primary key,
  user_id   uuid references public.profiles on delete cascade not null,
  role      app_role not null,
  unique (user_id, role)
);
comment on table public.user_roles is 'Application roles for each user.';

-- ROLE PERMISSIONS
create table public.role_permissions (
  id           bigint generated by default as identity primary key,
  role         app_role not null,
  permission   app_permission not null,
  unique (role, permission)
);
comment on table public.role_permissions is 'Application permissions for each role.';

create policy "Allow individual read access" on public.user_roles for select using ( auth.uid() = user_id );

insert into public.role_permissions (role, permission)
values
  ('admin', 'restaurant.create'),
  ('admin', 'restaurant.read'), 
  ('admin', 'restaurant.update'), 
  ('admin', 'restaurant.delete'),
  ('admin', 'branch.create'), 
  ('admin', 'branch.read'), 
  ('admin', 'branch.update'), 
  ('admin', 'branch.delete'),
  ('admin', 'category.create'), 
  ('admin', 'category.read'), 
  ('admin', 'category.update'), 
  ('admin', 'category.delete'),
  ('admin', 'menu.create'), 
  ('admin', 'menu.read'), 
  ('admin', 'menu.update'), 
  ('admin', 'menu.delete'),
  ('admin', 'item.create'), 
  ('admin', 'item.read'), 
  ('admin', 'item.update'), 
  ('admin', 'item.delete'),
  ('admin', 'table.create'), 
  ('admin', 'table.read'), 
  ('admin', 'table.update'), 
  ('admin', 'table.delete'),
  ('admin', 'order.create'), 
  ('admin', 'order.read'), 
  ('admin', 'order.update'), 
  ('admin', 'order.delete'),
  ('admin', 'cart.create'), 
  ('admin', 'cart.read'), 
  ('admin', 'cart.update'), 
  ('admin', 'cart.delete'),
  ('owner', 'restaurant.create'),
  ('owner', 'restaurant.read'), 
  ('owner', 'restaurant.update'), 
  ('owner', 'restaurant.delete'),
  ('owner', 'branch.create'), 
  ('owner', 'branch.read'), 
  ('owner', 'branch.update'), 
  ('owner', 'branch.delete'),
  ('owner', 'category.create'), 
  ('owner', 'category.read'), 
  ('owner', 'category.update'), 
  ('owner', 'category.delete'),
  ('owner', 'menu.create'), 
  ('owner', 'menu.read'), 
  ('owner', 'menu.update'), 
  ('owner', 'menu.delete'),
  ('owner', 'item.create'), 
  ('owner', 'item.read'), 
  ('owner', 'item.update'), 
  ('owner', 'item.delete'),
  ('owner', 'table.create'), 
  ('owner', 'table.read'), 
  ('owner', 'table.update'), 
  ('owner', 'table.delete'),
  ('owner', 'order.read'), 
  ('owner', 'order.update'), 
  ('owner', 'order.delete'),
  ('owner', 'cart.read'), 
  ('owner', 'cart.update'), 
  ('owner', 'cart.delete'),
  ('manager', 'restaurant.read'), 
  ('manager', 'branch.read'), 
  ('manager', 'category.create'), 
  ('manager', 'category.read'), 
  ('manager', 'category.update'), 
  ('manager', 'menu.create'), 
  ('manager', 'menu.read'), 
  ('manager', 'menu.update'), 
  ('manager', 'item.create'), 
  ('manager', 'item.read'), 
  ('manager', 'item.update'), 
  ('manager', 'table.create'), 
  ('manager', 'table.read'), 
  ('manager', 'table.update'), 
  ('manager', 'order.read'), 
  ('manager', 'order.update'), 
  ('manager', 'order.delete'),
  ('manager', 'cart.read'), 
  ('manager', 'cart.update'), 
  ('manager', 'cart.delete'),
  ('waiter', 'restaurant.read'), 
  ('waiter', 'branch.read'), 
  ('waiter', 'category.read'), 
  ('waiter', 'menu.read'), 
  ('waiter', 'item.read'), 
  ('waiter', 'table.read'), 
  ('waiter', 'table.update'), 
  ('waiter', 'order.read'), 
  ('waiter', 'order.update'), 
  ('waiter', 'cart.read'), 
  ('waiter', 'cart.update'), 
  ('client', 'restaurant.read'), 
  ('client', 'branch.read'), 
  ('client', 'category.read'), 
  ('client', 'menu.read'), 
  ('client', 'item.read'), 
  ('client', 'table.read'), 
  ('client', 'order.create'), 
  ('client', 'order.read'), 
  ('client', 'order.update'), 
  ('client', 'cart.create'), 
  ('client', 'cart.read'), 
  ('client', 'cart.update')

-- authorize with role-based access control (RBAC)
create or replace function public.authorize(
  requested_permission app_permission,
  user_id uuid
)
returns boolean as $$
declare
  bind_permissions int;
begin
  select count(*)
  from public.role_permissions
  inner join public.user_roles on role_permissions.role = user_roles.role
  where role_permissions.permission = authorize.requested_permission
    and user_roles.user_id = authorize.user_id
  into bind_permissions;

  return bind_permissions > 0;
end;
$$ language plpgsql security definer;
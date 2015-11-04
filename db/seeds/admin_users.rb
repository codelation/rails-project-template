admin = AdminUser.where(name: "Admin User", email: "admin@codelation.com").first_or_initialize
if admin.new_record?
  admin.password = "password123"
  admin.password_confirmation = "password123"
  admin.save
end

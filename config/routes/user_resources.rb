# Resources for user sign in/out/register/settings

authenticate :user do
  get "user/settings", to: "users/settings#edit"
  put "user/settings", to: "users/settings#update"
  patch "user/settings", to: "users/settings#update"
end

RailsProjectTemplate::Application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :admin_users, :users
  draw_static_pages

  # REQUIRED
  # The Authenticated Root Path is used as the path the app redirects to after a sign in/up/settings change
  # It is generally the root of the app after a user has signed in
  get "/", to: "pages#index", as: :authenticated_root

  # Resources for user sign in/out/register/settings
  draw :user_resources
end

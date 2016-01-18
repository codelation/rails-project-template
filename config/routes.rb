RailsProject::Application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :admin_users, :users
  draw_static_pages

  root to: "pages#home"
end

RailsProject::Application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :admin_users, :users

  root to: "pages#home"
end

Rails.application.routes.draw do
  namespace :api do
    root 'home#index'

    devise_for :users
      devise_scope :user do
        post "sign_up", :to => 'registrations#create'
        post "sign_in", :to => 'sessions#create'
        delete "sign_out", :to => 'sessions#destroy'
    end
  end

  
end

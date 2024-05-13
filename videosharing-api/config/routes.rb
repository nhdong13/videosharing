Rails.application.routes.draw do
  scope :api do
    scope :v1 do
      root 'home#index'

      devise_for :users, skip: [:sessions, :registrations, :passwords]
      devise_scope :user do
        post   'sign_up',  to: 'registrations#create'
        post   'sign_in',  to: 'sessions#create'
        delete 'sign_out', to: 'sessions#destroy'
      end
    end
  end
end

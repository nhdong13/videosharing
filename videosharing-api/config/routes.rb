Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  scope :api do
    scope :v1 do
      root 'home#index'

      devise_for :users, skip: [:sessions, :registrations, :passwords]
      devise_scope :user do
        post   'sign_up',  to: 'registrations#create'
        post   'sign_in',  to: 'sessions#create'
        delete 'sign_out', to: 'sessions#signout'
        get    'auth/me',  to: 'sessions#me'
      end

      post 'videos', to: 'videos#create'
    end
  end
end

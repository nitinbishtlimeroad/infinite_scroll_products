Rails.application.routes.draw do
  root "page#welcome"
  resources :products, only: [:index] do
    collection do
      get :load_more
    end
  end
end
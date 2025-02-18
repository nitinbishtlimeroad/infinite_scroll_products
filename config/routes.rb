Rails.application.routes.draw do
  root "page#welcome"
  get "/products", to: "products#index"
  get "/products/load_more", to: "products#load_more"
end

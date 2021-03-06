Rails.application.routes.draw do

  resources :messages
  resources :chatrooms
  resources :trips

  get 'home' => 'home#index'

  post 'auth_user' => 'authentication#authenticate_user'
  post 'active_user' => 'authentication#active_user'

  post '/users/search' => 'users#search'

  post "/users/request" => "users#request_friendship"
  post "/users/viewrequests" => "users#view_requests"
  post "/users/addfriend" => "users#add_friend"


  get '/users/:id/friends' => 'users#friends'
  post "/users/:id" => "users#show"
  get '/users/:id' => "users#show_own_profile"
  patch '/users/wherelive' => 'users#edit_where_live'
  patch '/users/addbio' => "users#add_bio"
  patch '/users' => "users#update"

  patch '/trips/:id/endtrip' => 'trips#end_trip'
  patch '/trips/:id/add' => 'trips#add_trip_location'

  get '/trips/:id/locations' => 'trips#show_locations'
  get '/trips/:id/photos' => 'trips#show_photos'

  post '/trips/:id/photos' => 'trips#add_photos'
  patch '/triplocations/:id' => 'trips#edit_trip_location'

  post '/chatrooms/find' => 'chatrooms#find_or_create_by'
  post '/chatrooms/:chatroom_id/authorize', to: 'chatrooms#open'
	post '/chatrooms/:chatroom_id/add_message', to: 'chatrooms#add_message'
	post '/chatrooms/delete_message', to: 'chatrooms#delete_message'
  #
  # devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions"}, defaults: { format: :json }

  devise_for :users, :controllers => {:registrations => "registrations"}, defaults: { format: :json }, skip: [:sessions, :password]

  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

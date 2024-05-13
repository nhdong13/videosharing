class SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user_from_token, only: :create
  before_action :load_user_authentication

  respond_to :json

  def create
    if @user.valid_password? user_params[:password]
      sign_in @user, store: false

      render json: { message: "Signed in successfully", user: @user }, status: 200
      return
    end

    invalid_login_attempt
  end

  def destroy
    if @user.authentication_token == user_params[:authentication_token]
      sign_out @user

      render json: { message: "Signed out" }, status: 200
    else
      render json: { message: "Invalid token" }, status: 200
    end
  end

  private

  def user_params
    params.permit :email, :password, :authentication_token
  end

  def invalid_login_attempt
    render json: { message: "Sign in failed" }, status: 200
  end
end

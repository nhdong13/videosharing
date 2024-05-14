class SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user_from_token, only: :create
  before_action :load_user_authentication, only: :create

  respond_to :json

  def create
    if @user.valid_password? user_params[:password]
      sign_in @user, store: false

      render json: { message: "Signed in successfully", user: UserSerializer.new(@user) }, status: 200
      return
    end

    invalid_login_attempt
  end

  def signout
    if current_user.authentication_token
      sign_out current_user
      current_user.update(authentication_token: nil)

      render json: { message: "Signed out" }, status: 200
    else
      render json: { message: "Invalid token" }, status: 200
    end
  end

  def me
    if current_user
      render json: { signed_in: true, user: UserSerializer.new(current_user) }
    else
      render json: { signed_in: false }
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

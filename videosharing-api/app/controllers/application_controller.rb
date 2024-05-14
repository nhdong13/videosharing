class ApplicationController < ActionController::API
  acts_as_token_authentication_handler_for User, { fallback: :none }

  respond_to :json

  private

  def current_user
    @current_user ||= User.find_by authentication_token: bearer_token
  end

  def authenticate_user_from_token
    render json: { message: "You are not authenticated" }, status: 401 if current_user.nil?
  end

  def load_user_authentication
    @user = User.find_by_email user_params[:email]

    return login_invalid unless @user
  end

  def login_invalid
    render json: { message: "Incorrect email/password." }, status: 200
  end

  def bearer_token
    pattern = /^Bearer /
    header  = request.headers['Authorization']
    header.gsub(pattern, '') if header && header.match(pattern)
  end  
end

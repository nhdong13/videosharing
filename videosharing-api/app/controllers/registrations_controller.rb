class RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user_from_token, only: :create

  respond_to :json

  def create
    user = User.new user_params

    if user.save
      render json: { message: "Successfully registered!", user: user }, status: 200
    else
      warden.custom_failure!
      render json: { message: user.errors.messages }, status: 200
    end
  end

  private

  def user_params
    params.permit :email, :password, :password_confirmation
  end
end

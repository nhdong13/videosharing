require "test_helper"

class RegistrationsControllerTest < ActionController::TestCase
  include Devise::Test::IntegrationHelpers
  include Devise::Test::ControllerHelpers

  test "should create a new user" do
    @request.env["devise.mapping"] = Devise.mappings[:user]
    assert_difference("User.count") do
      post :create, params: { email: "test@example.com", password: "password", password_confirmation: "password" }
    end

    assert_response :success
  end

  test "should not create a new user with invalid data" do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    assert_no_difference("User.count") do
      post :create, params: { email: "invalidemail", password: "password" }
    end

    assert_response :success
  end

  test "should render success message and user details when user is successfully registered" do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    post :create, params: { email: "test@example.com", password: "password", password_confirmation: "password" }

    assert_response :success
    assert_equal "Successfully registered!", JSON.parse(response.body)["message"]
    assert_not_nil JSON.parse(response.body)["user"]
  end

  test "should render error message when user registration fails" do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    post :create, params: { email: "invalidemail", password: "password", password_confirmation: "password" }

    assert_response :success
    assert_equal "is invalid", JSON.parse(response.body)["message"]["email"][0]
  end
end

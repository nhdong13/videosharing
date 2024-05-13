require "test_helper"

class RegistrationsControllerTest < ActionController::TestCase
  test "should create a new user" do
    assert_difference("User.count") do
      post :create, params: { user: { email: "test@example.com", password: "password" } }
    end

    assert_response :success
  end

  test "should not create a new user with invalid data" do
    assert_no_difference("User.count") do
      post :create, params: { user: { email: "invalid_email", password: "password" } }
    end

    assert_response :unprocessable_entity
  end

  test "should render success message and user details when user is successfully registered" do
    post :create, params: { user: { email: "test@example.com", password: "password" } }

    assert_response :success
    assert_equal "Successfully registered!", JSON.parse(response.body)["message"]
    assert_not_nil JSON.parse(response.body)["user"]
  end

  test "should render error message when user registration fails" do
    post :create, params: { user: { email: "invalid_email", password: "password" } }

    assert_response :success
    assert_equal "Email is invalid", JSON.parse(response.body)["message"]["email"].first
  end
end

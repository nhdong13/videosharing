require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should create session" do
    post api_session_url, params: { email: 'test@example.com', password: 'password' }
    assert_response :success
  end

  test "should destroy session" do
    delete destroy_api_session_url
    assert_response :success
  end

  test "should return success message and user details on successful sign in" do
    post api_session_url, params: { email: 'test@example.com', password: 'password' }
    assert_response :success
    assert_equal "Signed in successfully", response.parsed_body["message"]
    assert_equal "test@example.com", response.parsed_body["user"]["email"]
    # Add additional assertions to test other user details, if needed.
  end

  test "should return sign in failed message on invalid password" do
    post api_session_url, params: { email: 'test@example.com', password: 'wrong_password' }
    assert_response :success
    assert_equal "Sign in failed", response.parsed_body["message"]
  end

  test "should sign out user with valid authentication token" do
    delete destroy_api_session_url, params: { authentication_token: 'valid_token' }
    assert_response :success
    assert_equal "Signed out", response.parsed_body["message"]
  end

  test "should return invalid token message on sign out with invalid authentication token" do
    delete destroy_api_session_url, params: { authentication_token: 'invalid_token' }
    assert_response :success
    assert_equal "Invalid token", response.parsed_body["message"]
  end
end

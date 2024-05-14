require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should create session" do
    post sign_in_url, params: { email: 'test@example.com', password: 'password' }
    assert_response :success
  end

  test "should destroy session" do
    user = User.create(email: "test@gmail.com", password: "123123", password_confirmation: "123123", authentication_token: "sample_token")
    delete sign_out_url, headers: { 'Authorization' => "Bearer #{user.authentication_token}" }
    assert_response :success
  end

  test "should return success message and user details on successful sign in" do
    user = User.create(email: "test@example.com", password: "password", password_confirmation: "password", authentication_token: "sample_token")
    post sign_in_url, params: { email: 'test@example.com', password: 'password' }
    assert_response :success
    assert_equal "Signed in successfully", response.parsed_body["message"]
    assert_equal "test@example.com", response.parsed_body["user"]["email"]
    # Add additional assertions to test other user details, if needed.
  end

  test "should return sign in failed message on invalid password" do
    post sign_in_url, params: { email: 'test@example.com', password: 'wrong_password' }
    assert_response :success
    assert_equal "Incorrect email/password.", response.parsed_body["message"]
  end

  test "should sign out user with valid authentication token" do
    user = User.create(email: "test@gmail.com", password: "123123", password_confirmation: "123123", authentication_token: "sample_token")
    delete sign_out_url, headers: { 'Authorization' => "Bearer #{user.authentication_token}" }
    assert_response :success
    assert_equal "Signed out", response.parsed_body["message"]
  end

  test "should return invalid token message on sign out with invalid authentication token" do
    user = User.create(email: "test@gmail.com", password: "123123", password_confirmation: "123123", authentication_token: "sample_token")
    delete sign_out_url, headers: { 'Authorization' => "Bearer invalid_token" }
    assert_response 401
  end
end

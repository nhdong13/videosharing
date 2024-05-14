require "test_helper"

class VideosControllerTest < ActionDispatch::IntegrationTest
  test "should create video" do
    user = User.create(email: "test@gmail.com", password: "123123", password_confirmation: "123123", authentication_token: "sample_token")

    assert_difference('Video.count') do
      post videos_url, params: { video: { title: "Test Video", description: "Test Description", url: "https://www.youtube.com/watch?v=SZeD7wewxq8" } }, headers: { 'Authorization' => "Bearer #{user.authentication_token}" }
    end
  
    assert_response :created
  end

  test "should create video" do
    assert_difference('Video.count') do
      post videos_url, params: { video: { title: "Test Video", description: "Test Description", url: "https://example.com/test_video.mp4" } }
    end
  
    assert_response :created
  end
end

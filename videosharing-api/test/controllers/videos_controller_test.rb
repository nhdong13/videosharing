require "test_helper"

class VideosControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get videos_create_url
    assert_response :success
  end

  test "should create video" do
    assert_difference('Video.count') do
      post videos_url, params: { video: { title: "Test Video", description: "Test Description", url: "https://example.com/test_video.mp4" } }
    end
  
    assert_response :created
  end
end

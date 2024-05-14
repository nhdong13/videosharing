require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index and return videos" do
    (1..5).each { |i| Video.create(title: "Test Video #{i}", description: "Test Description #{i}", url: "https://www.youtube.com/watch?v=SZeD7wewxq8")}
    @videos = Video.all
    get root_url
    assert_response :success
  
    response_body = JSON.parse(response.body)
    assert_equal @videos.to_json, response_body["videos"].to_json
  end
end

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index and return videos" do
    get api_home_index_url
    assert_response :success
  
    response_body = JSON.parse(response.body)
    assert_equal @videos.to_json, response_body["videos"].to_json
  end
end

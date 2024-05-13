require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "user has many videos" do
    user = User.new
    assert_respond_to user, :videos
  end

  test "user videos are destroyed when user is destroyed" do
    user = User.new
    video = user.videos.build

    user.destroy

    assert_not Video.exists?(video.id)
  end
end
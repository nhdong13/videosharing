require "test_helper"

class VideoTest < ActiveSupport::TestCase
  test "should belong to a user" do
    user = User.create(email: "test@gmail.com", password: "123123", password_confirmation: "123123")
    video = Video.new(user: user)
    assert_not_nil video.user, "Video should belong to a user"
  end

  test "should save a valid video" do
    user = User.create(email: "test@gmail.com", password: "123123", password_confirmation: "123123")
    video = Video.new(user: user, title: "test", description: "test description", url: "https://www.youtube.com/watch?v=SZeD7wewxq8")
    assert video.save, "Failed to save a valid video"
  end

  test "should not save a video without a user" do
    video = Video.new
    assert_not video.save, "Saved a video without a user"
  end
end

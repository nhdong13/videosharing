require 'test_helper'

class NotificationChannelTest < ActionCable::Channel::TestCase
  def test_subscribed
    subscribe

    assert subscription.confirmed?
    assert_has_stream "notification_channel"
  end

  def test_unsubscribed
    subscribe
    unsubscribe

    assert_no_streams
  end
end

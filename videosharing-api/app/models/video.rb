class Video < ApplicationRecord
  belongs_to :user
  validates :title, :description, presence: true
  validates :url, presence: true, format: { with: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i }

  after_create :send_global_message

  private

  def send_global_message
    ActionCable.server.broadcast('notification_channel', { video: self.as_json.merge(user: user) })
  end
end

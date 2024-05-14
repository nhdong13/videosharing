class Video < ApplicationRecord
  belongs_to :user
  validates :title, :description, presence: true
  validates :url, presence: true, format: { with: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i }
end

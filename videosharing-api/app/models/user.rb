class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  acts_as_token_authenticatable

  has_many :videos, dependent: :destroy
end

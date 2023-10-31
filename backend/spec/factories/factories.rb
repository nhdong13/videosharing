require 'factory_bot'
require 'faker'

FactoryBot.define do
  password = Faker::Number.number.to_s

  factory :user, class: User do
    email { Faker::Internet.email }
    name { Faker::FunnyName.name }
    password { password }
    password_confirmation { password }
  end
end

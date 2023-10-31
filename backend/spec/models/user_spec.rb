require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    let(:user) { FactoryBot.create(:user) }

    it 'accepts a valid user' do
      expect(user.save).to be_truthy
    end

    it 'validates presence of email' do
      user.email = nil

      expect(user.save).to be_falsey
    end

    it 'validates presence of name' do
      user.name = nil

      expect(user.save).to be_falsey
    end
  end
end

require 'rails_helper'
require_relative '../../support/devise'

RSpec.describe Api::RegistrationsController, type: :request do
  describe 'POST /signup' do
    before(:each) do
      email = Faker::Internet.email
      name = Faker::FunnyName.name
      password = Faker::Number.number.to_s

      @params = {
        user: {
          email: email,
          password: password,
          password_confirmation: password,
          name: name
        }
      }
    end

    context 'User provided available information' do
      it 'should return 200:OK' do
        post '/api/signup', params: @params.as_json, as: :json

        expect(response).to have_http_status(:success)
      end
    end

    context 'User provided invalid email' do
      it 'should responds with unprocessable_entity status' do
        @params[:user][:email] = 'testemail'
        post '/api/signup', params: @params.as_json, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'User missing name' do
      it 'should responds with unprocessable_entity status' do
        @params[:user][:name] = ''
        post '/api/signup', params: @params.as_json, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'User entered not match passwords' do
      it 'should responds with unprocessable_entity status' do
        @params[:user][:password] = '123123'
        post '/api/signup', params: @params.as_json, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end

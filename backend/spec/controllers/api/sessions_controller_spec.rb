require 'rails_helper'
require_relative '../../support/devise'

RSpec.describe Api::SessionsController, type: :request do
  include ControllerMacros

  describe 'POST /login' do
    let(:user) { FactoryBot.create(:user) }
    let(:params) {{ user: {
        email: user.email,
        password: user.password
      }}
    }

    context 'User provided available information' do
      it 'should return 200:OK' do
        post '/api/login', params: params.as_json, as: :json

        expect(response).to have_http_status(:success)
      end
    end

    context 'User provided invalid email' do
      it 'should responds with unauthorized status' do
        params[:user][:email] = 'testemail'
        post '/api/login', params: params.as_json, as: :json

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'User provided invalid password' do
      it 'should responds with unauthorized status' do
        params[:user][:password] += '1'
        post '/api/login', params: params.as_json, as: :json

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /logout' do
    let(:user) { FactoryBot.create(:user) }

    context 'User not logged in' do
      it 'should responds with unauthorized status' do
        delete '/api/logout', as: :json

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'User logged in' do
      it 'should responds with unauthorized status' do
        delete '/api/logout', headers: authorize_headers(user), as: :json

        expect(response).to have_http_status(:ok)
      end
    end
  end
end

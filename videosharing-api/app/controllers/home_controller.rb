class HomeController < ApplicationController
  skip_before_action :authenticate_user_from_token

  def index
    @videos = Video.includes(:user).all.order(created_at: :desc)

    render json: { videos: @videos.as_json(methods: [:user]), status: :ok }
  end
end

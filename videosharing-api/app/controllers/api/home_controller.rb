class Api::HomeController < Api::ApplicationController
  def index
    @videos = Video.all

    render json: { videos: @videos, status: :ok }
  end
end

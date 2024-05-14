class VideosController < ApplicationController
  def create
    @video = current_user.videos.new video_params

    if @video.save
      render json: @video, status: :created
    else
      render json: @video.errors.messages, status: 200
    end
  end

  private

  def video_params
    params.require(:video).permit :title, :description, :url
  end
end

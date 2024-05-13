FROM ruby:3.2.3 AS api

# Default directory
ENV INSTALL_PATH /opt/app/videosharing-api
RUN mkdir -p /opt/app/videosharing-api
WORKDIR /opt/app/videosharing-api
COPY . /opt/app/videosharing-api

# Install gems
RUN gem install rails bundler
RUN bundle install

# Start server
CMD bundle exec puma -C config/puma.rb

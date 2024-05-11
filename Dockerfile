FROM ruby:3.2.3 AS video-sharing

RUN apt-get update

# Default directory
ENV INSTALL_PATH /opt/app
RUN mkdir -p $INSTALL_PATH

# Install node
RUN apt-get install -y build-essential nodejs --no-install-recommends

# Install rails
RUN gem install rails bundler

#RUN chown -R user:user /opt/app
WORKDIR /opt/app

# Run a shell
CMD ["/bin/sh"]

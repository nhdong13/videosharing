FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y build-essential git libpq-dev nodejs libvips pkg-config

WORKDIR /backend
COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend/Gemfile.lock
RUN bundle install
COPY . /backend

# ENV

CMD ["rails", "server", "-p", "3000", "-b", "0.0.0.0"]
EXPOSE 3000

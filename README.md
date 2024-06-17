# VIDEOSHARING

## Introduction
Welcome to Video Sharing! This project is a web app for sharing YouTube videos. 

## Key features:
- Feature 1: User registration and login
- Feature 2: Sharing YouTube videos
- Feature 3: Viewing a list of shared videos
- Feature 4: Real-time notifications for new video shares

## Prerequisites
Before you begin, ensure you have the following software installed:

- **Node.js** (version v22.1.0)
- **npm** (version v10.7.0)
- **PostgreSQL** (version 14.11)
- **Docker** (version 26.1.1)
- **Ruby** (version 3.2.3)
- **Rails** (version 7.1.3.2)

## Installation & Configuration

1. Clone the repository:
    ```bash
    git clone https://github.com/nhdong13/videosharing.git
    cd videosharing
    ```

2. Copy `env-example` into `.env` in `videosharing-api directory

3. At `videosharing` directory, run:
    ```bash
    docker build -t videosharing -f Dockerfile .
    docker-compose build
    ```
  
4. Start the server:
    ```bash
    docker-compose up
    ```

## Database Setup

1. Ensure PostgreSQL is running.
2. Create the database:
    ```bash
    docker-compose run api rails db:create
    ```

3. Run migrations:
    ```bash
    docker-compose run api rails db:migrate
    ```


## Running the Application

1. Open your web browser and navigate to:
    ```
    http://localhost:9000
    ```

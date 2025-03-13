# Core Lab Challenge - Frontend

This repository contains the **Frontend** application for the Core Lab challenge, built with **Next.js 15.2.2** and **Node.js 20.17.0**.

## Technologies Used

The following technologies were used to build the application:

- **NodeJS**: 20.17.0
- **Next.js**: 15.2.2
- **React**: 19.0.0
- **sass**: 1.85.1

## Setup

*This application uses the configuration provided in the backend repository. To run the frontend, ensure you have the backend running first, and follow the steps below.*

### Installation Steps

1. **Clone or fork this repository** to your local machine.
   
2. **Open your terminal** and ensure you're in the project root before running the following commands.

3. **Install the project dependencies**:
   ```bash
   npm install
   ```

4. **Create the `.env.local` file** based on the provided `.env.local.example` file:
   - Rename the `.env.local.example` file to `.env.local`.
   - Modify the following variables according to your backend configuration:

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8000"  # The URL of your backend API
   ```

5. **Run the application**:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Running the Application with Docker

If you prefer to run the application using Docker, follow the steps below:

1. **Build the Docker image**:
   ```bash
   docker build -t corelab-frontend .
   ```

2. **Run a container from the built image**:
   ```bash
   docker run --name corelab-web-container -p 3000:3000 -d corelab-frontend
   ```

3. Open your browser and navigate to `http://localhost:3000` to see the application running in the container.

### Stopping and Removing the Docker Container

To stop and remove the Docker container, follow these steps:

1. **Stop the running container**:
   ```bash
   docker stop corelab-web-container
   ```

2. **Remove the stopped container**:
   ```bash
   docker rm corelab-web-container
   ```


## Next Steps

For further setup and instructions related to the backend, please refer to the [Backend README](https://github.com/caio-ferreira-dev/corelab-api-challenge-php). 🚀

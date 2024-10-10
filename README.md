SoftBlogs Backend
This is the Node.js Express backend for the SoftBlogs platform.

Steps to Start the Application
Local Development
Clone the Repository
Clone the repository to your local machine.

Install Dependencies
Run the appropriate command to install the required dependencies:

npm install
or
yarn install
Set Up Environment Variables
In the root folder, create a .env file and add the following environment variable keys:

ALLOWED_ORIGINS
MONGO_URI
JWT_SECRET
PORT
Start the Development Server
Run the development server using one of the following commands:

npm run dev
or
yarn dev
Access the API
The backend will be running at http://localhost:<PORT>, typically http://localhost:5000.

# Books Shop Server Documentation

Introduction:

This is ready api backend of Books Shop built with node.js, express, mongoose, and mongodb for database.

Tech and Packages we use in this project:

    1. Node.js framework Express.js.
    2. Mongodb use for database.
    3. Mongoose for all schema validation and database connection.
    4. JsonwebToken for create jsonwebtoken.
    5. BcryptJs for password encryption.
    6. Dotenv for use environment variable.
    7. Nodemon for run on dev server.
    8. Redis use for Cache.
    8. Cors for Cors error handling.

Getting Started & Installation:

    For getting started with the application you have to follow the below procedure.

Step 1 : Create and Configure your .env file:

    ⦁	Within the project directory you'll find a .env.example file just rename it as .env and paste your PORT, mongoDB,key,refreshkey.

Step 2: Run the Redis Server in CMD:

    ⦁	To start the Redis Server : redis-server

Step 3 : Running the project:

    ⦁	First npm install for install all packages latest version.
    ⦁	npm run server for to start the server.

Folder Structure & Customization:

    ⦁	In index.js file you will find all declared api endpoint for different route.

    ⦁	/config : This folder contain MongoDB Configuration and Redis Configuration.

    ⦁	/models: This folder contain all model create with mongoose schema validation.

    ⦁	/routes: This folder contain Two routes: userRoutes and booksRoutes.

    ⦁	/middleware : This folder contain authentication middleware and logger middleware.

Configuration & Deployment:

I used Cyclic for hosting this server if you want to hosting on Cyclic just follow their documentation.

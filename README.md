📦 Project Setup — Required Dependencies

Before running the project, make sure you install all dependencies for:

🚀 Frontend (React)

Go inside your frontend folder:

cd fintrack
npm install

Frontend Dependencies

These are automatically installed when running npm install, but listing here for reference:

Package Purpose
react, react-dom Core React library
react-router-dom Frontend routing
axios API calls to backend
zustand Global state management (theme, user store)
bootstrap UI styling
bootstrap-icons Sidebar & UI icons
web-vitals CRA internal tool

If anything is missing, run:

npm install react-router-dom axios zustand bootstrap bootstrap-icons

🖥️ Backend (Node + Express)

Go inside backend folder:

cd backend
npm install

Backend Dependencies
Package Purpose
express Server + API routing
mongoose MongoDB connection
dotenv Load environment variables
cors Allow frontend to call backend
bcryptjs Password hashing
jsonwebtoken JWT authentication
nodemon (dev only) Auto-reload backend during development

Install them manually if needed:

npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install --save-dev nodemon

🗄️ MongoDB Setup

Your teammates must install ONE of these:

Option 1: MongoDB Compass (GUI – easiest)

https://www.mongodb.com/try/download/compass

or

Option 2: MongoDB Community Server

https://www.mongodb.com/try/download/community

After installation, create a database:

Database Name: fintrack

▶️ How to Run the Project
Start Backend
cd backend
npm run dev

Runs at: http://localhost:5000

Start Frontend
cd fintrack
npm start

Runs at: http://localhost:3000

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

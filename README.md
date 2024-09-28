This repository contains the front end application for a sports team management application called TeamTrainer, allowing coaches and athletes to manage workouts and exercises. Coaches can create workouts using a range of exercises drawn from a third party API found at https://api.api-ninjas.com/v1/exercises. The application is a react app which requires connection to a back end service for full functionality. The associated back end API can be found and accessed at the following public git repo: https://github.com/Benjfrench/Backend.git. 

## Table of Contents
 
-[Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)


## Installation
To get started, clone the repository and install all relevant packages. 
1. git clone https://github.com/Benjfrench/capstoneApp.git

2. Install dependencies using the following terminal commands:
npm install @emotion/react
npm install @emotion/styled
npm install @mui/icons-material
npm install @mui/material
npm install @mui/x-date-pickers
npm install @uidotdev/usehooks
npm install axios
npm install dayjs
npm install dotenv
npm install express
npm install mysql2
npm install react
npm install react-calendar
npm install react-dom
npm install react-router-dom
npm install sequelize

3. Start the server
    npm run dev

4. Once application is started, double check which port it is running on. This is where your app can be accessed and is important information for cors configuration.

5. Make sure cors is configured correctly when setting up with back end, to ensure communication between both services. 

## Usage
For full functionality, if not already completed, clone the following github repo found here: https://github.com/Benjfrench/Backend.git and follow the instructions in the attached readme file.  
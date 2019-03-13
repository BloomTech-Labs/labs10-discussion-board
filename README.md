
# Symposium Discussion Board

Symposium is a web application that organizes communication in a way that like-minded people can come together to share and discuss ideas.

## Table of Contents

## Getting Started

git clone https://github.com/Lambda-School-Labs/labs10-discussion-board.git  
cd labs10-discussion-board  

#### Prerequisites
`cd frontend` to get into the Frontend Folder 
`yarn` to install the Frontend Dependencies  
`cd ..` to exit out of the Frontend Folder  
`cd backend` to get into the Backend Folder  
`yarn` to install the Backend Dependencies
  
`knex migrate:rollback` to reset all the migrations (tables)  
`knex migrate:latest` to activate all the migrations (tables)  
`knex seed:run` to activate all the seeds that belong in those migrations

#### Starting Server  
##### Option 1: Concurrently  
While in the Backend Folder use `yarn symposium` to "concurrently" start the backend and frontend servers  

##### Option 2: Start the servers separately  
In the Frontend Folder, use `yarn start`  
In another terminal, in the Backend Folder, use `yarn start`  

## Project Links  

#### Folder Structure and Table Schema
Folder Structure and backend table schema is located in a file called [Structures](./STRUCTURES.md) in this Repository.

#### Lambda School Labs Guidelines for Discussion Board
Guidelines for Lambda Labs - https://docs.google.com/document/d/1KBLXucApsCGYJ2p1jIRjf7sgpsJKtFQhmnBK3LK3w6c/edit

#### Backend Deployment Using Heroku
- Heroku Deployment (Developer View) - https://dashboard.heroku.com/apps/symposium-backend/deploy/github
- Heroku Deployment (Customer View) - https://symposium-backend.herokuapp.com/

#### Frontend Deployment Using Netlify
- Netlify Deployment (Customer VIew) - https://symposium-frontend.netlify.com/

#### Planning and Documentation
- Labs10 Discussion Board - Technical Design Document - https://docs.google.com/document/d/13MCUOP53DrHHWy-G0qtAStnRc2uKt9hD3mWdxzUUarI/edit#
- Lambda Capstone Defense Rubric - https://docs.google.com/spreadsheets/d/1r3kOKVvkILBalLkNLTJFQ-gXf2FoPoaWooLcw2nifUk/edit#gid=0
- Labs10 project Tracking Document - https://docs.google.com/spreadsheets/d/1oIw5MHPLv-zJxscj4Pks7YDlydZNqxrCAmra07q2GWk/edit#gid=1885109639
- Sprint Planning and Check-In - https://www.notion.so/Sprint-Planning-and-Check-In-0ded8fd0bc2c483fa3bb7e8a32d5ba57
- Understanding Scope and Planning - https://docs.google.com/document/d/1ZAQ9mlPf0rFto_DWoGEUjptC23Iu1ra7wVjoon9gebw/edit
- Balsamiq - https://balsamiq.cloud/snv27r3/pryeqxi/r2278

#### Communication
- Github - https://github.com/Lambda-School-Labs/labs10-discussion-board
- Trello - https://trello.com/b/stxWpBla/labs10-discussion-board

## Built With
#### Backend
* Bcrypt JS  
* Concurrently  
* Express  
* Faker  
* JSON Web Token  
* Knex  
* Stripe  

#### Frontend
* React JS
* Redux JS
* Auth0 JS
* Axios
* styled-components

## Authors

[Carlos Andrade](https://github.com/cornielleandres)  
<img src="https://avatars0.githubusercontent.com/u/35614736?s=400&v=4" width="200">  
    
[James Page](https://github.com/jamespagedev)  
<img src="https://avatars1.githubusercontent.com/u/43793595?s=400&v=4" width="200">  
    
[Huthman King](https://github.com/kinghuthman)  
<img src="https://avatars0.githubusercontent.com/u/41485997?s=400&v=4" width="200">  
    
[David Situ](https://github.com/Codechiha)  
<img src="https://avatars2.githubusercontent.com/u/42251292?s=400&v=4" width="200">  
    
[Lucas Beemer](https://github.com/lucasbeemer)  
<img src="https://avatars2.githubusercontent.com/u/40898328?s=400&v=4" width="200">  
  
### License
  
Copyright 2019 © Symposium Discussion Board

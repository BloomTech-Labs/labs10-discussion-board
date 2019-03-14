
# Symposium Discussion Board

Symposium is a web application that organizes communication in a way that like-minded people can come together to share and discuss ideas.

---

## Table of Contents

---

## Getting Started  

`git clone https://github.com/Lambda-School-Labs/labs10-discussion-board.git` 

`cd labs10-discussion-board`  

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

---

## Endpoints  

### Auth API  
  
|Method    |Endpoint                      |Requires                   |Description                                            |
| :------  | :--------------------------: | :-----------------------: | :---------------------------------------------------: |
| POST     | `/auth/register`             | `username`, `password`    | explains the importance of this endpoint              |  
| POST     | `/auth/login`                | `username`, `password`    | allows user to register a username and password       |
| POST     | `/auth/log-back-in/:user_id` | `username`, `password`    | allows users to log in                                |
| POST     | `/auth/auth0-login`          | `email`, `name`, `picture`| User logs in using credentials from accepted platforms|
| POST     | `/auth/stripe`               | `requirement`             | explains the importance of this endpoint              |  

### Auth Registration

Method: **[Post]** `/auth/register`

On Success: Re-directs user to the All Posts Page with Modal thanking User for registering

Parameters:

|Name      |Type           |Required                |Notes                                            |
| :------- | :-----------: | :--------------------: | :---------------------------------------------: |
| username | string        | yes, unique            | username used to log in, no 2 of the same       |  
| password | string        | yes                    | credentials to log in, in combo with username   |
| status   | string        | no                     | gives access to pages not given to other users  |

Example: 

```
{
  "username": "dummy",
  "password": "dummy"
}
```

### Auth Login

Method: **[Post]** `/auth/login`

On Success: Redirects the User to the All Posts Page

Parameters:


|Name      |Type           |Required                |
| :------- | :-----------: | :--------------------: |
| username | string        | yes, unique            |
| password | string        | yes                    |

Example: 

```
{
  "username": "dummy",
  "password": "dummy"
}
```

### Auth0 Login

Method: **[Post]** `/auth/auth0-login`

On Success: Redirects the User to the All Posts Page

Parameters:


|Name      |Type           |Required                |
| :------- | :-----------: | :--------------------: |
| name     | string        | yes                    |
| email    | string        | yes, unique            |
| picture  | image         | yes                    |

User uses credentials from an accepted platform to log-in, such as:  
Facebook  
Github  
Google  
Twitter  

---

### Categories API  
  
|Method   |Endpoint                               |Requires                            |Description                                 |
| :------ | :-----------------------------------: | :--------------------------------: | :----------------------------------------: |
| POST    | `/categories/:user_id`                | `user_id`,`name`                   | Used to create a new UNIQUE Category       |
| GET     | `/categories/`                        | `user_id`,`name`,`created_at`      | Used to show all the categories in the api |  
| POST    | `/categories/followed/:user_id`       | `user_id`                          | Used to allow a user to follow a category  |
| POST    | `/categories/search`                  | `searchText`, `order`, `orderType` | Used to search category by letter/word     |
| GET     | `/categories/category-icons/:user_id` | `categories_icon`, `user_id`       | Used to get specific category icon         |   

---
### POST Category

Method: **[POST]** `/categories/:user_id`

On Success: The New Category will be rendered in the list of categories, console will return the category ID

Parameters:

|Name        |Type           |Required   |Notes                                                             |
| :--------- | :-----------: | :-------: | :--------------------------------------------------------------: |
| user_id    | integer       | no        | used to choose a name/ no name for story post                    |  
| name       | string        | yes       | story input                                                      |
| created_at | bigInteger    | yes       | a UNIX ms timestamp is automatically generated                   |

Example: 

```
{
  "user_id": "10",
  "name": "Announcements",
  "created_at": "1558903890"
}
```
### GET Categories

Method: **[GET]** `/categories/`

Parameters:

|Name        |Type           |Required   |
| :--------- | :-----------: | :-------: |
| user_id    | integer       | yes       |
| name       | string        | yes       |
| created_at | bigInteger    | yes       |
| icon       |               | no        |  

### POST Category Search

Method: **[POST]** `/categories/search`

On Success: The New Category will be rendered in the list of categories, console will return the category ID

Parameters:

|Name        |Type           |Required   |
| :--------- | :-----------: | :-------: |
| searchText | text          | no        |
| order      | asc, desc     | yes       |
| orderType  | string        | yes       |  

Example: 

```
{
  "user_id": "10",
  "name": "Announcements",
  "created_at": "1558903890"
}
```  

### GET Category Icons

Method: **[GET]** `/categories/category-icons/:user_id`

Parameters:

|Name           |Type           |Required   |
| :------------ | :-----------: | :-------: |
| user_id       | integer       | yes       |
| category_icon | iamge         | yes       |  

---
  
### Discussions API  
  
|Method   |Endpoint                                           |Requires                                   |Description               |
| :------ | :----------------------------------------------:  | :---------------------------------------: | :----------------------: |
| GET     | `/discussions/`                                   |`user_id`,`category_id`,`body`,`created at`| Gets all discussions     |  
| GET     | `/discussions/all-by-followed-categories/:user_id`| `user_id`              | Used to get discussions by followed category|
| GET     | `/discussions/discussion/:id/:user_id`            | `id`,`user_id`         | Used to get discussion by discussion ID     |
| GET     | `/discussions/search`                             | `searchText`           | Used to locate discussions for letter/word  |  
| GET     | `/discussions/user/:user_id`                      | `discussion_id`,`user_id`| Used to get discussion by user (moderator)|  
| GET     | `/discussions/category/:category_id/:user_id`     | `category_id`,`user_id`  | Used to get discussions by category       | 
| POST    | `/discussions/:user_id`                           | `discussion_id`,`user_id`,`body`| Used to post a new discussion      |  
| PUT     | `/discussions/:user_id`                           | `discussion_id`,`user_id`       | Used to edit a discussion          |  
| DELETE  | `/discussions/:user_id`                           | `discussion_id`,`user_id`       | Used to delete a discussion        | 

---
### GET Discussions

Method: **[GET]** `/discussions//discussions/category/:category_id/:user_id`

Parameters:

|Name         |Type           |Required   |
| :---------- | :-----------: | :-------: |
| user_id     | integer       | yes       |
| category_id | integer       | yes       | 
| name        | string        | yes       |
| created_at  | bigInteger    | yes       |  

### GET Discussions

Method: **[GET]** `/discussions/all-by-followed-categories/:user_id`

Parameters:

|Name         |Type           |Required   |
| :---------- | :-----------: | :-------: |
| user_id     | integer       | yes       |  

### GET Discussions Search

Method: **[GET]** `/discussions/search`

Parameters:

|Name         |Type           |Required   |
| :---------- | :-----------: | :-------: |
| searchText  | text          | yes       |  

### GET Discussions by User ID (Moderator ID)

Method: **[GET]** `/discussions/user/:user_id``

Parameters:

|Name           |Type           |Required   |Notes                                                         |
| :------------ | :-----------: | :-------: | :----------------------------------------------------------: |
| user_id       | integer       | yes       | this user id refers to the creator of the discussion         |
| discussion_id | integer       | yes       |   |                                   
     
### POST Discussions

Method: **[POST]** `/discussions/:user_id`

On Success: The New Discussion will be rendered in the list of Discussions, console will return the Discussion ID

Parameters: 

|Name           |Type         |Required   |
| :------------ | :---------: | :-------: |
| discussion_id | integer     | yes       |
| user_id       | integer     | yes       |
| body          | text        | yes       |  

---

### Discussion Follows API  
  
|Method |Endpoint                                      |Requires                   |Description                                      |
| :---- | :------------------------------------------: | :-----------------------: | :---------------------------------------------: |
| POST  | `/discussion-follows/:user_id/:discussion_id`| `discussion_id`, `user_id`| Used so users can follow many discussions       | 

---
 
### Discussion Votes API  
  
|Method    |Endpoint                      |Requires                         |Description                                      |
| :------- | :--------------------------: | :-----------------------------: | :---------------------------------------------: |
| POST     | `/discussion-votes/:user_id` | `discussion_id`,`type`,`user_id`| Used to upvote / downvote a discussion          |  

---

### Posts API  
  
|Method  |Endpoint           |Requires                                       |Description                           |
| :----- | :---------------: | :-------------------------------------------: | :----------------------------------: |
| GET    | `/posts/search`   | `searchText`                                  | text to show port and endpoint are up|  
| POST   | `/posts/:user_id` | `discussion_id`,`body`,`created_at`, `user_id`| Used to create a new post            |
| PUT    | `/posts/:user_id` | `post_id`,`body`                              | Used to edit a post                  |
| DELETE | `/posts/:user_id` | `post_id`                                     | Used to delete a post                |  

---

### GET Post Search

Method: **[GET]** `/posts/search`

Parameters:

|Name         |Type           |Required   |
| :---------- | :-----------: | :-------: |
| searchText  | text          | yes       |  
                                  
     
### POST Discussions

Method: **[POST]** `/posts/:user_id`

On Success: The New Discussion will be rendered in the list of Discussions, console will return the Discussion ID

Parameters: 

|Name           |Type         |Required   |
| :------------ | :---------: | :-------: |
| discussion_id | integer     | yes       |
| user_id       | integer     | yes       |
| body          | text        | yes       |
| created_at    | bigInteger  | yes       |   

---

### Post Votes API  
  
|Method   |Endpoint       |Requires                   |Description                                      |
| :------ | :-----------: | :-----------------------: | :---------------------------------------------: |
| POST    | `/post-votes` | `post_id`,`type`,`user_id`| Used to upvote / downvote a post                |  

---
  
### Replies API  
   
|Method   |Endpoint                  |Requires                                 |Description                     |
| :------ | :----------------------: | :-------------------------------------: | :----------------------------: |
| POST    | `/replies/:user_id`      | `body`,`created_at`,`post_id`,`user_id` | Used to reply to post          |
| PUT     | `/replies/:user_id`      | `body`,`reply_id`                       | Used to edit a reply           |
| DELETE  | `/replies/:user_id`      | `reply_id`                              | Used to delete a created reply |   

---
   
### POST Reply

Method: **[POST]** `/replies/:user_id`

On Success: The New Reply will be rendered under the Post/Reply it is replying to, a message will notify you the reply is successful
Parameters: 

|Name           |Type         |Required   |
| :------------ | :---------: | :-------: |
| post_id       | integer     | yes       |
| user_id       | integer     | yes       |
| body          | text        | yes       |
| created_at    | bigInteger  | yes       |  

---

### Reply Votes API  
  
|Method   |Endpoint                 |Requires                     |Description                         |
| :------ | :---------------------: | :-------------------------: | :--------------------------------: |
| POST    | `/reply-votes/:user_id` | `reply_id`,`type`,`user_id` | Used to upvote / downvote a Reply  |    

---

### Users API  
  
|Method   |Endpoint                         |Requires                     |Description                                                 |
| :------ | :-----------------------------: | :-------------------------: | :--------------------------------------------------------: |
| GET     | `/users`                        | `api running`               | Used to get all users                                      |
| GET     | `/users/discussions/:user_id`   | `user_id`                   | Used to get a list of discussions created by the user      |
| GET     | `/users/user/:user_id`          | `user_id`                   | Used to get user by their ID                               |
| GET     | `/users/username/:username`     |  n/a                        | Used to return true if username is already in the database |
| GET     | `/users/email/:email`           |                                  | Used to return true if email is in the database       |
| POST    | `/users/confirm-email`          | `email_confirm_token`            | Used to confirm a user's email                        | 
| POST    | `/users/send-reset-pw-email`    | `email`,`clientIP`               | Used to send a reset-pw email to user                 | 
| PUT     | `/users/reset-password`         | `id`,`password`                  | Used to reset password                                | 
| PUT     | `/users/edit-signature/:user_id`| `user_id`,`signature`,`user_type`| Used to change signature                              | 
| GET     | `/users/token-info`             | `id`, `username`, `email`        | Used to get info from reset-pw-token                  |
| GET     | `/users/search-all`             | `searchText`                     | Used to search for letter/words through whole website | 
| PUT     | `/users/user/:user_id`          | `user_id`,`username`,`oldPassword`,`newPassword`,`email` | Used to update user info      | 
| PUT     | `/users/password/:user_id`      | `user_id`, `oldPassword`,`newPassword` | Used to update password                         | 
| PUT     | `/users/update-email/:user_id`  | `user_id`, `email`, `clientIP`         | Used to update user's email                     | 
| PUT     | `/users/type/:user_id`          |`user_id`, `user_type`                  | Used to change the user_type of a user          | 
| PUT     | `/users/avatar/:user_id`        | `user_id`, `avatarData`                | Used to update a user's avatar                  | 
| PUT     | `/users/avatar-url/:user_id`    | `user_id`, `avatarURL`                 | Used to update a user's avatar via URL          | 
| PUT     | `/users/last-login/:user_id`    | `user_id`                              | Used to update last login                       | 
| DELETE  | `/users/:user_id`               | `user_id`                              | Used to delete a user                           |

---

### Users Notifications API  
  
|Method   |Endpoint       |Requires              |Description                                                           |
| :------ | :-----------: | :------------------: | :------------------------------------------------------------------: |
| GET     | `/user-notifications/user/:user_id`  | `user_id` | Used to get notification by what user has followed       |  
| DELETE  | `/user-notifications/:id/:user_id`   | `id`,`user_id` | Used to delete notification from what user followed |  

---

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

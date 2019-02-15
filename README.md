# labs10-discussion-board

## Project Name: Symposium

# Table of Contents

# Setup, Install and Execute

## Folders/Files Naming

- javascript file names - camelcase (except migration files... use snakecase)
- folder names - all lower case (snake case where needed)

## Folders/Files Structure

- Note: we wanted to seperate frontend/backend into different repos... but they said no

- backend

  - \_\_tests\_\_
  - config
    - middleware
      - errorHandler.js
  - db
    - migrations
      - #####\_create_name.js
    - models
      - users.js
      - categories.js
      - ect...
    - seeds
      - 001-users.js
      - ect...
    - dbConfig.js
  - assets
    - img
      - img1.jpeg
      - img2.jpeg
      - img3.jpeg
  - routes
    - usersRouter.js
    - categoriesRouter.js
    - ect...
  - index.js
  - server.js
  - package.json
  - knexfile.js
  - .gitigno.lock
  - README.md

- frontend
  - design_files
  - public
  - src
    - components
      - Nav.js
      - Logindropdown.js
      - CategoryList.js
      - Buttons.js
      - Ect...
    - store
      - actions
        - actions1.js
        - actions2.js
        - actions3.js
        - ect...
        - index.js
      - reducers
        - reducers1.js
        - reducers2.js
        - reducers3.js
        - ect...
        - index.js
    - pages
      - landing.js
      - register.js
      - login.js
      - ect...
    - \_\_tests\_\_
    - App.js
    - index.js
  - .gitignore
  - package-lock.json
  - package.json
  - README.md
- README.md
- LICENSE (MIT)

# Use Cases

## Backend (Use Cases)

---

## Frontend (Use Cases)

---

# Tech Stack

# Project Links

- Guidelines for Lambda Labs - https://docs.google.com/document/d/1KBLXucApsCGYJ2p1jIRjf7sgpsJKtFQhmnBK3LK3w6c/edit
- Heroku Deployment (Developer View) - https://dashboard.heroku.com/apps/symposium-backend/deploy/github
- Heroku Deployment (Customer View) - https://symposium-backend.herokuapp.com/
- Netlify Deployment (Customer VIew) - https://symposium-frontend.netlify.com/
- Setup Gatsby - https://www.youtube.com/watch?v=5VGu6NWzLs4
- Technical Design Document - https://docs.google.com/document/d/13MCUOP53DrHHWy-G0qtAStnRc2uKt9hD3mWdxzUUarI/edit#
- Trello - https://trello.com/b/stxWpBla/labs10-discussion-board
- Balsamiq - https://balsamiq.cloud/snv27r3/pryeqxi/r2278
- Github - https://github.com/Lambda-School-Labs/labs10-discussion-board
- Lambda Capstone Defense Rubric - https://docs.google.com/spreadsheets/d/1r3kOKVvkILBalLkNLTJFQ-gXf2FoPoaWooLcw2nifUk/edit#gid=0

# Table Schema's

> Single Tables

## users

| Field    | Data Type                  |
| -------- | -------------------------- |
| id       | Int (auto increment)       |
| username | String (unique) (required) |
| password | String (required)          |
| email    | String (optional) (unique) |
| status   | String (required)          |

## categories

| Field   | Data Type                                                  |
| ------- | ---------------------------------------------------------- |
| user_id | foreign Key (id in users table)(user who created category) |
| id      | int (auto increment)                                       |
| name    | string (required)                                          |

## discussions

| Field       | Data Type                          |
| ----------- | ---------------------------------- |
| id          | int (auto increment)               |
| user_id     | foreign key (id in users table)    |
| category_id | foreign key (id in category table) |
| title       | string(required)                   |

## posts

| Field         | Data Type                            |
| ------------- | ------------------------------------ |
| id            | int (auto increment)                 |
| user_id       | foreign key (id in users table)      |
| discussion_id | foreign Key (id in discussion table) |
| body          | text (required)                      |

## user_settings

| Field     | Data Type (note, mods are individual roles assigned to a specific category) |
| --------- | --------------------------------------------------------------------------- |
| user_id   | foreign Key (id in users table)                                             |
| avatar    | Text (optional)(base64, or http link)                                       |
| user_type | String (required) (user, gold-user, admin, and owner)                       |

> Relational Tables

## discussion_votes

- many user_id's can vote on many discussion_id's
- many discussion_id's can have many user_id's vote on it
- one vote per relationship/row between user_id and discussion_id

| Field         | Data Type                         |
| ------------- | --------------------------------- |
| discussion_id | int(foreign key)                  |
| user_id       | int(foreign key)                  |
| type          | bool(1 for upvote 0 for downvote) |

## post_votes

- many user_id's can vote on many post_id's
- many post_id's can have many user_id's vote on it
- one vote per relationship/row between user_id and post_id

| Field   | Data Type                             |
| ------- | ------------------------------------- |
| post_id | int(foreign key)                      |
| user_id | int(foreign key)                      |
| type    | integer(1 for upvote -1 for downvote) |

## category_follows

- many user_id's can have/follow many categories_id's
- many categories_id's can have many user_id's/followers

| Field       | Data Type        |
| ----------- | ---------------- |
| category_id | int(foreign key) |
| user_id     | int(foreign key) |

## discussion_follows

- many user_id's can have/follow many discussion_id's
- many discussion_id's can have many user_id's/followers

| Field         | Data Type        |
| ------------- | ---------------- |
| discussion_id | int(foreign key) |
| user_id       | int(foreign key) |

## users_role_categories

- Many user_id's can have many category_id's
- Many category_id's can have many user_id's
- One role per relationship/row between category_id and user_id

| Field       | Data Type                            |
| ----------- | ------------------------------------ |
| role        | string (required) (super mod, mod)   |
| user_id     | foreign Key (id in users table)      |
| category_id | Foreign Key (id in categories table) |

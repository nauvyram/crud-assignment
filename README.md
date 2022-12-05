# crud-assignment in React/Redux/Saga

## Introduction
Simple User listing with CRUD.


## Functional Description
####Users List 
      -> Show list of users in Table contains id, email, name, address.
      ->   Have one column with Edit and delete user options.
      
####Add/Edit user 
    -> Clicking on add/edit should navigate to other page
    -> Data in edit page should persist even after reloading.
    -> Implement fields with validations ( using Formik ).
    -> Add/Edit user using api from json-server. 
    -> On click of add submit, navigate back to user list user should be added to the list.
    -> On Edit update, navigate back to user list and user in the table should have updated data.
####Delete User
    -> On delete user should be deleted from the table


## Technical Description

- Frontend: React with redux-saga, CSS-SASS
- Backend: json-server

## Usage

**Prerequisites:**

- Install [Node.js](https://nodejs.org/es/) if you haven't yet. Npm is needed but is included installing Node.js.
- Install Yarn package manager (https://yarnpkg.com/)

**Next steps:**

- Install globally the fake API server [json-server](https://github.com/typicode/json-server) I used to focalize in Redux:
```
yarn add -g json-server
```

- Download or clone the repository in your local (https://github.com/nauvyram/crud-assignment.git).

- Install dependencies running the command:
```
yarn install
```

**Running:**

You need to keep opened 2 terminal windows at the same time.

1- The frontend with React:
```
yarn start
```

2- The backend with json-server:
```
json-server --watch db.json --port 4000
```

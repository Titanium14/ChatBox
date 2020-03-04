# ChatBox - A chatroom application where you can chat with a variety of people online!

## Description

ChatBox is a full-stack JS web application, utilising four main technologies: MongoDB, Express, React and Node, otherwise known as the MERN stack. In this app, users are able to enter chatrooms and converse with any users within the rooms. Additionally, users are able to create their own rooms, whether it is public or private is up to their discretion.

## Setup

To run this source code locally:

```sh
# Clone this repo.
git clone https://github.com/Titanium14/ChatBox.git

#-----------------------------------------------------------
# Execute the following commands in the root directory only:
#-----------------------------------------------------------

# Installs all dependencies in root, backend and client.
npm run full-install

# Run the client & server with concurrently.
npm run dev

# Run the server only.
npm run backend

# Run the client only.
npm run client
```

For development, you will need to create a <b>keys_dev.js</b> in the backend config folder:

```
module.exports = {
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET'
};
```

## Technologies used

_Database_

- [MongoDB](https://www.mongodb.com/) - A NoSQL collection-oriented database, formatted in JSON. MongoDB is available locally or as an online service, e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

_Security & Communication_

- [Express](https://expressjs.com/) - A Node.js web app framework utilised as a server, handles web APIs requests, serves files to clients and provides access to the DB.
- [Node](https://nodejs.org/en/) - A JS runtime environment installed on the server for server-side execution of JS code.

_Client_

- [React](https://reactjs.org/) - A reactive, component-oriented, front-end JS library.
- [Reactstrap](https://reactstrap.github.io/) - CSS Framework based on [Bootstrap 4](https://getbootstrap.com/).
- [Redux](https://redux.js.org/) - Application State Management Library

## Authors

- **Wai Jyuen Phang** - [Titanium14](https://github.com/Titanium14)

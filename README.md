**Have a question or suggestion?**
Contact me on [Linkedin](https://www.linkedin.com/in/fernandosmbrito), or open a pull request on this project.

---

**Programming assignment for the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) program.**

# Readable

[![Code Climate](https://codeclimate.com/github/fernandobrito/reactnd-project-readable/badges/gpa.svg)](https://codeclimate.com/github/fernandobrito/reactnd-project-readable)
[![Issue Count](https://codeclimate.com/github/fernandobrito/reactnd-project-readable/badges/issue_count.svg)](https://codeclimate.com/github/fernandobrito/reactnd-project-readable)

> For the Readable project, you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

Built with React, Redux and React Router. This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
For this assignment there was no starter template provided (apart from the simple backend API).

Hosted on: https://reactnd-readable-fernandobrito.herokuapp.com. Due to Heroku's limitation on their free account, it may take a few extra seconds before the first request is served.

---

## Limitations and things that are missing

The assignment did not specify any use of authentication. From the API provided, each user has access to its own set of posts and comments, and can modify or delete any entry.

The focus of the assignment was on functionality, rather than styling, so I did not spend so much time building the UI (no animations, few loading messages, etc). Also, this project has no automated tests.

Lastly, as this was a Redux assignment, it was required that **all** state lives inside Redux, even if it would make more sense to store it locally on a component.

---

## Stack

* [node.js](https://nodejs.org) (v6.10)
* [npm](https://www.npmjs.com) (3.10.10)
* [create-react-app](https://github.com/facebookincubator/create-react-app) (1.0.10) Tool to bootstrap React applications
* [react](https://facebook.github.io/react) (15.6.1)
* [redux](https://github.com/reactjs/redux) (3.7.2) Manage state
* [react-router](https://github.com/ReactTraining/react-router) (4.1.2) Declarative routing for React
* [react-router-redux](https://github.com/reactjs/react-router-redux) (5.0.0) Keep react-router and redux in sync
* [redux-thunk](https://github.com/gaearon/redux-thunk) (2.2.0) Redux middleware for asynchronous action creators
* [redux-form](https://github.com/erikras/redux-form) (7.0.3) Keep form state in a Redux Store
* [revalidate](https://github.com/jfairbank/revalidate) (1.2.0) Form validation
* [semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React) (0.71.3) Official Semantic-UI React integration
* [react-redux-toastr](https://github.com/diegoddox/react-redux-toastr) (7.1.5) React toastr message implemented with Redux
* [lodash](https://github.com/lodash/lodash) (4.17.4) JavaScript utility library

The idea of [Smart and Dumb](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) components was used as much as possible.

---

## API

This applications consumes data from an API designed by Udacity specifically for the assignment, which can be found on [Udacity's GitHub](https://github.com/udacity/reactnd-project-readable-starter).
A copy of their repository is present here (on `server/` folder) so both could be deployed together.

---

## Installation

Install all necessary modules to run the current project.

```bash
$ git clone https://github.com/fernandobrito/reactnd-project-readable
$ cd reactnd-project-readable/
$ npm install
$ cd server/
$ npm install
```

---

## Development

First, start the API backend. It will be served on `http://localhost:5001/api/`:

```bash
$ cd reactnd-project-readable/server/
$ npm start
```

Then, go back to the root of the project and run the development server in another terminal. 
The app will be served with live reloading on `http://localhost:3000`.

```bash
$ cd reactnd-project-readable/
$ npm start
```

**Note to reviewer:** To make deployment easier, I have modified the backend API server so routes live under a `api/` namespace.
If you use the server inside `server/` folder, it should work as expected. In case you want to use the original
server, please start the front-end server passing the API URL as a variable (like below) or update `.env.development`
with the correct API URL.

```bash
$ REACT_APP_API_SERVER=http://localhost:3000 npm start
```

---

## Build

Build the app for production to the `build` folder.

```bash
$ cd reactnd-project-readable/
$ npm run build
```
---

## Lint

Run lint tools.

```bash
$ cd reactnd-project-readable/
$ npm run eslint
```
---

## Deploy

Copy build folder inside `server/` folder and deploy it to Heroku, assuming Heroku remote was added
on the local repository as `heroku`.

```bash
$ rm -rf server/react_build
$ npm run build
$ mv build server/react_build
$ git push heroku `git subtree split --prefix server master`:master --force
```
---

## Contributing

1. Fork it
2. Create your feature branch with specs (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

---

## Contributors

* Fernando Brito ([fernandobrito](https://github.com/fernandobrito))

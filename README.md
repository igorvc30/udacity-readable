[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
# Readable API Server

This is the the final assessment project for Udacity's Redux course where a content and comment web app was develop. 
Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments. 

# Contains New Features!
User will be able to visualize posts by grid or table list and filter by category.
User will be able to sort posts by date, vote and comments count.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Style Guides

  - [Airbnb React/JSX Style Guide] - This style guide is mostly based on the standards that are currently prevalent in JavaScript. Follow [this](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a) tutorial to configure ESLint in VSCode. 
  - [Udacity Git Commit] - This style guide acts as the official guide to follow when commiting to this project.

### Tech

RevYou-front uses a number of open source projects to work properly:

This project was bootstrapped with [Create ReactApp](https://github.com/facebook/create-react-app).

* [React] - A JavaScript library for building user interfaces.
* [Prop-types] - Runtime type checking for React props and similar objects.
* [React Router] - React Router is a collection of navigational components that compose declaratively with your application.
* [Ant Design] - An enterprise-class UI design language and React-based implementation with a set of high-quality React components.
* [ESLint] - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
* [React Redux] - A predictable state container for JavaScript applications.
* [node.js] - A JavaScript runtime built on Chrome's V8 JavaScript engine.
 

## Start Developing

To get started developing right away:

* Install dependencies and start the API server
```sh
$ git clone https://github.com/igorvc30/udacity-readable
$ cd api-server
$ npm install
$ npm node server
```

* In another terminal window, install dependencies and run front-end
```sh
$ cd frontend
$ npm install
$ npm start
```

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

[node.js]: <http://nodejs.org>
[React]: <https://reactjs.org/>
[Prop-types]: <https://www.npmjs.com/package/prop-types>
[React Router]: <https://reacttraining.com/react-router/>
[Ant Design]: <https://ant.design/>  
[ESLint]: <https://eslint.org/>
[Airbnb React/JSX Style Guide]: <https://github.com/airbnb/javascript/tree/master/react>
[Udacity Git Commit]: <https://udacity.github.io/git-styleguide/>
[React Redux]: <https://react-redux.js.org/>

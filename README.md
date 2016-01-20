# robo_betty_alpha [![Build Status](https://travis-ci.org/bluejay112/robo_betty_alpha.svg?branch=development)](https://travis-ci.org/bluejay112/robo_betty_alpha)

### Update 1/12/16 for CSE112 Winter 2016 Students
Use https://cse112bluejay.herokuapp.com/ to access last years version of the app. Happy Refactoring!

### How to install (works best on mac)
1. `sudo npm install -g gulp bower foreman` (if windows, make sure you google "git windows", and use git bash for everything.)
2. make sure you are in the robo_betty_alpha repo dir
3. `sudo npm install`
4. If npm install fails, try to remove the `node_modules` dir and `client/bower_components` dir

### .env File
Each developer needs their own .env file, although there are default values that don't make this completely necessary.

The library for the .env file stuff is here: https://github.com/motdotla/dotenv

The env file goes in the root directory. It's where you put secret keys that you wouldn't want to be visbile on your public code base. Keys/secrets get loaded dynamically through this file, and holds things like mongodb urls, app port numbers, oauth keys. 

tl;dr Any time you see somthing like "env.SOME_VARIABLE", you would add a new line in the .env like "SOME_VARIABLE=123VALUE".

__This .env file should never be pushed to github__

### How to run frontend portion only
1. `gulp frontend`

This will launch a server that will host your angular app.
This server will solely serve your angular files. This will not run our backend.
This server will also be updated when you changed one of the source files.

### How to run backend portion only
1. `gulp backend`

This will only start up the backend. You can use this to quickly test API
routes.

### How To run entire app with our backend
1. `gulp build:dev`
2. `nf start web`

### If you want to run our backend while watching for changes to the frontend
1. Run our entire app with our backend with the steps above
2. In a separate terminal run `gulp frontend:combined`

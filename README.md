# Jumper AI

## Requirements
- NodeJS > 6.9
- NPM
- Docker
- Mongo Client

## How to use

```
$ npm install
$ cd app
$ npm install
$ npm run build
$ cd ..
$ mkdir data
$ docker run -d -p 27017:27017 -v $PWD/data:/data/db mongo
$ mongo localhost/jumper-ai
$ cp server/config.dist.js server/config.js
$ npm start
```

And point your browser to `http://localhost:3000`. Optionally, specify
a port by supplying the `PORT` env variable.

# Rails Project

## Requirements

If you've manage to generate the app, all you
should need is [Postgres.app](http://postgresapp.com).

## Running Locally

A rake command is included to start up Postgres.app
if it isn't running already and then start the Rails
app with Puma at <http://localhost:3000>.

```bash
$ rake start
```

## Deployment

This app is made to be deployed to [Heroku](http://heroku.com)
and should work out of the box as long as the environment variables
from `.env` are set on Heroku using `heroku config:set VARIABLE_NAME=VALUE`.

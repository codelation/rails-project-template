# Rails Project

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/codelation/rails-project-template)

## Requirements

The [codelation-cli](https://github.com/codelation/codelation-cli) gem will install all required software on OS X:

```bash
gem install codelation-cli
codelation development:install
```

## Development Setup

In order to run the project in development, you'll need to install the
required RubyGems and set up your Postgres database:

```bash
bundle install
rake db:setup
```

This will create both an AdminUser and a User record if you need them.
To log in as either, the email and password are `admin@codelation` or `user@codelation.com`,
and the password for both is `password123`. The admin interface is available at `/admin`.

## Running in Development

A rake command is included to start up Postgres.app
if it isn't running already and then start the Rails
app with Puma at <http://localhost:3000>.

```bash
$ rake start
```

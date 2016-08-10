# Rails Project Template

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/codelation/rails-project-template)

## Development Setup

The [Codelation CLI](https://github.com/codelation/codelation-cli) will install all required software on OS X:

```bash
brew install codelation/tools/codelation-cli
codelation development:install
```

In order to run the project in development, you'll need to install the required
RubyGems, NPM Packages, Bower Components, and set up your Postgres database:

```bash
bundle install
npm install
bower install
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
rake start
```

## Vue Icons

TODO: Write how to add/remove icons

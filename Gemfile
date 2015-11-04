source "http://rubygems.org"

ruby "2.2.3"
gem "rails", "4.2.4"

gem "activeadmin", github: "activeadmin"
gem "activeadmin_pro", git: "git@github.com:codelation/activeadmin_pro.git"
# gem "activeadmin_pro", path: "../activeadmin_pro"
gem "autoprefixer-rails"
gem "awesome_print"
gem "coffee-rails"
gem "devise"
gem "fog"
gem "i18n-tasks"
gem "jbuilder"
gem "jquery-rails"
gem "local_time"
gem "mandrill_mailer"
gem "paperclip"
gem "pg"
gem "puma"
gem "sass-rails"
gem "title"
gem "turbolinks"
gem "uglifier"

group :development do
  gem "guard-livereload", require: false
  gem "foreman"
  gem "rack-livereload"
  gem "spring"
  gem "spring-commands-rspec"
  gem "web-console"
end

group :development, :test do
  gem "bundler-audit", require: false
  gem "byebug"
  gem "dotenv-rails"
  gem "factory_girl_rails"
  gem "http_logger"
  gem "pry-rails"
  gem "quiet_assets"
  gem "rspec-rails"
end

group :test do
  gem "database_cleaner"
  gem "guard-rspec"
  gem "rb-fsevent"
  gem "terminal-notifier-guard"
  gem "timecop"
  gem "webmock"
end

group :staging, :production do
  gem "passenger"
  gem "rack-canonical-host"
  gem "rack-timeout"
  gem "rails_12factor"
end

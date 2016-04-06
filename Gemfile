source "http://rubygems.org"

ruby "2.3.0"
gem "rails", "4.2.6"

gem "activeadmin", github: "activeadmin"
gem "active_admin_pro"
gem "autoprefixer-rails"
gem "awesome_print"
gem "codelation_assets"
gem "codelation_pages"
gem "coffee-rails"
gem "delayed_job_active_record"
gem "devise"
gem "devise-async"
gem "fog"
gem "i18n-tasks"
gem "jbuilder"
gem "jquery-rails"
gem "local_time"
gem "paperclip"
gem "pg"
gem "premailer-rails"
gem "rollbar"
gem "sass-rails"
gem "title"
gem "turbolinks"
gem "uglifier"

group :development do
  gem "foreman"
  gem "guard-livereload", require: false
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
  gem "puma"
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
  gem "dalli"
  gem "passenger"
  gem "rack-canonical-host"
  gem "rack-timeout"
  gem "rails_12factor"
end

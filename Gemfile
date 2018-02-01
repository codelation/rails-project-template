source "http://rubygems.org"

ruby "2.3.1"
gem "rails", "4.2.7.1"

# Several Gems are included by the 'codelation_ui' gem

gem "activeadmin", github: "activeadmin"
gem "active_admin_pro"
gem "codelation_ui", github: "codelation/codelation_ui"
gem "codelation_pages"
gem "delayed_job_active_record"
gem "devise"
gem "devise-async"
gem "fog"
gem "jbuilder"
gem "local_time"
gem "paperclip", "~> 5.2.1"
gem "pg"
gem "premailer-rails"
gem "rollbar"
gem "title"

group :development do
  gem "foreman"
  gem "guard-livereload", require: false
  gem "rack-livereload"
  gem "spring"
  gem "web-console"
end

group :development, :test do
  gem "bundler-audit", require: false
  gem "byebug"
  gem "dotenv-rails"
  gem "http_logger"
  gem "pry-rails"
  gem "puma"
  gem "quiet_assets"
end

group :test do
  gem "capybara"
  gem "connection_pool"
  gem "database_cleaner"
  gem "minitest-reporters"
  gem "poltergeist"
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

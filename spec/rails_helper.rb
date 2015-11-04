# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= "test"
require "spec_helper"
require File.expand_path("../../config/environment", __FILE__)
require "capybara/rails"
require "capybara/rspec"
require "database_cleaner"
require "factory_girl_rails"
require "http_logger"
require "rspec/rails"
require "webmock/rspec"

# Needed for stubbing data file uploads
include ActionDispatch::TestProcess

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each {|file| require file }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

# Set up HTTP logging for saving WebMock responses manually because it
# sucks when VCR doesn't work properly and results in a lot of wasted time.
HttpLogger.logger = Logger.new(STDOUT)
HttpLogger.collapse_body_limit = nil
HttpLogger.colorize = true

RSpec.configure do |config|
  config.mock_with :rspec
  config.use_transactional_fixtures = true
  config.infer_base_class_for_anonymous_controllers = false
  config.infer_spec_type_from_file_location!
  config.order = "random"
  config.include Devise::TestHelpers, type: :controller
  config.include FactoryGirl::Syntax::Methods

  config.before(:suite) do
    begin
      DatabaseCleaner.start
    ensure
      DatabaseCleaner.clean
    end
  end

  # Allow Capybara specs to connect to localhost
  config.before(:all, type: :feature) do
    WebMock.disable_net_connect!(allow: "127.0.0.1")
  end
end

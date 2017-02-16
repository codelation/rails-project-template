require File.expand_path("../boot", __FILE__)
require "rails"
require "rails/test_unit/railtie"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
Bundler.require(*Rails.groups)
module RailsProjectTemplate
  class Application < Rails::Application
    config.action_controller.action_on_unpermitted_parameters = :raise
    config.active_record.raise_in_transactional_callbacks = true
    config.generators do |generate|
      generate.helper false
      generate.javascript_engine false
      generate.request_specs false
      generate.routing_specs false
      generate.stylesheets false
      generate.test_framework :minitest
      generate.view_specs false
    end
    config.i18n.enforce_available_locales = true
    config.time_zone = "Central Time (US & Canada)"
  end
end

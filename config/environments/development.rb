Rails.application.configure do
  config.action_controller.asset_host = ENV.fetch("ASSET_HOST", ENV.fetch("HOST"))
  config.action_controller.perform_caching = false
  config.action_mailer.default_url_options = { host: ENV.fetch("HOST") }
  config.action_mailer.delivery_method = :test
  config.action_mailer.preview_path = "#{Rails.root}/spec/mailers/previews"
  config.action_mailer.raise_delivery_errors = true
  config.action_view.raise_on_missing_translations = true
  config.active_job.queue_adapter = :inline
  config.active_record.migration_error = :page_load
  config.active_support.deprecation = :log
  config.assets.debug = false
  config.assets.raise_runtime_errors = true
  config.cache_classes = false
  config.consider_all_requests_local = true
  config.eager_load = false
  config.generators.assets = false
  config.lograge.enabled = true
  config.middleware.insert_after ActionDispatch::Static, Rack::LiveReload, no_swf: true
end
Rails.application.routes.default_url_options[:host] = ENV.fetch("HOST")

HttpLogger.collapse_body_limit = nil
HttpLogger.colorize = true
HttpLogger.ignore = [/localhost:3000/, /livereload/]

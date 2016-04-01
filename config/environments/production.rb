require Rails.root.join("config/cache_store")
require Rails.root.join("config/smtp")
Rails.application.configure do
  config.action_controller.asset_host = ENV.fetch("ASSET_HOST", ENV.fetch("HOST"))
  config.action_controller.perform_caching = true
  config.active_job.queue_adapter = :delayed_job
  config.action_mailer.default_url_options = { host: ENV.fetch("HOST") }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = SMTP_SETTINGS
  config.active_record.dump_schema_after_migration = false
  config.active_support.deprecation = :notify
  config.assets.compile = false
  config.assets.digest = true
  config.assets.js_compressor = :uglifier
  config.cache_classes = true
  config.cache_store = :dalli_store, ENV["MEMCACHIER_SERVERS"].to_s.split(","), CACHE_STORE_SETTINGS
  config.consider_all_requests_local = false
  config.eager_load = true
  config.i18n.fallbacks = true
  config.log_formatter = ::Logger::Formatter.new
  config.log_level = :debug
  config.middleware.use Rack::CanonicalHost, ENV.fetch("HOST")
  config.middleware.use Rack::Deflater
  config.serve_static_files = ENV["RAILS_SERVE_STATIC_FILES"].present?
end
Rails.application.routes.default_url_options[:host] = ENV.fetch("HOST")
Rack::Timeout.timeout = (ENV["RACK_TIMEOUT"] || 20).to_i

Devise::Async.setup do |config|
  config.backend = :delayed_job
  config.enabled = true
  config.queue   = :default
end

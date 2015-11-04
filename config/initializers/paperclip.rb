fog_credentials = {
  provider:                         "Google",
  google_storage_access_key_id:     ENV["GOOGLE_STORAGE_ACCESS_KEY_ID"],
  google_storage_secret_access_key: ENV["GOOGLE_STORAGE_SECRET_ACCESS_KEY"]
}

Paperclip::Attachment.default_options.merge!(
  fog_credentials: fog_credentials,
  fog_directory:   ENV["GOOGLE_STORAGE_BUCKET"],
  storage:         :fog
)

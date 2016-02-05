# Use the `fog` gem to set up Paperclip attachments. Use AWS credentials if they exist,
# otherwise fall back to using Google Cloud Storage credentials if they exist.
# @see https://github.com/fog/fog
# @see https://github.com/thoughtbot/paperclip
if ENV["AWS_BUCKET"]
  fog_credentials = {
    provider:              "AWS",
    aws_access_key_id:     ENV.fetch("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key: ENV.fetch("AWS_SECRET_ACCESS_KEY")
  }

  Paperclip::Attachment.default_options.merge!(
    fog_credentials: fog_credentials,
    fog_directory:   ENV.fetch("AWS_BUCKET"),
    storage:         :fog
  )
elsif ENV["GOOGLE_STORAGE_BUCKET"]
  fog_credentials = {
    provider:                         "Google",
    google_storage_access_key_id:     ENV.fetch("GOOGLE_STORAGE_ACCESS_KEY_ID"),
    google_storage_secret_access_key: ENV.fetch("GOOGLE_STORAGE_SECRET_ACCESS_KEY")
  }

  Paperclip::Attachment.default_options.merge!(
    fog_credentials: fog_credentials,
    fog_directory:   ENV.fetch("GOOGLE_STORAGE_BUCKET"),
    storage:         :fog
  )
end

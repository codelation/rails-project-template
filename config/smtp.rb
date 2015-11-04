SMTP_SETTINGS = {
  address:              ENV["SMTP_ADDRESS"],
  authentication:       :plain,
  domain:               ENV["SMTP_DOMAIN"],
  enable_starttls_auto: true,
  password:             ENV["SMTP_PASSWORD"],
  port:                 "587",
  user_name:            ENV["SMTP_USERNAME"]
}

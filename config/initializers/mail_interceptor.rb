unless Rails.env.production?
  # Intercept emails in staging enviroments.
  # Preview emails in development: http://localhost:3000/rails/mailers
  class MailInterceptor
    def self.delivering_email(message)
      message.to = ["dev@codelation.com"]
    end
  end
  ActionMailer::Base.register_interceptor(MailInterceptor)
end

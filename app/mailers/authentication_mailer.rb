# Mailer class used to send Devise emails using the shared application mailer layout.
class AuthenticationMailer < ApplicationMailer
  def confirmation_instructions(record, token, _opts = {})
    @resource = record
    @token = token
    mail(to: @resource.email)
  end

  def reset_password_instructions(record, token, _opts = {})
    @resource = record
    @token = token
    mail(to: @resource.email)
  end

  def unlock_instructions(record, token, _opts = {})
    @resource = record
    @token = token
    mail(to: @resource.email)
  end
end

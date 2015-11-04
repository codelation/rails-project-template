class AuthenticationMailer < MandrillMailer::TemplateMailer
  include ApplicationHelper
  include Rails.application.routes.url_helpers

  def reset_password_instructions(record, token, _opts = {})
    @token = token
    @user  = record

    mandrill_mail(
      template: "reset-password-instructions",
      to:       @user.email,
      vars:     {
        "USER_NAME" => @user.display_name,
        "RESET_URL" => edit_user_password_url(reset_password_token: @token)
      }
    )
  end
end

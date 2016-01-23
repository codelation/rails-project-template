class AuthenticationPreview < ActionMailer::Preview
  def confirmation_instructions
    set_user

    if @user.respond_to?(:confirmation_url)
      AuthenticationMailer.confirmation_instructions(User.first, "1234567890")
    else
      fail NoMethodError, "You must add `devise :confirmable` to your User model to send confirmation instructions."
    end
  end

  def reset_password_instructions
    set_user

    if @user.respond_to?(:send_reset_password_instructions)
      AuthenticationMailer.reset_password_instructions(@user, "1234567890")
    else
      fail NoMethodError, "You must add `devise :recoverable` to your User model to send reset password instructions."
    end
  end

  def unlock_instructions
    set_admin_user

    if @user.respond_to?(:send_unlock_instructions)
      AuthenticationMailer.unlock_instructions(@user, "1234567890")
    else
      fail NoMethodError, "You must add `devise :lockable` to your User model to send unlock instructions."
    end
  end

private

  def set_admin_user
    @user = AdminUser.first
    fail ActiveRecord::RecordNotFound, "Run `rake db:seed` to create a default User." unless @user
  end

  def set_user
    @user = User.first
    fail ActiveRecord::RecordNotFound, "Run `rake db:seed` to create a default User." unless @user
  end
end

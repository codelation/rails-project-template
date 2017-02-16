module Users
  class SettingsController < ApplicationController
    def edit
      @user = current_user
    end

    def update
      @user = current_user
      update_user(@user, user_settings_params, authenticated_root_path)
    end

  private

    def user_settings_params
      params.require(:user).permit(
        :email,
        :current_password,
        :password,
        :password_confirmation
      )
    end

    # Updates the users credentials securely using their password and redirects them afterwards
    def update_user(user, params, redirect_path)
      update_params = params

      if !update_params[:current_password].to_s.empty? ||
         !update_params[:password].to_s.empty? ||
         !update_params[:password_confirmation].to_s.empty?

        if user.update_with_password(update_params)
          # Sign in the user by passing validation in case their password changed
          sign_in user, bypass: true
          redirect_to redirect_path, notice: "Account updated successfully"
        else
          render :edit, alert: "Failed to update account"
        end
      else
        if user.update_attributes(update_params.except(:current_password, :password, :password_confirmation))
          # Sign in the user by passing validation in case their password changed
          sign_in user, bypass: true
          redirect_to redirect_path, notice: "Account updated successfully"
        else
          render :edit, alert: "Failed to update account"
        end
      end
    end
  end
end

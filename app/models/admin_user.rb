class AdminUser < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :registerable, :timeoutable and :omniauthable
  devise :async, :database_authenticatable, :lockable,
         :rememberable, :trackable, :validatable

  # Returns the name to be displayed for the user. The user's name will be
  # returned if it exists and will fall back to the user's email address.
  # @return [String]
  def display_name
    self.name.blank? ? self.email : self.name
  end
end

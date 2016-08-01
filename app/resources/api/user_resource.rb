module Api
  # Used to create an JSON API representation of User.
  # @see https://github.com/cerebris/jsonapi-resources
  class UserResource < JSONAPI::Resource
    attributes :email, :password

    def fetchable_fields
      super - [:password]
    end
  end
end

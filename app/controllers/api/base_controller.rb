module Api
  # Base class for all API controllers
  class BaseController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include JSONAPI::Utils

  private

    def context
      {}
    end
  end
end

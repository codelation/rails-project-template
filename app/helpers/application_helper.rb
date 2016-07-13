module ApplicationHelper
  include LocalTimeHelper

  # Returns the CSS class to add to the body element.
  # The body class will contain the controller and action names.
  # @return [String]
  def body_class
    body_classes = []
    body_classes << controller.controller_name.dasherize

    # Use the new class for styling the create action
    # and use the edit class for styling the update action.
    if controller.action_name == "create"
      body_classes << "new"
    elsif controller.action_name == "update"
      body_classes << "edit"
    else
      body_classes << controller.action_name.dasherize
    end

    # Allow an additional class to be set by the controller
    body_classes << @body_class if @body_class
    body_classes.join(" ")
  end

  # Returns the JavaScript view name that should be required for the
  # current page based on the current controller and action.
  # @return [String]
  def view_name
    controller_name = controller.controller_name.dasherize
    action_name = controller.action_name.dasherize

    # Use the new class for styling the create action
    # and use the edit class for styling the update action.
    if controller.action_name == "create"
      action_name = "new"
    elsif controller.action_name == "update"
      action_name = "edit"
    end

    "#{controller_name}/#{action_name}"
  end
end

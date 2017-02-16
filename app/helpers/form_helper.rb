module FormHelper
  def form_input_errors(object, field_name)
    if object.errors.any?
      if !object.errors.messages[field_name].blank?
        msg = object.errors.messages[field_name].first

        "<p class='error-message'>#{msg}</p>".html_safe
      end
    end
  end

  def form_error_message(object)
    if object.errors.any?
      "<p class='form-errors'>#{pluralize(object.errors.count, "error")} prohibited this from being submitted</p>".html_safe
    end
  end
end

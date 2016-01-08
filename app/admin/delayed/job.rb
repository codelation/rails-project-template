ActiveAdmin.register Delayed::Job, as: "Background Job" do
  permit_params :priority, :queue, :run_at

  index do
    column :id
    column :queue
    column :priority
    column :attempts
    column :failed_at
    column :run_at
    column :created_at
    column :locked_by
    column :locked_at
    actions
  end

  form do |f|
    inputs "Background Job Scheduling" do
      input :priority
      input :queue
      input :run_at
    end
    actions
  end

  action_item :delete, only: [:edit] do
    link_to "Delete Job", admin_background_job_path(resource),
            data:   { confirm: "Are you sure?" },
            method: :delete
  end

  action_item :scedule_now, only: [:show, :edit] do
    link_to "Schedule Now", run_now_admin_background_job_path(resource),
            method: :post,
            title:  "Cause a job scheduled in the future to run now."
  end

  action_item :reset_job, only: [:show, :edit] do
    link_to "Reset Job", reset_admin_background_job_path(resource),
            method: :post,
            title:  "Resets the state caused by errors. Lets a worker give it another go ASAP."
  end

  member_action :reset, method: :post do
    resource.update_attributes locked_at: nil, locked_by: nil, attempts: 0, last_error: nil
    resource.update_attribute :attempts, 0
    redirect_to action: :index
  end

  member_action :run_now, method: :post do
    resource.update_attributes run_at: Time.now
    redirect_to action: :index
  end
end

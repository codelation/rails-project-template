# The default queue_adapter for development is :inline (jobs will run immediately), and
# the default queue_adapter for production is :delayed_job (jobs will be queued in DB).
#
# Delayed Job is fine for apps that don't require many background jobs, but you will
# want to go with Sidekiq (Redis) or Shoryuken (AWS SQS) for apps that require adding
# many jobs to the queue. They will take the load off the database.
#
# To use Delayed Job in production, you will need to uncomment the worker line in the
# Procfile: `worker: rake jobs:work`.
#
# Basic Syntax for Queuing a Job:
#
#   # Queue the job to have it run as soon as possible in the background:
#   ExampleJob.perform_later(record)
#
#   # Queue the job and wait to run it until the specified date and time:
#   ExampleJob.set(wait_until: Date.tomorrow.noon).perform_later(record)
#
#   # Queue the job and wait for the specified amount of time before running:
#   ExampleJob.set(wait: 1.week).perform_later(record)
#
# Delayed Job Additional Functionality:
#
#   # Queue the performing of any method call:
#   @user.delay.activate!(@device)
#
#   # Queue the job and wait to run it until the specified date and time:
#   Notifier.delay(run_at: 5.minutes.from_now).signup(@user)
#
# More Information:
#
#   @see http://guides.rubyonrails.org/active_job_basics.html
#   @see https://github.com/collectiveidea/delayed_job
#   @see http://sidekiq.org
#   @see https://github.com/phstc/shoryuken
class ExampleJob < ActiveJob::Base
  queue_as :default

  def perform(record)
    record.do_work
  end
end

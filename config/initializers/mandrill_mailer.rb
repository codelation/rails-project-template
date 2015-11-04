MandrillMailer.configure do |config|
  config.api_key = ENV["SMTP_PASSWORD"]

  unless Rails.env.production?
    config.interceptor = Proc.new {|params|
      puts "------------------------------------------------------------"
      puts "                        Mandrill Mailer"
      puts "------------------------------------------------------------"

      ap params

      puts "------------------------------------------------------------"
      puts "                        Mandrill Mailer"
      puts "------------------------------------------------------------"
    }
  end
end

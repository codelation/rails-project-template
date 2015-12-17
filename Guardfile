# A sample Guardfile
# More info at https://github.com/guard/guard#readme

## Uncomment and set this to only include directories you want to watch
# directories %w(app lib config test spec features) \
#  .select{|d| Dir.exists?(d) ? d : UI.warning("Directory #{d} does not exist")}

## Note: if you are using the `directories` clause above and you are not
## watching the project directory ('.'), then you will want to move
## the Guardfile to a watched dir and symlink it back, e.g.
#
#  $ mkdir config
#  $ mv Guardfile config/
#  $ ln -s config/Guardfile .
#
# and, you'll have to watch "config/Guardfile" instead of "Guardfile"

if ENV["LIVERELOAD"]
  guard "livereload" do
    watch(%r{app/admin/.+\.rb})
    watch(%r{app/views/.+\.(erb|haml|slim)$})
    watch(%r{app/helpers/.+\.rb})
    watch(%r{public/.+\.(css|js|html)})
    watch(%r{config/locales/.+\.yml})
    # Rails Assets Pipeline
    watch(%r{(app|vendor)(/assets/\w+/(.+\.(css|html|jpg|js|png|scss))).*}) {|m| "/assets/#{m[3]}" }
  end
else
  guard :rspec, cmd: "bin/rspec" do
    # App Files
    watch(%r{^app/(.+).rb$})                           {|m| "spec/#{m[1]}_spec.rb" }
    watch(%r{^app/(.*)(.erb|.haml|.slim)$})            {|m| "spec/#{m[1]}#{m[2]}_spec.rb" }
    watch(%r{^app/controllers/(.+)_(controller).rb$})  {|m| ["spec/routing/#{m[1]}_routing_spec.rb", "spec/#{m[2]}s/#{m[1]}_#{m[2]}_spec.rb", "spec/acceptance/#{m[1]}_spec.rb"] }
    watch("app/controllers/application_controller.rb") { "spec/controllers" }
    watch(%r{^app/views/(.+)/.*.(erb|haml|slim)$})     {|m| "spec/features/#{m[1]}_spec.rb" }
    watch("config/routes.rb")                          { "spec/routing" }
    watch(%r{^lib/(.+).rb$})                           {|m| "spec/lib/#{m[1]}_spec.rb" }
    watch(%r{^spec/support/(.+).rb$})                  { "spec" }

    # Capybara features specs
    watch(%r{^app/views/(.+)/.*.(erb|haml|slim)$})     {|m| "spec/features/#{m[1]}_spec.rb" }

    # Spec Files
    watch(%r{^spec/.+_spec.rb$})
    watch("spec/rails_helper.rb")        { "spec" }
    watch("spec/spec_helper.rb")         { "spec" }
    watch(%r{^spec/factories/(.+)\.rb$}) { "spec/support/factories_spec.rb" }
    watch(%r{^spec/support/(.+).rb$})    { "spec" }
  end
end

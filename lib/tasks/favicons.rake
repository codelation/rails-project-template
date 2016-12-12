namespace :favicons do
  desc "Build favicons for all platforms"
  task build: :environment do
    ico_sizes = %w(16 32)
    apple_sizes = %w(57 60 72 76 114 120 129 144 152)
    apple_precomposed_sizes = %w(129 152)
    ms_tile_sizes = %w(144)

    favico_dir = "favicons"
    file_favico_dir = "#{Rails.root}/app/assets/images/#{favico_dir}"

    unless File.exists?(file_favico_dir)
      Dir.mkdir file_favico_dir
    end

    favico_template = "#{Rails.root}/app/views/layouts/shared/_favicon.html.erb"
    if File.file?("#{Rails.root}/app/assets/stylesheets/application/variables.scss")

      /\$favico-color:\s*(?<icocolor>#([a-zA-Z0-9]{6}|[a-zA-Z0-9]{3}));/ =~ File.read("#{Rails.root}/app/assets/stylesheets/application/variables.scss")

      unless icocolor
        /\$primary-color:\s*(?<icocolor>#([a-zA-Z0-9]{6}|[a-zA-Z0-9]{3}));/ =~ File.read("#{Rails.root}/app/assets/stylesheets/application/variables.scss")
      end
    end
    icocolor ||= "#333333"


    if File.file?("#{file_favico_dir}/template.png")
      print "Converting template image to favicons..."
      ico_sizes.each do |size|
        (`convert #{file_favico_dir}/template.png -resize #{size}x#{size} #{file_favico_dir}/favicon-#{size}x#{size}.ico`)
      end

      apple_sizes.each do |size|
        (`convert #{file_favico_dir}/template.png -resize #{size}x#{size} #{file_favico_dir}/apple-touch-icon-#{size}x#{size}.png`)
      end

      apple_precomposed_sizes.each do |size|
        (`convert #{file_favico_dir}/template.png -resize #{size}x#{size} #{file_favico_dir}/apple-touch-icon-precomposed-#{size}x#{size}.png`)
      end

      ms_tile_sizes.each do |size|
        (`convert #{file_favico_dir}/template.png -resize #{size}x#{size} #{file_favico_dir}/mstile-#{size}x#{size}.png`)
      end

      (`convert #{file_favico_dir}/template.png -resize 152x152 #{file_favico_dir}/apple-touch-icon.png`)
      (`convert #{file_favico_dir}/template.png -resize 152x152 #{file_favico_dir}/apple-touch-icon-precomposed.png`)
    else
      print "Creating favicons from application..."
      favico_letter = Rails.application.class.parent_name.first

      ico_sizes.each do |size|
        (`convert -background "#{icocolor}" -fill white -size #{size}x#{size} -gravity center label:#{favico_letter} #{file_favico_dir}/favicon-#{size}x#{size}.ico`)
      end

      apple_sizes.each do |size|
        (`convert -background "#{icocolor}" -fill white -size #{size}x#{size} -gravity center label:#{favico_letter} #{file_favico_dir}/apple-touch-icon-#{size}x#{size}.png`)
      end

      apple_precomposed_sizes.each do |size|
        (`convert -background "#{icocolor}" -fill white -size #{size}x#{size} -gravity center label:#{favico_letter} #{file_favico_dir}/apple-touch-icon-precomposed-#{size}x#{size}.png`)
      end

      ms_tile_sizes.each do |size|
        (`convert -background "#{icocolor}" -fill white -size #{size}x#{size} -gravity center label:#{favico_letter} #{file_favico_dir}/mstile-#{size}x#{size}.png`)
      end

      (`convert -background "#{icocolor}" -fill white -size 152x152 -gravity center label:#{favico_letter} #{file_favico_dir}/apple-touch-icon.png`)
      (`convert -background "#{icocolor}" -fill white -size 152x152 -gravity center label:#{favico_letter} #{file_favico_dir}/apple-touch-icon-precomposed.png`)
    end

    puts "done"
    print "Composing layout..."

    File.open(favico_template, 'w') do |f|
      ico_sizes.each do |size|
        f.puts "<%= favicon_link_tag \"#{favico_dir}/favicon-#{size}x#{size}.ico\", rel: 'shortcut icon', type: 'image/x-icon' %>"
      end

      apple_sizes.each do |size|
        f.puts "<%= favicon_link_tag \"#{favico_dir}/apple-touch-icon-#{size}x#{size}.png\", rel: 'apple-touch-icon', type: 'image/png', sizes: \"#{size}x#{size}\" %>"
      end
      f.puts "<%= favicon_link_tag \"#{favico_dir}/apple-touch-icon.png\", rel: 'apple-touch-icon', type: 'image/png' %>"

      apple_precomposed_sizes.each do |size|
        f.puts "<%= favicon_link_tag \"#{favico_dir}/apple-touch-icon-precomposed-#{size}x#{size}.png\", rel: 'apple-touch-icon-precomposed', type: 'image/png', sizes: \"#{size}x#{size}\" %>"
      end
      f.puts "<%= favicon_link_tag \"#{favico_dir}/apple-touch-icon-precomposed.png\", rel: 'apple-touch-icon-precomposed', type: 'image/png' %>"

      ms_tile_sizes.each do |size|
        f.puts "<meta name=\"msapplication-TileImage\" content=\"<%= image_path(\"#{favico_dir}/mstile-#{size}x#{size}\") %>\" />"
      end


      f.puts "<meta name=\"msapplication-TileColor\" content=\"#{icocolor}\" />"
      f.puts "<meta name=\"application-name\" content=\"#{Rails.application.class.parent_name}\">"
    end

    puts "done"
    puts "Add to your views with: <%= render \"layouts/shared/favicon\" %>"
  end
end

require 'gherkin/i18n'
require 'erb'

task :default => [:highlight, :shjs]

Gherkin::I18n.all.each do |i18n|
  iso = i18n.underscored_iso_code

  # Highlight.js

  task :highlight => "highlight.js/gherkin_#{iso}.js"

  file "highlight.js/gherkin_#{iso}.js" => 'highlight.js/template.erb' do
    template = ERB.new(IO.read('highlight.js/template.erb'), nil, '-')
    keywords = Gherkin::I18n::KEYWORD_KEYS.map {|key| i18n.keywords(key)}.flatten.uniq.reverse.map {|kw| kw == '* ' ? '\\\\* ' : kw}.join('|')

    file = File.dirname(__FILE__) + "/highlight.js/gherkin_#{iso}.js"
    File.open(file, 'wb') do |io|
      io.write(template.result(binding))
    end
  end

  # SHJS

  task :shjs => "shjs/gherkin_#{iso}.js"

  file "shjs/gherkin_#{iso}.js" => ["shjs/gherkin_#{iso}.lang", 'shjs/shjs-0.6-src/sh2js.pl'] do
    Dir.chdir('shjs/shjs-0.6-src') do
      begin
        sh "perl sh2js.pl ../gherkin_#{iso}.lang > ../gherkin_#{iso}.js"
      rescue => e
        e.message << "\n\n    You may have to run `[sudo] cpan Parse::RecDescent`\n\n"
        raise e
      end
    end
  end

  file "shjs/gherkin_#{iso}.lang" => 'shjs/template.erb' do
    template = ERB.new(IO.read('shjs/template.erb'), nil, '-')
    keywords = Gherkin::I18n::KEYWORD_KEYS.map do 
      |key| i18n.keywords(key)
    end.flatten.uniq.reverse.map do |kw| 
      kw == '* ' ? '\\* ' : kw.gsub(/'/, "\\'")
    end.join('|')

    file = File.dirname(__FILE__) + "/shjs/gherkin_#{iso}.lang"
    File.open(file, 'wb') do |io|
      io.write(template.result(binding))
    end
  end

  file 'shjs/shjs-0.6-src/sh2js.pl' do
    sh 'wget http://sourceforge.net/projects/shjs/files/shjs/0.6/shjs-0.6-src.zip/download -O shjs/shjs-0.6-src.zip'
    Dir.chdir('shjs') do
      sh 'unzip shjs-0.6-src.zip'
      rm_rf 'shjs-0.6-src.zip'
    end
  end
end


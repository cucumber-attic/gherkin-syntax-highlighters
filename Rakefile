require 'rake/clean'
require 'gherkin/i18n'
require 'erb'

CLEAN.include('*/*.js', 'src-highlite/*.lang')
CLOBBER.include('shjs/shjs-0.6-src/**/*')

task :default => [:highlight, :shjs]

Gherkin::I18n.all.each do |i18n|
  iso = i18n.underscored_iso_code

  # Highlight.js

  task :highlight => "highlight.js/gherkin_#{iso}.js"

  file "highlight.js/gherkin_#{iso}.js" => 'highlight.js/template.erb' do
    template = ERB.new(IO.read('highlight.js/template.erb'), nil, '-')
    keywords = Gherkin::I18n::KEYWORD_KEYS.map {|key| i18n.keywords(key)}.flatten.uniq.reverse.map {|kw| kw == '* ' ? '\\\\* ' : kw}.join('|')

    File.open("highlight.js/gherkin_#{iso}.js", 'wb') do |io|
      io.write(template.result(binding))
    end
  end

  # SHJS

  task :shjs => "shjs/gherkin_#{iso}.js"

  file "shjs/gherkin_#{iso}.js" => ['shjs/shjs-0.6-src/sh2js.pl', "src-highlite/gherkin_#{iso}.lang"] do
    Dir.chdir('shjs/shjs-0.6-src') do
      begin
        sh "perl sh2js.pl ../../src-highlite/gherkin_#{iso}.lang > ../sh_gherkin_#{iso}.js"
      rescue => e
        e.message << "\n\n    You may have to run `[sudo] cpan Parse::RecDescent`\n\n"
        raise e
      end
    end
  end

  file 'shjs/shjs-0.6-src/sh2js.pl' do
    unless File.exist?('shjs/shjs-0.6-src/sh2js.pl') # Rake bug?
      sh 'wget http://sourceforge.net/projects/shjs/files/shjs/0.6/shjs-0.6-src.zip/download -O shjs/shjs-0.6-src.zip'
      Dir.chdir('shjs') do
        sh 'unzip shjs-0.6-src.zip'
        rm_rf 'shjs-0.6-src.zip'
      end
    end
  end

  # Source Highlight

  file "src-highlite/gherkin_#{iso}.lang" => 'src-highlite/template.erb' do
    template = ERB.new(IO.read('src-highlite/template.erb'), nil, '-')
    keywords = Gherkin::I18n::KEYWORD_KEYS.map do 
      |key| i18n.keywords(key)
    end.flatten.uniq.reverse.map do |kw| 
      kw == '* ' ? '\\* ' : kw.gsub(/'/, "\\'")
    end.join('|')

    File.open("src-highlite/gherkin_#{iso}.lang", 'wb') do |io|
      io.write(template.result(binding))
    end
  end

end


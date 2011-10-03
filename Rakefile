require 'gherkin/i18n'
require 'erb'

task :default => :generate

desc 'Generate modes'
task :generate do
  template = ERB.new(IO.read(File.dirname(__FILE__) + '/gherkin.js.erb'), nil, '-')
  Gherkin::I18n.all.each do |i18n|
    keywords = Gherkin::I18n::KEYWORD_KEYS.map {|key| i18n.keywords(key)}.flatten.uniq.reverse.map {|kw| kw == '* ' ? '\\\\* ' : kw}.join('|')
    file = File.dirname(__FILE__) + "/i18n/gherkin.#{i18n.underscored_iso_code}.highlight.js"
    File.open(file, 'wb') do |io|
      io.write(template.result(binding))
    end
  end
end
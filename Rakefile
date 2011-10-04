require 'gherkin/i18n'
require 'erb'

task :default => ['highlight.js']

desc 'Generate highlight.js'
task 'highlight.js' do
  template = ERB.new(IO.read(File.dirname(__FILE__) + '/highlight.js.erb'), nil, '-')
  Gherkin::I18n.all.each do |i18n|
    keywords = Gherkin::I18n::KEYWORD_KEYS.map {|key| i18n.keywords(key)}.flatten.uniq.reverse.map {|kw| kw == '* ' ? '\\\\* ' : kw}.join('|')
    file = File.dirname(__FILE__) + "/highlight.js/gherkin.#{i18n.underscored_iso_code}.highlight.js"
    File.open(file, 'wb') do |io|
      io.write(template.result(binding))
    end
  end
end

This is a Gherkin mode for [Highlight.js](http://softwaremaniacs.org/soft/highlight/en/). Usage:

```html
<link href="path/to/style.css" rel="stylesheet">
<script src="path/to/highlight.js"></script>
<script src="path/to/gherkin.en.highlight.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

Then just put Gherkin source in `<pre><code>` tags:

```html
<pre><code>Feature: Hello
  Scenario: World
</code></pre>
```

See index.html for an i18n example.

# Hacking

Get the latest highlight.js code and install gherkin so you can generate the highlighters:

    git submodule update --init
    gem install gherkin

Generate the i18n highlighters:

    rake

Eyeball the highlighted Gherkin:

    open index.html

If you have fixed something, commit it to your fork of the repo and send a pull request.

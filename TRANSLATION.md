# Translation

This document will serve as instructions for adding new languages to the site. For now it's just a placeholder for topics I will need to write out in more detail.

## Internationalization
Quickly explain why we use i18n so nobody has to go look it up later :)

## YAML: Strings and Quotes
- if a string contains quotes, tis all good
- if it starts with a quote, you need to wrap it in quotes (single quotes are recommended, maybe mention why)

## HTML in the translation
unfortunately there are some blocks that requier html in the translation. in these, you need to make sure the handlebar template has three braces, not 2.

{{ i18n.page.section.content }} becomes {{{ i18n.page.section.content }}}

also, we can access a few key variables in the translation files. these were originally stored in src/data.yml but now are directly in the grunt file `grunt.initConfig / assemble / options`. These cannot be accessed with handlebars format, they need to be targetted like this `<%= assemble.options.downloads_dir %>`

## Directories
if we need internal links in the text, the main site uses the format `{{ base_dir }}wallets/`. In order to properly create a direct link in this system, one would write `<a href="<%= assemble.options.base_dir %>ja/wallets/">` in the text. However, since there are no nested directories, we can get away with a shortcut in the links. I recommend internal links between pages are written as follows: `<a href="wallets/">` This keeps us on the current language and makes the YAML easier to read by humans.

## Language codes
- language code will be used in a few places:
  - <html lang="{{ i18n.lang.code }}" prefix="og: http://ogp.me/ns#">
  - grunt.file.readYAML(`src/i18n/${lang}.yml`);
  - cashshuffle.com/LANGUAGE-CODE/wallets/
- So it's best if they all match (to avoid confusion)


## Assemble
Explain, in detail, how the Gruntfile works. Perhaps show the old list of assemble files and show the new format as if you could see the output of the i18nTarget() function.

Also, mention that language files are not watched. This is because the i18nTarget function is not called before re-assembling. It could be implemented, perhaps with assemble steps https://assemble.io/docs/Methods.html but at the moment it's probably not worth the effort

## How to add a new language
This really needs to be written simply and in-depth. Perhaps even give instructions they can follow along with


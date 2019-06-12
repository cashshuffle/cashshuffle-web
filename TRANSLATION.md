# Translation

This document will serve as instructions for adding new languages to the site. For now it's just a placeholder for topics I will need to write out in more detail.

## Internationalization
Quickly explain why we use i18n so nobody has to go look it up later :)

## YAML: Strings and Quotes

## Language codes
- language code will be used in a few places:
  - <html lang="{{ i18n.lang.code }}" prefix="og: http://ogp.me/ns#">
  - grunt.file.readYAML(`src/i18n/${lang}.yml`);
  - cashshuffle.com/LANGUAGE-CODE/wallets/
- So it's best if they all match (to avoid confusion)


## Assemble
Explain, in detail, how the Gruntfile works. Perhaps show the old list of assemble files and show the new format as if you could see the output of the i18nTarget() function.

Also, mention that language files are not watched. This is because the i18nTarget function is not called before re-assembling. It could be implemented, perhaps with assemble steps https://assemble.io/docs/Methods.html but at the moment it's probably not worth the effort



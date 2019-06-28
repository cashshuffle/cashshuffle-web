# Translation & Internationalization

This document contains instructions and information for adding new languages to the CashShuffle.com website.

## Quickstart Guide
Let's walk through adding a new language to the CashShuffle website. In this case we'll use German as an example.

### Step 1: Create the new language file
Find the English language file located at `src/i18n/en.yml` and make a copy of it. Have all the strings translated and reviewed, and then put back into a new file in the exact same format. Since this is German, we'll name our new file `src/i18n/de.yml`.

### Step 2: Add the new language to Grunt
Open the `Gruntfile` located in the root directory and look for the `assemble` task. The code should look something like this:
```
    // Build the HTML files from our templates
    assemble: {
      options:{
        layoutdir: 'src/layouts',
        flatten: true,
        layout: 'default.hbs',
        ...
        twitter_creator:  'cashshuffle',
        production: IS_PRODUCTION
      },
      root: i18nTarget('en', true),
      ja: i18nTarget('ja')
    },
```
We're going to let Grunt know that German is now available to process by adding a line to the end of that block as shown below:
```
      },
      root: i18nTarget('en', true),
      ja: i18nTarget('ja'),
      de: i18nTarget('de')
    },
```

### Step 3: Add the new language to the language select menu
Open the file `src/partials/i18n.hbs` and add a new list element to the HTML. In our case we're going to copy this code...
```
      {{!-- English --}}
      {{# if i18n.lang.en }}
      <li class="i18nModal-languageBtn selected">
        <p>English</p>
      </li>
      {{ else }}
      <li class="i18nModal-languageBtn">
        <a role="button" href="/{{this.path}}">English</a>
      </li>
      {{/ if }}
```
...and duplicate it with our German language code as shown below:
```
      {{!-- German --}}
      {{# if i18n.lang.de }}
      <li class="i18nModal-languageBtn selected">
        <p>Deutsche</p>
      </li>
      {{ else }}
      <li class="i18nModal-languageBtn">
        <a role="button" href="/{{this.path}}">Deutsche</a>
      </li>
      {{/ if }}
```
### Step 4: Build!
Rebuild the site with Grunt and the new language should be available on the site.
Due to limitations of the current design, you will need to rebuild with grunt every time you make changes to a localization file.
If you have any issues, the information below should help you troubleshoot.

## More Information

### YAML: Strings and Quotes
If you're not used to YAML, it may be strange to see a lack of quotes around the strings in the language files.
Basically, all the strings in the site are fine without quotes.
Even if quotes appear in the middle of the string it's ok.
However, if a string **begins** with quotes, you will need to escape the string following yaml standards.
The easiest way to do that is usually wrap the entire string in single quotes and use `\'` when you need a single quote.

### Handlebars wants to encode your HTML
Unfortunately there are some blocks that simply require HTML in the middle of the string.
Not only does this make it a bit tougher for the translator, we have to be careful that we present the HTML in it's raw form.
We do that with a change to the template files.

For example, this string in a template file:

`{{ i18n.page.section.content }}`

Any text in that string will be escaped automatically to follow HTML rules so you can type your content normally.
In order to use raw HTML you must change it to three braces like this:

`{{{ i18n.page.section.content }}}`

Now you can insert raw HTML.
However since it is raw HTML, you must also use appropriate HTML escape characters in ***all*** translation files for that string.
Specifically:

- `"` --> `&quot;`
- `&` --> `&amp;`
- `'` --> `&#x27;`
- `<` --> `&lt;`
- `>` --> `&gt;`

Within html tags, please follow standard escaping rules.

### Prevent line breaks on specific content
Especially for languages like Chinese and Japanese that do not use whitespace to separate words, browsers often insert line breaks in places that are inappropriate and make reading more difficult.
If there are some specific words or phrases that you want to ensure are not split by a line break, you can use this tag:

`<span class="keep-together">プライバシー</span>`

Make sure to change the template to triple braces `{{{...}}}` and follow the rules above about raw HTML.

### Accessing variables within our language files
There are a few variables defined in the Grunt file that we may need to access from within our language files. Those variables are:
```
        base_dir:         '/',
        css_dir:          '/_assets/css/',
        js_dir:           '/_assets/js/',
        img_dir:          '/_assets/img/',
        svg_dir:          '/_assets/svg/',
        downloads_dir:    '/downloads/',
        base_url:         'https://cashshuffle.com',
        twitter_site:     'cashshuffle',
        twitter_creator:  'cashshuffle',
```
We cannot simply use the Handlebars format as in the rest of the site, but we can still access them. If we wanted to access the `downloads_dir` we would use this code `<%= assemble.options.downloads_dir %>`.

### But the base directory variable doesn't work
In the Grunt file the `base_dir` variable is updated for each language. Unfortunately, for some reason we can't access that updated variable within the language files. So although the consistent way to write internal links to other pages would be `<a href="<%= assemble.options.base_dir %>wallets/">` , you'll need to hard code the language directories in like this `<a href="/de/wallets/">`

### Language files are not watched by Grunt
It is possible to monitor the language files with grunt but due to limitations of the current design, grunt does not include language file changes in the build.
Please manually re-run Grunt in order to process the changes.

### What does i18n mean?
It's the strange-yet-common abbreviation for "internationalization". It basically means "the letter i plus 18 letters plus the letter n."

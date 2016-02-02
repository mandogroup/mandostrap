# Mandostrap (name to be changed) 

*This is a work in progress*


## RoadMap

 - Style guide generator v 0.1
 - KSS commenting as standard v 0.1.5
 - Reusable design patterns and components v 0.2  
 - Flexbox working standards v 0.3
 - Regression testing v 0.4
 - SVG standards v 0.5
 - Project Rename v 0.6
 - Github Website v 1.0
 - JS standards v 1.1
 - JS OO programming v 1.1.5
 - JS Frameworks / dependency injection  v 1.2
 - JS Unit testing 1.2.5

## Setup and Dependencies

Mandostrap is a front end *skeleton assets project* project for speeding up component/template development for a websites.

### Set up 

Current dependencies

- Node
- Git
- Grunt
- Bower


### Package manager

We currently use **Bower** as our package manager, listed below are our common dependencies Not all packages will be needed on every project so remove ones that are not needed or used.

    normalize-css   : "~3.0.3", // Reset for CSS styles
    jquery          : "~2.1.4", // jQuery no explanation needed 
    slick-carousel" : "~1.5.9", // Carousel plugin
    enquire         : "~2.1.2", // A library for responding to CSS media queries.
    susy            : "~2.2.7"  // CSS grid system


### Task manager

We currently use **Grunt (0.4.5)** as our task manager, listed below are our tasks 
    
    autoprefixer         : "^6.0.3", 
    // Add prefix to css ('ie 9','last 2 versions')
    
    grunt-bake           : "^0.3.15", 
    // Bake static pages for production while using modular files while in development.
    
    grunt-bowercopy      : "^1.2.3", 
    // Copies dependencies to where you want them in your repository
    
    grunt-contrib-concat : "^0.5.1",
    // Concatenate files.

    grunt-contrib-jshint : "^0.11.3",
    // Validate files with JSHint
    
    grunt-contrib-uglify : "^0.10.0",
    // Minify javascript files with UglifyJS
    
    grunt-contrib-watch  : "^0.6.1",
    // Run predefined tasks whenever watched file patterns are added, changed or deleted

    grunt-grunticon      : "^2.2.2",
    // grunticon is a task that makes it easy to manage icons and background images for all devices

    grunt-html           : "^5.0.1",
    // plugin for html validation, using the vnu.jar markup checker.

    grunt-modernizr      : "^1.0.1",
    // Crawls your project for Modernizr test references and save out a minified, uglified, customized version.

    grunt-postcss        : "^0.6.0",
    // Applies several post-processors to your CSS

    grunt-real-favicon   : 0.1.3
    // Generate a multiplatform favicon for all devices

    grunt-sass           : 1.1.0-beta"
    // Compile Sass to CSS using node-sass (removes the need for ruby)

    grunt-svgmin         : 3.1.0
    // Minify SVG using SVGO

    matchdep             : "1.0.0
    // Use globule to filter npm module dependencies by name.

We have two registerTasks: 

**Dev:**

**Default:**


## 1. File Structure

 - /assets/ 
  - /fonts/         - All Fonts files used on the site
  - /icon/          - All Icon fonts & SVG icons are stored here
    - /raw/         - Raw SVG 
    -  /output*/   
    -  /minified*/
  - /img/            - Any hard coded images are stored here
  - /styles/         - Website styling are placed here Any CSS or Scss files
    - /base/         - Base styles for the website (e.g. forms, links, etc)
    - /components/   - Specific pieces of UI
    - /objects/      - Structure/Skeleton of the website
    - /settings/     - Variable Settings (e.g. brand colours, grid layout, etc)
    - /tools/        - Common Scss mixins 
    - /trumps/       - Overwriting styles (e.g. print stylessheets, hack, etc)
    - /vendors*/     - Plugin css/Scss styles
    - main.css*
    - main.css.map*
    - main.scss
  - /js/              - All JS logic and Dom manipulation is here
    - /conditional/   
    - /lib*/
    - /mando
      - /logic/
      - /ui/
    -  /vendor*/


(*) These folders/files are produced after the task runner is initialized.

# 2. HTML Standards

### 2.1 Spaces and Indentation

- Use 2 spaces instead of tabs for indentation
- Nested elements should be indented once (two spaces).
- Always use double quotes, never single quotes, on attributes.
- Don’t omit optional closing tags (e.g. </li> or </body>).

### 2.2 Attribute order

HTML attributes should come in this particular order for easier reading of code.

1. class
2. id, name
3. data-*
4. src, for, type, href, value
5. title, alt
6 .role, aria-*

##### Example
```<a class="..." id="..." data-toggle="..." href="#">Example Link</a>```

### 2.3 HTML standards

!!

### 2.5 Icon fonts vs SVG

SVG's are preferred over iconfonts and sprites. Grunticon is used so that fallbacks are created. 
Grunticon has the ability to embed SVG's in the document using Javascript. This can be done by adding a `span` with the `.icon-[name of icon]` class and adding `data-grunticon-embed` as an data attribute to the element.

## 3. CSS Standards

*This is a work in progress and needs to reviewed*

These standards are only applied to **Scss/Sass** and not **Output CSS**. 

### 3.1 Spaces and Indentation
- Use 2 spaces instead of tabs for indentation
- Opening braces **must** have 1 space between them and the last selector
- The closing brace **must** be on it's own line
- 1 space **must** separate the declaration property and the value. This space should follow the colon. There should be no space between the property and colon
- There **must not** be trailing whitespace on declarations
- Blank lines may be used to separate blocks of code but no more than 2 blank lines should be used
- Indent all block content
- When grouping selectors, individual selectors **must** be on separate lines
- There **must** be a blank line at the end of every file
- Nested Pseudo Classes and Pseudo Elements *should* follow all declarations
- There **must** be 1 blank line between nested elements and declarations
- Nested Selectors *should* be last
- You *should not* nest more than three levels deep

Example

    .c-nav {
      height: 120px;
      width: 100%;
      background-color: #ebe;

      &:before {
        content: 'The nav is here:';
        display: inline;
        padding: 10px 20px;
      }

      &__item {
        display: inline;
        padding: 10px 20px;

        &:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          &__item {
            display: block;
            text-align:center;
          }
        }
      }
    }

### 3.3 Declaration Order
- Declarations **must** be on their own line
- Vendor prefixes **must** immediately preceed their unprefixed version.
- Declarations *should* be ordered by group (`Content`, `Position`, `Box Model`, `Visual`, `Typography`, `Misc`)
- Extends *should* be listed at the top of the declaration
- Mixins and Functions *should* follow Extends
- Mixins with one clear function (such as providing a fallback) *should* be placed within correct group (e.g. `font-size`, `linear-gradient` and `transition` mixins)

Example

    .item {
      @extend .link;
      @include decoration(wide);

      // Content
      content: '';

      // Positioning
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;

      // Box model
      clear: both;
      display: block;
      float: left;
      margin: 20px 0;
      padding: 10px;
      height: 120px;
      width: 100%;
      max-height: 120px;
      max-width: 800px;
      overflow: hidden;

      // Visual
      background-color: #ebe;
      border-radius: 5px;
      opacity: 1;

      // Typography
      color: #000;
      font-family: 'Arial', sans-serif;
      @include font-size(16);
      line-height: 1.2;
      text-align: left;
      text-decoration: none;
      text-indent: 0;

      // Misc
      // Can be used for any styles that do not fit into these groups
      // e.g. transition: all 0.5s;

    }

### 3.4 Value Formatting
- Do not use unit values after `0` values
- Use shorthand properties where possible
- If only overriding one value your *should* use longhand form to avoid unnecessary changes
- Use 3 character Hexademical values when possible
- Use single quotation marks instead of double
- Always wrap strings in quotations
- Values in `font-family` should all be individually wrapped in quotes except for fallback values (e.g. `sans-serif, serif, monotype`)
- Values **must** end with semi-colon
- Include leading 0's in values for legibility (e.g. `font-size: .9em;` should be written `font-size: 0.9em;`)

Example

    .item {
      margin: 20px 5px;
      padding: 0 10px;
      color: #000;
      font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
      font-size: 0.9em;
      background: transparent url('/images/pattern.png') 0 0 repeat-x;
      border: 1px solid #ebe;
    }

    @media (max-width: 600px) {
      .item {
        margin-bottom: 10px;
      }
    }

### 3.5 Commenting
- Comment tags *should* be a double slash `//`.
- Inline comments describing a declaration **must** be placed at the end of the value with a space either side of the comment tag
- Block level comments about a **must** should be placed immediately above the selector and have one blank line above
- Use comments to describe any elements that the code is unclear. 

##### 3.5.1 KSS / Styleguide Commenting ( To be added  )

Example

    .nav {
      width: 100%
    }

    // Comment about this item
    .item {
      margin: 20px 5px; // Comment describing this properties effect
      padding: 0 10px;
      color: #000;
      border: 1px solid #ebe;
    }

### 3.6 Mobile first approach

Here at Mando we believe in mobile first and thats how we approach our CSS... nothing more we can say really.

### 3.7 CSS Naming spacing
 
**.o-** : Signify that something is an Object, and that it may be used in any number of unrelated contexts to the one you can currently see it in. Often used to Signify structure of a template for example a side column or header 

**.c-** : Signify that something is a Component. This is a concrete, implementation-specific piece of UI.

**.u-** : Signify that this class is a Utility class and it has a very specific role. these classes should not be bound onto or changed.

**._-** : Signify that this class is a hack! Sometimes we need to add a class in our markup in order to force something to work, but these classes are only a temporary fix.

**.js-** : Signify that this element has some behavior acting upon it via JavaScript.

**.is- / .has-** : Signify that the piece of UI in question is currently styled a certain way because of a state or condition.

### 3.8 CSS Naming Convention

We use a BEM (Block Element Modifier) naming convention and incorporating the namespacing discussed above.

``` .<Namespace>-[Block]__[Element]--[Modifier] ```

- Block: represents the higher level of an abstraction or component.
- __Element: represents a descendant of .block that helps form .block as a whole.
- --Modifier: represents a different state or version of .block.

e.g. ```c-feature__image--large```


## 4. JS Standards (Coming soon) 




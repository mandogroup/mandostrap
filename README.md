Mando Strap
=========

### Styleguides and Commenting
Styleguides are automatically generated with [sassdown](https://github.com/nopr/sassdown) which parses [Markdown](https://daringfireball.net/projects/markdown/) comments contained in SASS files.

There are two kinds of comments you can use on a project, the first is a SASS comment which will be ignored by [sassdown](https://github.com/nopr/sassdown):

```
// This is a SASS comment and will be ignored by [sassdown](https://github.com/nopr/sassdown)
```

The second is a CSS comment and will be used by [sassdown](https://github.com/nopr/sassdown) in the styleguide documentation

```
/* This is a CSS comment and will be used as documentation for styleguides */
```

### Comment Structure

Styles should be documented using a title (H3) followed by a brief description or any supporting documentation. An indented code example should then be used to show best practise. This will be rendered within the styleguide using the stylesheet. Each element/example should be wrapped in it's own comment tags.

```
/*

### Placeholder

Brief description of the input placeholder

    <input type="text" placeholder="This is placeholder text">

*/
```

[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
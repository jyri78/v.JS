# [Vanilla JavaScript](https://github.com/jyri78/v.JS)

> [🇪🇪  Loe eesti keeles](https://github.com/jyri78/v.JS/blob/master/README.et.md)

Tiny plain Javascript `class` with a set of common functions.

The reason I did this project is that every time I started a new project, I first created some helper functions to use. Over and over again. So I decided to create this tiny "library" of functions to use instead of re-creating.

## Browser support

Targeted are ES11 (ECMAScript 2020) supporting browsers, released since about mid 2020, like Chrome 85+, Edge 85+, Firefox 77+, Opera 71+, and Safari 13.1+.

## Usage

Include `v.min.JS` into HTML file and call `register()` function:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>My Homepage</title>
    <script src="script/v.js"></script>
    <script>VJS.register()</script>
</head>
<body>

    <!-- Body content... -->

</body>
</html>
```

And you are ready to use functions, for example:

```JavaScript
// Gets element by ID "myElem"
const myElem = $("#myElem");  // or `$i("myElem")`
```

## Functions

List of functions you can see [here](https://github.com/jyri78/v.JS/blob/master/CHEATSHEET.md).

## Licence

Licensed under the GNU General Public License v3.0 or later (see [GPL-3.0-or-later](https://github.com/jyri78/v.JS/blob/master/LICENSE)).

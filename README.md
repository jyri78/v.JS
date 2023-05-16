# [Vanilla JavaScript](https://github.com/jyri78/v.JS)

Simple plain Javascript `class` with a set of common functions.

**Warning!** This project is under early development stage.

## Browser support

Targeted are ES11 (ECMAScript 2020) supporting browsers, released since about mid 2020, like Chrome 85+, Edge 85+, Firefox 77+, Opera 71+, and Safari 13.1+.

## Usage

Include `v.JS` into HTML file and call `register()`:

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

## Licence

Licensed under the GNU General Public License v3.0 or later (see [GPL-3.0-or-later](https://github.com/jyri78/v.JS/blob/master/LICENSE))

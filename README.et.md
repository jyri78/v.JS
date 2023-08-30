# [Vanilla JavaScript](https://github.com/jyri78/v.JS)

> [🇺🇸  Read in English](https://github.com/jyri78/v.JS/blob/master/README.md)

Pisike JavaScript'i `class` üldkasutatavate funktsioonidega.

Põhjus, miks ma selle projekti tegin, on see, et iga kord, kui ma uut projekti alustasin, tegin mõned abifunktsioonid. Ikka jälle ja jälle. Nii otsustasingi luua selle pisikese "teegi" funktsioonidega, mida kasutada, selle asemel, et iga kord uuesti luua.

## Veebilehitseja tugi

Suunatud on ES11 (ECMAScript 2020) toetavad veebilehitsejad, mida on väljastatud alates umbes 2020-ndate keskpaiku, näit. Chrome 85+, Edge 85+, Firefox 77+, Opera 71+ ja Safari 13.1+.

## Kasutus

Lisa `v.min.JS` HTML-faili ning kutsu välja funktsioon `register()`:

```HTML
<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="utf-8" />
    <title>Minu koduleht</title>
    <script src="script/v.js"></script>
    <script>VJS.register()</script>
</head>
<body>

    <!-- Veebilehe sisu... -->

</body>
</html>
```

Ja oledki valmis neid funktsioone kasutama, näiteks:

```JavaScript
// Küsib elemendi ID "myElem" järgi
const myElem = $("#myElem");  // või ka `$i("myElem")`
```

## Funktsioonid

Funktsioonide nimekirja saad näha [siin](https://github.com/jyri78/v.JS/blob/master/CHEATSHEET.md).

## Litsents

See projekt on kaitstud GNU General Public License v3.0 või uuem (see [GPL-3.0-or-later](https://github.com/jyri78/v.JS/blob/master/LICENSE)) litsentsiga.

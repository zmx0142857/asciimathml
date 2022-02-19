# asciimath

Forked from [asiimath/asciimathml](https://github.com/asciimath/asciimathml).

- reference: https://zmx0142857.gitee.io/note/#math
- original homepage: http://asciimath.org/

## quick start

### API

- `am2tex(str)`: convert asciimath string to tex string
- `render(element)`: render math to HTML element

### nodejs

```js
const { am2tex } = require('@zmx0142857/asciimath')
console.log(am2tex('[a,b;c,d]'))
```

### browser

> You may need to include [katex](https://katex.org/) in you project if the browser don't support MathML. Currently MathML feature is only available in firefox and safari.

```html
<!DOCTYPE html>
<head>
  <meta charset="utf-8"/>
  <title>test asciimath</title>
</head>
<body>

Here's some math: `x = (-b +- sqrt(b^2-4ac))/(2a)`.

<script>
// the configuration is optional and can be omitted
const asciimath = {
  env: undefined,       // default to browser
  katexpath: 'katex.min.js',// use katex as fallback if no MathML.
  katex: undefined,     // true=always, false=never, undefined=auto

  fixepsi: true,        // false to return to legacy epsi/varepsi mapping
  fixphi: true,         // false to return to legacy phi/varphi mapping

  delim1: '`',          // asciimath delimiter character 1
  displaystyle: true,   // put limits above and below large operators
  viewsource: false,    // show asciimath source code on mouse hover
  fontsize: undefined,  // change to e.g. '1.2em' for larger fontsize
  fontfamily: undefined,// inherit
  color: undefined,     // inherit
  define: [],           // preprocess substitutions

  symbols: [],          // symbols recognized by asciimath parser
  texstr: '',           // last return value of am2tex

  // this function is called when asciimath is ready
  onload: () => console.log('asciimath is loaded'),
}
</script>
<script src="asciimath.js"></script>
</body>
```

# asciimath

> NOTE: maybe this is the last version of asciimath-js, to use a modern parser with full test suite and better development experience, we recommend [asciimath-parser](https://npmjs.com/package/asciimath-parser).

Convert asciimath markup to LaTeX & MathML.

Forked from [asciimath/asciimathml](https://github.com/asciimath/asciimathml).

- reference: https://zmx0142857.github.io/note/#math
- original homepage: http://asciimath.org/

## quick start

### API

- `am2tex(str, displaystyle=AM.displaystyle)`: convert asciimath string to tex string
- `am2mathml(str)`: convert asciimath to mathml
- `render(element)`: render math to HTML element
- `init()`: incase AM didn't init, call it manually

### nodejs

```js
const { am2tex } = require('asciimath-js')
console.log(am2tex('[a,b;c,d]'))
// \displaystyle {\left[\begin{matrix} a& b\\ c& d\\\end{matrix}\right]}
```

### browser

> You may need to include [katex](https://katex.org/) in you project if the browser don't support MathML. Currently MathML feature is only available in firefox and safari.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>test asciimath</title>
</head>
<body>

Here's some math: `x = (-b +- sqrt(b^2-4ac))/(2a)`.

<script>
// the configuration is optional and can be omitted
var asciimath = {
  env: undefined,       // default to browser
  katexpath: 'katex.min.js',// use katex as fallback if no MathML.
  katex: undefined,     // true=always, false=never, undefined=auto

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
  onload: () => asciimath.render(document.body),
}
</script>
<script src="node_modules/asciimath-js/asciimath.js"></script>
</body>
</html>
```

Alternatively, you may use `am2tex` to convert asciimath notation to tex:
```html
<script src="asciimath.js"></script>
<script>
window.addEventListener('load', () => {
  const tex = window.asciimath.am2tex('[1, 2, 3; 4, 5, 6]')
  console.log(tex)
})
</script>
```

### am2tex cli

`test.am`

    上例表明,
    取定 `|a| < 1` 时, 函数
    ```
    w = varphi_a(z) = (a - z)/(1 - bar a z)
    ```
    将单位圆盘 `B(0, 1)` 映到自身的子集中.
    上式解得 `z = (a-w)/(1 - bar a w)`, 这说明 `varphi_a` 是自身的反函数.
    既然可以反解出 `z`, 这说明 `varphi_a` 是单射;
    另一方面, 对任意 `w in B(0, 1)`, 可以找到原像 `z in B(0, 1)`,
    说明它是满射. 总之 `varphi_a` 是 `B(0, 1)` 到自身的双射.
    特别地, `varphi_a(0) = a`, `varphi_a(a) = 0`.
    又, `varphi_a` 将单位圆周映到单位圆周.
    下文将提到, `D` 上全纯的双射称为 `D` 上的全纯自同构, 它们的集合记为
    `"Aut"(D)`.

Try the following command:
```sh
$ npm i asciimath-js && npx am2tex test
```

or, simply type:
```sh
$ npx asciimath-js test
```

`test.tex`

    \documentclass{ctexart}
    \usepackage{amsmath}
    \begin{document}
    上例表明,
    取定 $\textstyle {\left| a\right|}< 1$ 时, 函数
    \[
    \displaystyle  w=\varphi_{a}{\left( z\right)}=\frac{a- z}{1-\overline{a} z}
    \]
    将单位圆盘 $\textstyle  B{\left( 0, 1\right)}$ 映到自身的子集中.
    上式解得 $\textstyle  z=\frac{a- w}{1-\overline{a} w}$, 这说明 $\textstyle \varphi_{a}$ 是自身的反函数.
    既然可以反解出 $\textstyle  z$, 这说明 $\textstyle \varphi_{a}$ 是单射;
    另一方面, 对任意 $\textstyle  w\in B{\left( 0, 1\right)}$, 可以找到原像 $\textstyle  z\in B{\left( 0, 1\right)}$,
    说明它是满射. 总之 $\textstyle \varphi_{a}$ 是 $\textstyle  B{\left( 0, 1\right)}$ 到自身的双射.
    特别地, $\textstyle \varphi_{a}{\left( 0\right)}= a$, $\textstyle \varphi_{a}{\left( a\right)}= 0$.
    又, $\textstyle \varphi_{a}$ 将单位圆周映到单位圆周.
    下文将提到, $\textstyle  D$ 上全纯的双射称为 $\textstyle  D$ 上的全纯自同构, 它们的集合记为
    $\textstyle \text{Aut}{\left( D\right)}$.

    \end{document}

### multiline formula

To enable multiline alignment for asciimath, in am2tex, we convert each
`\n\n` to a linebreak, and wrap the formula group in LaTeX's `aligned`
environment; this feature is not available in am2mathml, though.
```
f: RR & -> S^1

x & |-> "e"^(2pi"i"x)
```

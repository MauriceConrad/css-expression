# Usage

```bash
$ npm install css-expression
```

## Parse CSS Expression

```javascript
import { parse } from 'css-expression'

// Simple example
const expr1 = parse('linear-gradient(90deg, #f00 0%, #000 100%)');

// Complex example
const expr2 = parse('10px ((((800)))) hui(200, 500, rgba(400, 20, 55, 0.5), dont(trust(23, 42, verify), 10000)) (100 (foo bar gay vibes( ss, 10px)) 200 30)  100% hahah was    geht 1.6em 2   /  span 1  ');
```


## Stringify CSS Expression


```javascript
import { stringify } from 'css-expression'

// Simple example
const str1 = (stringify({
  type: 'function',
  name: 'rgb',
  args: [
    { type: 'primitive', value: 255, unit: null },
    { type: 'primitive', value: 0, unit: null },
    { type: 'primitive', value: 138, unit: null }
  ]
}); // => rgb(255, 0, 138)

// Complex example
const str2 = stringify({
  type: 'expression',
  literals: [
    {
      type: 'function',
      name: 'holy',
      args: [
        {
          type: 'expression',
          literals: [
            { type: 'primitive', value: 'fucking', unit: null },
            { type: 'primitive', value: 99, unit: 'px' }
          ]
        },
        {
          type: 'function',
          name: 'bee',
          args: [
            {
              type: 'expression',
              literals: [
                { type: 'primitive', value: 42, unit: '%' },
                { type: 'primitive', value: 'cool', unit: null }
              ]
            },
            { type: 'primitive', value: 'funny', unit: null }
          ]
        }
      ]
    },
    {
      type: 'expression',
      literals: [
        { type: 'primitive', value: 'all', unit: null },
        { type: 'primitive', value: 'good', unit: null },
        { type: 'primitive', value: 20, unit: 'em' }
      ]
    }
  ]
}); // => holy(fucking 99px, bee(42% cool, funny)) (all good 20em)
```
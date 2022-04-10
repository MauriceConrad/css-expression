import { parse } from '../src/index'


test('parse simple filters', () => {
  expect(parse(`blur(10px) saturate(1)`)).toStrictEqual({
    raw: 'blur(10px) saturate(1)',
    type: 'expression',
    literals: [
      {
        raw: 'blur(10px)',
        type: 'function',
        name: 'blur',
        args: [
          { raw: '10px', type: 'primitive', value: 10, unit: 'px' }
        ]
      },
      {
        raw: 'saturate(1)',
        type: 'function',
        name: 'saturate',
        args: [
          { raw: '1', type: 'primitive', value: 1, unit: null }
        ]
      }
    ]
  });
});





test('parse function without valid units', () => {
  expect(parse('rgb(255, 0, 138)')).toStrictEqual({
    raw: 'rgb(255, 0, 138)',
    type: 'expression',
    literals: [
      {
        raw: 'rgb(255, 0, 138)',
        type: 'function',
        name: 'rgb',
        args: [
          { raw: '255', type: 'primitive', value: 255, unit: null },
          { raw: '0', type: 'primitive', value: 0, unit: null },
          { raw: '138', type: 'primitive', value: 138, unit: null }
        ]
      }
    ]
  });
});

test('parse function with -', () => {
  expect(parse('hue-rotate(255, 0, 138)')).toStrictEqual({
    type: 'expression',
    raw: 'hue-rotate(255, 0, 138)',
    literals: [
      {
        raw: 'hue-rotate(255, 0, 138)',
        type: 'function',
        name: 'hue-rotate',
        args: [
          { raw: '255', type: 'primitive', value: 255, unit: null },
          { raw: '0', type: 'primitive', value: 0, unit: null },
          { raw: '138', type: 'primitive', value: 138, unit: null }
        ]
      }
    ]
  });
});

test('parse function with units', () => {
  expect(parse('rgb(255em, 0, 138%)')).toStrictEqual({
    raw: 'rgb(255em, 0, 138%)',
    type: 'expression',
    literals: [
      {
        raw: 'rgb(255em, 0, 138%)',
        type: 'function',
        name: 'rgb',
        args: [
          { raw: '255em', type: 'primitive', value: 255, unit: 'em' },
          { raw: '0', type: 'primitive', value: 0, unit: null },
          { raw: '138%', type: 'primitive', value: 138, unit: '%' }
        ]
      }
    ]
  });
});

test('parse function with invalid units and a valid one and some stuff', () => {
  expect(parse('rgb(!!!255em, 0px, 1 38%)')).toStrictEqual({
    type: 'expression',
    raw: 'rgb(!!!255em, 0px, 1 38%)',
    literals: [
      {
        raw: 'rgb(!!!255em, 0px, 1 38%)',
        type: 'function',
        name: 'rgb',
        args: [
          { raw: '!!!255em', type: 'primitive', value: '!!!255em', unit: null },
          { raw: '0px', type: 'primitive', value: 0, unit: 'px' },
          {
            raw: '1 38%',
            type: 'expression',
            literals: [
              { raw: '1', type: 'primitive', value: 1, unit: null },
              { raw: '38%', type: 'primitive', value: 38, unit: '%' }
            ]
          }
        ]
      }
    ]
  });
});



test('parse normal primitives', () => {
  expect(parse('200 300 500   600 0 dont trust verify')).toStrictEqual({
    raw: '200 300 500   600 0 dont trust verify',
    type: 'expression',
    literals: [
      { raw: '200', type: 'primitive', value: 200, unit: null },
      { raw: '300', type: 'primitive', value: 300, unit: null },
      { raw: '500', type: 'primitive', value: 500, unit: null },
      { raw: '600', type: 'primitive', value: 600, unit: null },
      { raw: '0', type: 'primitive', value: 0, unit: null },
      { raw: 'dont', type: 'primitive', value: 'dont', unit: null },
      { raw: 'trust', type: 'primitive', value: 'trust', unit: null },
      { raw: 'verify', type: 'primitive', value: 'verify', unit: null }
    ]
  });
});

test('parse primitives with values and units', () => {
  expect(parse('200 -300 500.6em -560.062vh 0 8px 20vw verify')).toStrictEqual({
    raw: '200 -300 500.6em -560.062vh 0 8px 20vw verify',
    type: 'expression',
    literals: [
      { raw: '200', type: 'primitive', value: 200, unit: null },
      { raw: '-300', type: 'primitive', value: -300, unit: null },
      { raw: '500.6em', type: 'primitive', value: 500.6, unit: 'em' },
      { raw: '-560.062vh', type: 'primitive', value: -560.062, unit: 'vh' },
      { raw: '0', type: 'primitive', value: 0, unit: null },
      { raw: '8px', type: 'primitive', value: 8, unit: 'px' },
      { raw: '20vw', type: 'primitive', value: 20, unit: 'vw' },
      { raw: 'verify', type: 'primitive', value: 'verify', unit: null }
    ]
  });
});


test('Heavy crazy shit expression', () => {
  expect(parse('10px ((((800)))) hui(200, 500, rgba(400), dont(trust(23, 42, verify), 10000)) (100 (foo bar gay vibes( ss, 10px)) 200 30)  100% hahah was    geht 1.6em 2   /  span 1  ')).toStrictEqual({
    raw: '10px ((((800)))) hui(200, 500, rgba(400), dont(trust(23, 42, verify), 10000)) (100 (foo bar gay vibes( ss, 10px)) 200 30)  100% hahah was    geht 1.6em 2   /  span 1  ',
    type: 'expression',
    literals: [
      { raw: '10px', type: 'primitive', value: 10, unit: 'px' },
      {
        raw: '((((800))))',
        type: 'expression',
        literals: [
          {
            raw: '(((800)))',
            type: 'expression',
            literals: [
              {
                raw: '((800))',
                type: 'expression',
                literals: [
                  {
                    raw: '(800)',
                    type: 'expression',
                    literals: [
                      {
                        raw: '800',
                        type: 'primitive',
                        value: 800,
                        unit: null
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        raw: 'hui(200, 500, rgba(400), dont(trust(23, 42, verify), 10000))',
        type: 'function',
        name: 'hui',
        args: [
          { raw: '200', type: 'primitive', value: 200, unit: null },
          { raw: '500', type: 'primitive', value: 500, unit: null },
          {
            raw: 'rgba(400)',
            type: 'function',
            name: 'rgba',
            args: [ { raw: '400', type: 'primitive', value: 400, unit: null } ]
          },
          {
            raw: 'dont(trust(23, 42, verify), 10000)',
            type: 'function',
            name: 'dont',
            args: [
              {
                raw: 'trust(23, 42, verify)',
                type: 'function',
                name: 'trust',
                args: [
                  { raw: '23', type: 'primitive', value: 23, unit: null },
                  { raw: '42', type: 'primitive', value: 42, unit: null },
                  {
                    raw: 'verify',
                    type: 'primitive',
                    value: 'verify',
                    unit: null
                  }
                ]
              },
              {
                raw: '10000',
                type: 'primitive',
                value: 10000,
                unit: null
              }
            ]
          }
        ]
      },
      {
        raw: '(100 (foo bar gay vibes( ss, 10px)) 200 30)',
        type: 'expression',
        literals: [
          { raw: '100', type: 'primitive', value: 100, unit: null },
          {
            raw: '(foo bar gay vibes( ss, 10px))',
            type: 'expression',
            literals: [
              { raw: 'foo', type: 'primitive', value: 'foo', unit: null },
              { raw: 'bar', type: 'primitive', value: 'bar', unit: null },
              { raw: 'gay', type: 'primitive', value: 'gay', unit: null },
              {
                raw: 'vibes( ss, 10px)',
                type: 'function',
                name: 'vibes',
                args: [
                  {
                    raw: 'ss',
                    type: 'primitive',
                    value: 'ss',
                    unit: null
                  },
                  {
                    raw: '10px',
                    type: 'primitive',
                    value: 10,
                    unit: 'px'
                  }
                ]
              }
            ]
          },
          { raw: '200', type: 'primitive', value: 200, unit: null },
          { raw: '30', type: 'primitive', value: 30, unit: null }
        ]
      },
      { raw: '100%', type: 'primitive', value: 100, unit: '%' },
      { raw: 'hahah', type: 'primitive', value: 'hahah', unit: null },
      { raw: 'was', type: 'primitive', value: 'was', unit: null },
      { raw: 'geht', type: 'primitive', value: 'geht', unit: null },
      { raw: '1.6em', type: 'primitive', value: 1.6, unit: 'em' },
      { raw: '2', type: 'primitive', value: 2, unit: null },
      { raw: '/', type: 'primitive', value: '/', unit: null },
      { raw: 'span', type: 'primitive', value: 'span', unit: null },
      { raw: '1', type: 'primitive', value: 1, unit: null }
    ]
  })
});

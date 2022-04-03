import { parse, stringify } from '../src/index'

test('stringify easy structure', () => {
  expect(stringify({
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
  })).toBe('holy(fucking 99px, bee(42% cool, funny)) (all good 20em)')
});


test('stringify complex structure', () => {
  expect(stringify({
    type: 'function',
    name: 'rgb',
    args: [
      { type: 'primitive', value: 255, unit: null },
      { type: 'primitive', value: 0, unit: null },
      { type: 'primitive', value: 138, unit: null }
    ]
  })).toBe('rgb(255, 0, 138)')
});



test('Re-stringify', () => {
  expect(stringify(parse('lol((200px 400px (hahaha was geht)) hui, 400p 10px)'))).toBe('lol((200px 400px (hahaha was geht)) hui, 400p 10px)');

})



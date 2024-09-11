export const CODES = [
  {
    title: 'Greatest Common Divisor',
    tags: ['gcd'],
    languages: ['cpp', 'typescript'],
    codes: [
`
int gcd(int a, int b) {
  if (!b) return a;

  return gcd(b, a%b);
}
`,
`
function gcd(a: number, b: number) {
  if (!b) return a;

  return gcd(b, a%b);
}
`
    ]
  },
  {
    title: 'Count occurrences of element',
    tags: ['count', 'occurrences'],
    languages: ['cpp', 'typescript'],
    codes: [
`
count(begin(a), end(a), x);
`,
`
a.reduce((p, c) => p + 1, 0)
`
    ]
  },
  {
    title: 'Count based on custom criteria',
    tags: ['count', 'custom'],
    languages: ['cpp', 'typescript'],
    codes: [
`
// e.g. Count even elements
count_if(begin(a), end(a), [](int x) { return !(x%2); });
`,
`
// e.g. Count even elements
a.reduce((p, c) => p + !(c%2), 0)
`
    ]
  }
];
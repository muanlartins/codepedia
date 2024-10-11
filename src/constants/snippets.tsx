export const SNIPPETS = [
  {
    title: 'Greatest Common Divisor',
    tags: ['gcd'],
    languages: ['cpp'],
    codes: 
[
`
int gcd(int a, int b) {
  if (!b) return a;

  return gcd(b, a%b);
}
`
]
  },
  {
    title: 'Count occurrences of element',
    tags: ['count', 'occurrences'],
    languages: ['cpp'],
    codes: 
[
`
count(begin(a), end(a), x);
`,
]
  },
  {
    title: 'Count based on custom criteria',
    tags: ['count', 'custom'],
    languages: ['cpp'],
    codes:
[
`
// e.g. Count even elements
count_if(begin(a), end(a), [](int x) { return !(x%2); });
`,
]
  },
  {
    title: 'Read and write from files',
    tags: ['file', 'read', 'write'],
    languages: ['cpp'],
    codes:
[
`
freopen("in", "r", stdin);
freopen("out", "w", stdout);
`,
]
  },
  {
    title: 'Swap two elements',
    tags: ['swap'],
    languages: ['cpp'],
    codes:
[
`
swap(a, b);
`,
]
  },
  {
    title: 'Get maximum element of a tuple',
    tags: ['max', 'tuple'],
    languages: ['cpp'],
    codes:
[
`
max({a, b, c});
`,
]
  },
  {
    title: 'Get maximum element of a vector',
    tags: ['max', 'vector'],
    languages: ['cpp'],
    codes:
[
`
*max_element(begin(v), end(v));
`,
]
  },
].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
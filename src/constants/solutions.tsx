export const SOLUTIONS = [
  {
    title: 'Shell Game',
    tags: ['usaco'],
    languages: ['cpp'],
    link: 'http://www.usaco.org/index.php?page=viewproblem2&cpid=891',
    codes: 
[
`
#include <bits/stdc++.h>

using namespace std;

int main() {
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  freopen("shell.in", "r", stdin);
  freopen("shell.out", "w", stdout);

  int n;
  cin >> n;

  vector<vector<int>> positions = {{1, 0, 0}, {0, 1, 0}, {0, 0, 1}};
  vector<int> points = {0, 0, 0};

  while (n--) {
    int a, b, g;
    cin >> a >> b >> g;

    a--;
    b--;
    g--;

    for (int i = 0; i < positions.size(); i++) {
      vector<int> &position = positions[i];

      swap(position[a], position[b]);
      if (position[g]) points[i]++;
    }
  }

  cout << max({points[0], points[1], points[2]}) << '\\n';

  return 0;
}
`
]
  },
  {
    title: 'Mixing Milk',
    tags: ['usaco'],
    languages: ['cpp'],
    link: 'http://www.usaco.org/index.php?page=viewproblem2&cpid=855',
    codes: 
[
`
#include <bits/stdc++.h>

using namespace std;

const int BUCKETS = 3;
const int OPERATIONS = 100;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    freopen("mixmilk.in", "r", stdin);
    freopen("mixmilk.out", "w", stdout);

    vector<int> capacity(BUCKETS);
    vector<int> current_milk(BUCKETS);

    for (int i=0;i<BUCKETS;i++)
        cin >> capacity[i] >> current_milk[i];

    for (int i=0;i<OPERATIONS;i++) {
        int current_bucket_index = i%3;
        int next_bucket_index = (i+1)%3;

        int amount_to_pour = min(
            current_milk[next_bucket_index] + current_milk[current_bucket_index], 
            capacity[next_bucket_index]
        ) - current_milk[next_bucket_index];

        current_milk[current_bucket_index] -= amount_to_pour;
        current_milk[next_bucket_index] += amount_to_pour;
    }

    for (int i=0;i<BUCKETS;i++)
        cout << current_milk[i] << '\\n';

    return 0;
}
`
]
  },
  {
    title: 'Speeding Ticket',
    tags: ['usaco'],
    languages: ['cpp'],
    link: 'http://www.usaco.org/index.php?page=viewproblem2&cpid=568',
    codes: 
[
`
#include <bits/stdc++.h>

using namespace std;

const int ROAD_LENGTH = 100;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    freopen("speeding.in", "r", stdin);
    freopen("speeding.out", "w", stdout);

    int n, m;
    cin >> n >> m;

    vector<int> speed_limits;
    vector<int> bessie_speeds;

    for (int i=0;i<n;i++) {
        int segment_length, speed_limit;

        cin >> segment_length >> speed_limit;

        while (segment_length--)
            speed_limits.push_back(speed_limit);
    }

    for (int i=0;i<m;i++) {
        int segment_length, bessie_speed;

        cin >> segment_length >> bessie_speed;

        while (segment_length--)
            bessie_speeds.push_back(bessie_speed);
    }

    int answer = 0;

    for (int i=0;i<ROAD_LENGTH;i++)
        answer = max(answer, bessie_speeds[i] - speed_limits[i]);
    
    cout << answer << '\\n';

    return 0;
}
`
]
  },
  {
    title: 'Block Game',
    tags: ['usaco'],
    languages: ['cpp'],
    link: 'https://www.usaco.org/index.php?page=viewproblem2&cpid=664',
    codes: 
[
`
#include <bits/stdc++.h>

using namespace std;

const string ALPHABET = "abcdefghijklmnopqrstuvwxyz";

int main() {
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  freopen("blocks.in", "r", stdin);
  freopen("blocks.out", "w", stdout);

  int n;
  cin >> n;

  map<char, int> frequency;

  while (n--) {
    string front_word, back_word;
    cin >> front_word >> back_word;

    map<char, int> front_word_frequency, back_word_frequency;

    for (char c : front_word)
      front_word_frequency[c]++;
    for (char c : back_word)
      back_word_frequency[c]++;

    for (char c : ALPHABET)
      frequency[c] += max(front_word_frequency[c], back_word_frequency[c]);
  }


  for (char c : ALPHABET)
    cout << frequency[c] << '\\n';

  return 0;
}
`
]
  },
]
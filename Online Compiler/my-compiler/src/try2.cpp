// #include <iostream>
// #include <vector>
// #include <algorithm>
// #include <set>

// using namespace std;

// vector<int> final_balls_in_boxes(int N, vector<int>& boxes) {
//     while (set<int>(boxes.begin(), boxes.end()).size() != 1) {
//         int max_balls = *max_element(boxes.begin(), boxes.end());
//         int min_balls = *min_element(boxes.begin(), boxes.end());
//         for (int i = 0; i < N; ++i) {
//             if (boxes[i] == max_balls) {
//                 boxes[i] -= (max_balls - min_balls);
//             }
//             else{
//                 boxes[i]=(max_balls - min_balls);
//             }
//         }
//     }
//     return boxes;
// }

// int main() {
//     int N;
//     cin >> N;

//     vector<int> boxes(N);
//     for (int i = 0; i < N; ++i) {
//         cin >> boxes[i];
//     }

//     vector<int> result = final_balls_in_boxes(N, boxes);
//     for (int ball : result) {
//         cout << ball << endl;
//     }

//     return 0;
// }

//=========================================================================================================

// #include <iostream>
// #include <cmath>

// using namespace std;

// int smallest_prime_factor(int n) {
//     for (int i = 2; i <= sqrt(n); ++i) {
//         if (n % i == 0) {
//             return i;
//         }
//     }
//     return n;
// }

// int make_zero_count(int N) {
//     int count = 0;
//     while (N > 0) {
//         int smallest_factor = smallest_prime_factor(N);
//         N -= smallest_factor;
//         ++count;
//     }
//     return count;
// }

// int main() {
//     int test_input;
//     cin>>test_input;
//     int output = make_zero_count(test_input);
//     cout << output << endl;

//     return 0;
// }


// #include <iostream>

// using namespace std;

// int main() {
//     int a, b, c, d;
//     cin >> a >> b >> c >> d;
//     int time = 0;
//     while (c >= a) {
//         a += b;
//         c += d;
//         time++;
//     }
//     if (a <c) {
//         cout<< -1;
//     }
//     cout<<"time : " <<time<<endl;
// }


#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int max_score(int levels, vector<int>& values) {
    int take = 0, skip = 0;
    for (int i = 0; i < levels; ++i) {
        int new_take = max(take, skip) + values[i];
        int new_skip = max(take, skip);
        take = new_take;
        skip = new_skip;
    }
    return max(take, skip);
}

int main() {
    int levels;
    cin >> levels;

    vector<int> values(levels);
    for (int i = 0; i < levels; ++i) {
        cin >> values[i];
    }

    int output = max_score(levels, values);
    cout << output << endl;

    return 0;
}

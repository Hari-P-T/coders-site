#include <iostream>

using namespace std;

int main() {
    int T;
    cin >> T;
    
    for (int i = 0; i < T; ++i) {
        int X, Y;
        cin >> X >> Y;
        
        int moves = X / Y;
        if (X % Y != 0) {
            moves++;
        }
        cout << moves << endl;
    }
    
    return 0;
}
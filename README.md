# CodeVerse

CodeVerse is a competitive coding platform designed for developers to challenge, compete, and conquer coding problems. It supports multiple programming languages and provides real-time compilation and execution feedback.

## Features

- **Multi-Language Support**: Compile and run code in Java, C++, Python, and JavaScript.
- **User Authentication**: Secure login via Google authentication using Firebase.
- **Responsive UI**: Built with React and Bootstrap for a smooth user experience.
- **Problem Solving**: A wide range of coding problems to solve.
- **Leaderboard**: Compete with others and track your progress on the leaderboard.


## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/codeverse.git
    ```

2. Navigate to the project directory:

    ```sh
    cd codeverse
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Set up Firebase authentication (refer to Firebase documentation for details).

5. Start the server:

    ```sh
    node server.js
    ```

6. Start the React development server:

    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Login using Google authentication.
3. Navigate through the Home, Leaderboard, and Interview sections.
4. Solve coding problems and view the compilation and execution output in real-time.

## API

### POST /compile

Compile and execute code.

- **URL**: `/compile`
- **Method**: `POST`
- **Data Params**: `{ "code": "your code here", "extension": ".java" | ".js" | ".cpp" | ".py" }`
- **Success Response**: 
  - **Code**: 200
  - **Content**: `execution output`
- **Error Response**: 
  - **Code**: 400 | 500
  - **Content**: `error message`

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the need for a simple, web-based competitive coding platform.
- Thanks to the open-source community for the tools and libraries used in this project.


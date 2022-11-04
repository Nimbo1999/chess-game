# Install locally

1. Run the following command to clone this repository:<br>
```git clone https://github.com/Nimbo1999/chess-game.git```

2. Run the following command to install package dependencies: <br>
```npm install```

2. Run the following command to run locally in dev envyronment: <br>
```npm run dev```

3. Run the following command to run tests: <br>
```npm test```

# Technical design

## Folder structure
> I've used the same folder structure as I use in my regular routine. It is using the following pattern:

    .
    ├── assets        # Used to store static files like images and fonts;
    ├── components    # Reusable JSX components are placed here;
    ├── constants     # Constant values like Route paths and other;
    ├── contexts      # React Context components;
    ├── hooks         # React hooks;
    ├── pages         # React pages and router configuration;
    ├── reducers      # Reducer from react. (it would be 'redux' if using redux state management package);
    ├── sass          # CSS configuration, variables, mixins, function and so on;
    ├── services      # Service classes;
    ├── utils         # Utility functions;
    └── README.md

## State management
> I decided to manage my state with the react ContextAPI and useReducer API.
The reason for that is because I have identify only one "reducer" in the entire app, so I felt that there is no reason to install redux for that.

There is a 'ChessContext' component that provides functions to manipulate the State. The State object resides on the 'ChessReducer' and it don't provide the dispatch function, instead, it create actions that invoke the dispatch in order to give a contract layer.

## Tests
> I'm using jest and @testing-library in order to create unit test and integration tests. The key thing of React Testing Library is that it enable us to test the behaviour of my components instead of the implementation itself.

In order to run those tests you can use the following command:
```npm run test```

## Packages and versions

I used a Vite template in order to start a fast boilerplate of react app. It came with Typescript, jest, React Testing Library, Tailwind(not been used) and configurations for ESLint and Prettier.

<br>

### ![chess.js version](https://img.shields.io/npm/v/chess.js?label=chess.js)
> Used to handle the game logic

### ![chessboardjsx version](https://img.shields.io/npm/v/chessboardjsx?label=chessboardjsx)
> Used to create the Board UI

### ![react-hook-form version](https://img.shields.io/npm/v/react-hook-form?label=react-hook-form)
> This library helps me with handling forms in a easy way

### ![react-router-dom version](https://img.shields.io/npm/v/react-router-dom?label=react-router-dom)
> Provides routing functionalites for a SPA

### ![react version](https://img.shields.io/npm/v/react?label=react) ![react-dom version](https://img.shields.io/npm/v/react-dom?label=react-dom)
> React library

### ![jest version](https://img.shields.io/npm/v/jest?label=jest) ![@testing-library/react version](https://img.shields.io/npm/v/@testing-library/react?label=@testing-library/react)
> Used to create unit and integration tests

### ![typescript version](https://img.shields.io/npm/v/typescript?label=typescript)
> TypeScript is JavaScript with syntax for types

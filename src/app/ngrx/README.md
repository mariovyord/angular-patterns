# NgRx

NgRx is a framework for managing state and side effects in Angular applications. It's based on Redux, a popular state management library in the JavaScript ecosystem, and adds the power of RxJS, making it reactive.

## Core Concepts

NgRx has three core concepts:

- **Store**: A single, immutable data structure that holds the state of your entire application.
  Actions: Dispatched to express an intention to change state.
- **Reducers**: Pure functions that take the current state and an action, and return a new state.
  Benefits
- **Actions**: Dispatched to express an intention to change state. Actions are plain objects that describe what happened in the application.
- **Effects**: Handle tasks such as fetching data, long-running tasks that produce multiple events, and other external interactions where implementation details matter. They listen for actions dispatched from Store, perform side effects (like network requests), and then dispatch new actions.
- **Selectors**: Pure functions used for obtaining slices of store state. Selectors can compute derived data, allowing Angular to store minimal state.

## Benefits:

- **Predictability**: By using a single, immutable data structure to represent the state of your entire application, NgRx makes state predictable.
- **Performance**: NgRx is optimized for Angular applications, ensuring minimal change detection cycles and fast execution.
- **Developer Tools**: NgRx provides powerful developer tools for debugging and time-traveling through state changes.
- **Reactive**: NgRx is built on top of RxJS, making it easy to react to state changes in a declarative manner.

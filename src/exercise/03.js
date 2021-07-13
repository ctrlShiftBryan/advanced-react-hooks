// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react';



/// creating context start
// create a context
const CountContext = React.createContext()
// create a provider function
// provider function uses useState to return value
// also need to pass props for children
function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];

  // this I don't understand
  return <CountContext.Provider value={value} {...props}/>
}
/// creating context end


function useCount() {
  const context = React.useContext(CountContext);
  if (!context) { 
    throw new Error('useCount must be used with a CountProvider');
  }
  return context;
}

/// using the context to read/write
// read from context
function CountDisplay() {
  const [count] = useCount()
  console.log({count});
  return <div>{`The current count is ${count}`}</div>
}

// write to context
function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}
/// using the context to read/write end

// wrap it all in the provider
function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App

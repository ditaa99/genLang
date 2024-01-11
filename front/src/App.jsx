// // // // import React from 'react';
// // // import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// // // // import Home from './Home';
// // // // import DataDisplay from './DataDisplay';

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <div>
// // //         <nav>
// // //           <ul>
// // //             <li>
// // //               <Link to="/">Home</Link>
// // //             </li>
// // //             <li>
// // //               <Link to="/data">Data Display</Link>
// // //             </li>
// // //           </ul>
// // //         </nav>

// // //         <hr />

// // //         <Switch>
// // //           <Route exact path="/">
// // //             {/* <Home /> */}
// // //           </Route>
// // //           <Route path="/data">
// // //             {/* <DataDisplay /> */}
// // //           </Route>
// // //         </Switch>
// // //       </div>
// // //     </Router>
// // //   );
// // // }

// // // export default App;


// // // import { useState } from 'react'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from '/vite.svg'
// // // import './App.css'

// // // function App() {
// // //   const [count, setCount] = useState(0)

// // //   return (
// // //     <>
// // //       <div>
// // //         <a href="https://vitejs.dev" >
// // //           <img src={viteLogo} className="logo" alt="Vite logo" />
// // //         </a>
// // //         <a href="https://react.dev" >
// // //           <img src={reactLogo} className="logo react" alt="React logo" />
// // //         </a>
// // //       </div>
// // //       <h1>Vite + React</h1>
// // //       <div className="card">
// // //         <button onClick={() => setCount((count) => count + 1)}>
// // //           count is {count}
// // //         </button>
// // //         <p>
// // //           Edit <code>src/App.jsx</code> and save to test HMR
// // //         </p>
// // //       </div>
// // //       <p className="read-the-docs">
// // //         Click on the Vite and React logos to learn more
// // //       </p>
// // //     </>
// // //   )
// // // }

// // // export default App



// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // // import reactLogo from './assets/react.svg';
// // // import viteLogo from '/vite.svg';
// // import './App.css';

// // function App() {
// //   const [count, setCount] = useState(0);

// //   useEffect(() => {
// //     // Make an API call to your Flask backend
// //   //   axios.get('http://127.0.0.1:5000/')  // Replace <address1> with your Flask backend address
// //   //     .then(response => {
// //   //       console.log("API response");
// //   //       setCount(response.data.count);
// //   //     })
// //   //     .catch(error => {
// //   //       console.error('Error fetching count:', error);
// //   //     });


// //   try {
// //     const response = await axios.get('http://127.0.0.1:5000');
// //     console.log("API response");
// //     setCount(response.data.count);
// //   } catch (error) {
// //     console.error('Error fetching count:', error);
// //   }
// //   }, []);

// //   return (
// //     <>
// //       {/* ... (your existing JSX code) */}
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>blah blah</p>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       {/* ... (your existing JSX code) */}
// //     </>
// //   );
// // }

// // export default App;
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// // import reactLogo from './assets/react.svg';
// // import viteLogo from '/vite.svg';
// import './App.css';

// function App() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     // Define an async function to use await
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('<address1>');
//         console.log("API response");
//         setCount(response.data.count);
//       } catch (error) {
//         console.error('Error fetching count:', error);
//       }
//     };

//     // Call the async function
//     fetchData();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   return (
//       <>
//       <div>
//         <a href="https://vitejs.dev" >
//           {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
//         </a>
//         <a href="https://react.dev" >
//           {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       </>
//   );
// }

// export default App;



// YourReactComponent.js
import { useState } from 'react';
import axios from 'axios';
import './App.css'

const YourReactComponent = () => {
    const [result, setResult] = useState('');

    const handleClick = async () => {
        try {
            // Make a POST request to your Flask API
            const response = await axios.post('http://localhost:5000/', {
                // Pass any necessary data to your Python code
                // For example, you might send user input
                inputData: 'example data',
            });
            
            console.log(response.data.result);
            // Handle the response
            setResult(response.data.result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Run Python Code</button>
            <div>Result: {result}</div>
        </div>
    );
};

export default YourReactComponent;

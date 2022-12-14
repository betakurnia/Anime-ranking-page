import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: "#f1efe3",
          secondary: "#d965aa",
          white: "#fff",
          black: "#0000",
          red: "#c14848",
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

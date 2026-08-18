import { ThemeProvider } from "./contexts/ThemeContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
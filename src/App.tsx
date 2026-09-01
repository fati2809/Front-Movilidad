import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRouter />

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
      />
    </>
  );
}

export default App;
import { BrowserRouter,Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter,Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage"
import ApplyfoJob from "./pages/ApplyforJob"
import PostJob from "./pages/PostJob";
import ManagerDashboardLayout from "./components/layouts/BranchManager/managerDashboardLayout";
import OwnerDashboardLayout from "./components/layouts/ShopOwner/ownerDashboardLayout";
import EmailVerification from "./pages/EmailVerificaion";
function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/applyforjob" element={<ApplyfoJob/>}/>
        <Route path="/postjob" element={<PostJob/>}/>
        <Route path="/emailverification" element={<EmailVerification/>}/>
        <Route path="/manager" element={<ManagerDashboardLayout><PostJob/></ManagerDashboardLayout>}/>
        <Route path="/owner" element={<OwnerDashboardLayout></OwnerDashboardLayout>}></Route>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

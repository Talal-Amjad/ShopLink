import { BrowserRouter,Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage"
import ApplyfoJob from "./pages/ApplyforJob"
import PostJob from "./pages/BranchManager/PostJob";
import ManagerDashboardLayout from "./components/layouts/BranchManager/managerDashboardLayout";
import OwnerDashboardLayout from "./components/layouts/ShopOwner/ownerDashboardLayout";
import EmailVerification from "./pages/EmailVerificaion";
import ViewAllApplicants from "./pages/BranchManager/ViewAllApplicants";
import VerifyCode from "./pages/ForgotPassword/VerifyCode";
import LandingPage from "./pages/LandingPage";
import Jobs from "./pages/Jobs";
import ApproveJobs from "./pages/ShopOwner/ApproveJobs";
function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/applyforjob" element={<ApplyfoJob/>}/>
        <Route path="/postjob" element={<PostJob/>}/>
        <Route path="/emailverification" element={<EmailVerification/>}/>
        <Route path="/manager" element={<ManagerDashboardLayout/>}/>
        <Route path="/owner" element={<OwnerDashboardLayout/>}></Route>
        <Route path="/viewallapplicants" element={<ViewAllApplicants></ViewAllApplicants>}></Route>
        <Route path="/verifycode" element={<VerifyCode></VerifyCode>}></Route>
        <Route path="/jobs" element={<Jobs/>}></Route>
        <Route path="approvejob" element={<ApproveJobs></ApproveJobs>}></Route>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

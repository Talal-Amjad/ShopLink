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
import OwnerViewAllApplicants from "./pages/ShopOwner/ViewAllApplicants";
import Protected from "../Protected";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/applyforjob" element={<Protected component={<ApplyfoJob/>} allowableuser="user"/>} />
        <Route path="/postjob" element={<Protected component={<PostJob/>} allowableuser="manager"/>}/>
        <Route path="/emailverification" element={<EmailVerification/>}/>
        <Route path="/manager" element={<Protected component={<ManagerDashboardLayout/>}  allowableuser="manager"/>}/>
        <Route path="/owner" element={<Protected component={<OwnerDashboardLayout/>}  allowableuser="owner"/>}/>
        <Route path="/viewallapplicants" element={<Protected component={<ViewAllApplicants/>}  allowableuser="manager"/>}/>
        <Route path="/verifycode" element={<VerifyCode/>}></Route>
        <Route path="/jobs" element={<Protected component={<Jobs/>}  allowableuser="user"/>}/>
        <Route path="/approvejob" element={<Protected component={<ApproveJobs/>}  allowableuser="owner"/>}/>
        <Route path="/ownerviewallapplicants" element={<Protected component={<OwnerViewAllApplicants/>}  allowableuser="owner"/>}/>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

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
import HiringProcessReport from "./pages/ShopOwner/HiringProcessReport";
import ApplicantsSkillReport from "./pages/BranchManager/ApplicantsSkillReport"
import AddProduct from "./pages/BranchManager/AddProduct";
import AddSale from "./pages/BranchManager/AddSale";
import UpdateBranch from "./pages/ShopOwner/UpdateBranch";
import ShowAllBranches from "./pages/ShopOwner/ShowAllBranches";
import AllStocks from "./pages/BranchManager/allstocks";
import SalesInsights from "./pages/BranchManager/SalesInsights";
import PostedJob from "./pages/BranchManager/PostedJobs";
import Employee from "./pages/BranchManager/Employee";
import NoDataFound from "./pages/NoDataFound";
import AllBranchesEmployee from "./pages/ShopOwner/AllBranchesEmployee";
import OwnerSalesInsights from "./pages/ShopOwner/SalesInsights";
import StockforAllBranches from "./pages/ShopOwner/StockforAllBranches";
import Protected from "../Protected";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage/>} />
        {/*Testing Routes*/}
        <Route path="/updatebranch" element={<UpdateBranch/>} />
        <Route path="/allbranches" element={<ShowAllBranches/>} />
        <Route path="/stock" element={<AllStocks/>} />
        <Route path="/insights" element={<SalesInsights/>} />
        <Route path="/ownerinsights" element={<OwnerSalesInsights/>} />
        <Route path="/postedjobs" element={<PostedJob/>} />
        <Route path="/employees" element={<Employee/>} />
        <Route path="/nodatafound" element={<NoDataFound/>} />
        <Route path="/allemployees" element={<AllBranchesEmployee/>} />
        <Route path="/stockforallaranches" element={<StockforAllBranches/>} />


        {/*Testing Routes*/}
        <Route path="/applyforjob" element={<Protected component={<ApplyfoJob/>} allowableuser="user"/>} />
        <Route path="/postjob" element={<Protected component={<PostJob/>} allowableuser="manager"/>}/>
        <Route path="/addproduct" element={<Protected component={<AddProduct/>} allowableuser="manager"/>}/>
        <Route path="/addsale" element={<Protected component={<AddSale/>} allowableuser="manager"/>}/>
        <Route path="/emailverification" element={<EmailVerification/>}/>
        <Route path="/manager" element={<Protected component={<ManagerDashboardLayout/>}  allowableuser="manager"/>}/>
        <Route path="/owner" element={<Protected component={<OwnerDashboardLayout/>}  allowableuser="owner"/>}/>
        <Route path="/hiringreport" element={<Protected component={<HiringProcessReport/>}  allowableuser="owner"/>}/>
        <Route path="/viewallapplicants" element={<Protected component={<ViewAllApplicants/>}  allowableuser="manager"/>}/>
        <Route path="/skillsreport" element={<Protected component={<ApplicantsSkillReport/>}  allowableuser="manager"/>}/>
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

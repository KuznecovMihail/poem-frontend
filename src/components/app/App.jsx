import { Route, Routes } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import Welcome from "../pages/welcome/Welcome";
import CorporateEthics from "../pages/ourBank/corporateEthics/CorporateEthics";
import TopManagement from "../pages/ourBank/topManagement/TopManagement";
import Requisites from "../pages/ourBank/requisites/Requisites";
import BankStructure from "../pages/ourBank/bankStructure/BankStructure";
import ApplicationsAdmin from "../pages/applicationsAdmin/Applications";
import OurBank from "../pages/ourBank/OurBank";
import LayoutUser from "./layoutUser/LayoutUser";
import HomePage from "../pages/homePage/HomePage";
import NewsAdmin from "../pages/newsAdmin/NewsAdmin";
import LayoutAdmin from "./layoutAdmin/LayoutAdmin";
import Mission from "../pages/ourBank/mission/Mission";
import Applications from "../pages/applicationUser/Applications";
import LoginPage from "../pages/loginPage/LoginPage";
import PrivateRoute from "./privateRoute/PrivateRoute";
import BankHistory from "../pages/ourBank/bankHistory/BankHistory";
import BankToday from "../pages/ourBank/bankToday/BankToday";
import ChooseTypeOfFile from "../pages/adminUploadFiles/ChooseTypeOfFile";
import UploadVacationFile from "../pages/adminUploadFiles/uploadVacationFlie/UploadVacationFile";
import UploadOrgStuctureFile from "../pages/adminUploadFiles/uploadOrgStructureFile/UploadOrgStructureFile";
import CreateApplication from "../pages/createApplication/CreateApplication";
import PaidHolidays from "../pages/createApplication/paidHolidays/PaidHolidays";
import UnPaidHolidays from "../pages/createApplication/unPaidHolidays/UnPaidHolidays";
import MedList from "../pages/createApplication/medList/MedList";
import Ndfl2 from "../pages/createApplication/ndfl2/Ndfl2";
import ForVisa from "../pages/createApplication/forVisa/ForVisa";
import CertificateOfEmployment from "../pages/createApplication/certificateOfEmployment/CertificateOfEmployment";
import EditApplication from "../pages/editApplication/EditApplication";
import WorkBookCopy from "../pages/createApplication/workBookCopy/WorkBookCopy";
import CreateBooking from "../pages/createBooking/CreateBooking";
import NewsUser from "../pages/newsUser/NewsUser";
import NewsUserItem from "../pages/newsUser/newsUserItem/NewsUserItem";
import NewsEdit from "../pages/newsAdmin/newsEdit/NewsEdit";
import "./app.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CloseBurger, Context, ProfileContext } from "../../context/context";
import { useState } from "react";
import Bookings from "../pages/bookings/Bookings";
import Error504 from "../pages/erros/Error504";
import Error404 from "../pages/erros/Error404";
import PasswordRest from "../pages/loginPage/passwordRest/PasswordRest";
import AdminBookingPage from "../pages/adminBooking/AdminBookingPage";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * (60 * 1000),
      cacheTime: 35 * (60 * 1000),
      retry: 1,
    },
  },
});

function App() {
  const [employeeId, setEmployeeId] = useState();
  const [employeeRole, setEmployeeRole] = useState();
  const [flagGuideShown, setFlagGuideShown] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [closeBurger, setCloseBurger] = useState(true);
  const [fromHomePage, setFromHomePage] = useState(false);
  const [giftId, setGiftId] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider
        value={{
          employeeId,
          setEmployeeId,
          employeeRole,
          setEmployeeRole,
          flagGuideShown,
          setFlagGuideShown,
          isAuth,
          setIsAuth,
        }}
      >
        <CloseBurger.Provider
          value={{
            closeBurger,
            setCloseBurger,
          }}
        >
          <ProfileContext.Provider
            value={{
              fromHomePage,
              setFromHomePage,
              giftId,
              setGiftId,
            }}
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#ff7a45",
                  fontFamily: "Roboto, sans-serif",
                },
              }}
            >
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/rest" element={<PasswordRest />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/admin" element={<LayoutAdmin />}>
                    <Route index element={<NewsAdmin />} />
                    <Route path="/admin/:id" element={<NewsEdit />} />
                    <Route
                      path="/admin/upload_file"
                      element={<ChooseTypeOfFile />}
                    />
                    <Route
                      path="/admin/upload_file/vacation"
                      element={<UploadVacationFile />}
                    />
                    <Route
                      path="/admin/upload_file/org_structure"
                      element={<UploadOrgStuctureFile />}
                    />
                    <Route
                      path="applications/"
                      element={<ApplicationsAdmin />}
                    />
                    <Route path="booking/*" element={<AdminBookingPage />} />
                  </Route>
                  <Route path="/" element={<LayoutUser />}>
                    <Route index element={<HomePage />} />
                    <Route path="/user/:id" element={<Profile />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/bank/" element={<OurBank />} />
                    <Route path="/bank/history" element={<BankHistory />} />
                    <Route path="/bank/today" element={<BankToday />} />
                    <Route path="/bank/mission" element={<Mission />} />
                    <Route path="/bank/ethics" element={<CorporateEthics />} />
                    <Route
                      path="/bank/management"
                      element={<TopManagement />}
                    />
                    <Route path="/bank/requisites" element={<Requisites />} />
                    <Route path="/bank/structure" element={<BankStructure />} />
                    <Route path="/applications/" element={<Applications />} />
                    <Route
                      path="/bookings/create"
                      element={<CreateBooking />}
                    />
                    <Route
                      path="/applications/create"
                      element={<CreateApplication />}
                    />
                    <Route
                      path="/applications/create/paidholidays"
                      element={<PaidHolidays />}
                    />
                    <Route
                      path="/applications/create/unpaidholidays"
                      element={<UnPaidHolidays />}
                    />
                    <Route
                      path="/applications/create/medlist"
                      element={<MedList />}
                    />
                    <Route
                      path="/applications/create/ndfl"
                      element={<Ndfl2 />}
                    />
                    <Route
                      path="/applications/create/visa"
                      element={<ForVisa />}
                    />
                    <Route
                      path="/applications/create/certificateofemployment"
                      element={<CertificateOfEmployment />}
                    />
                    <Route
                      path="/applications/create/workbookcopy"
                      element={<WorkBookCopy />}
                    />
                    <Route
                      path="/applications/edit/:id"
                      element={<EditApplication />}
                    />
                    <Route path="/news" element={<NewsUser />} />
                    <Route path="/news/:id" element={<NewsUserItem />} />
                    <Route path="/bookings" element={<Bookings />} />
                  </Route>
                </Route>
                <Route path="error/504" element={<Error504 />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </ConfigProvider>
          </ProfileContext.Provider>
        </CloseBurger.Provider>
      </Context.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import TwoFa from "./pages/2Fa";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SeedingReaction = lazy(() => import("./pages/SeedingReaction"));
const CheckXu = lazy(() => import("./pages/CheckXu"));
const ChuyenXu = lazy(() => import("./pages/ChuyenXu"));
const GetToken = lazy(() => import("./pages/GetToken"));
const AddToken = lazy(() => import("./pages/AddToken"));
const ChangePass = lazy(() => import("./pages/ChangePass"));
const GetCookieProfile = lazy(() => import("./pages/GetCookieProfile"));
const BuffLive = lazy(() => import("./pages/BuffLive"));
const GetDTSG = lazy(() => import("./pages/GetDTSG"));
const Monitor = lazy(() => import("./pages/Monitor"));

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* <Route path="*" element={<SeedingReaction />} /> */}
          <Route path="/" element={<Header />}>
            <Route index element={<SeedingReaction />} />
            <Route path="checkxu" element={<CheckXu />} />
            <Route path="getdtsg" element={<GetDTSG />} />
            <Route path="bufflive" element={<BuffLive />} />
            <Route path="2fa" element={<TwoFa />} />
            <Route path="getcookie" element={<GetCookieProfile />} />
            <Route path="monitor" element={<Monitor />} />
            <Route path="chuyenxu" element={<ChuyenXu />} />
            <Route path="addtoken" element={<AddToken />} />
            <Route path="changepass" element={<ChangePass />} />
            <Route path="gettoken" element={<GetToken />} />
          </Route>
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;

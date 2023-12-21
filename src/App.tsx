import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Header from "./components/Header";

const SeedingReaction = lazy(() => import("./pages/SeedingReaction"));
const CheckXu = lazy(() => import("./pages/CheckXu"));
const ChuyenXu = lazy(() => import("./pages/ChuyenXu"));



function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
            {/* <Route path="*" element={<SeedingReaction />} /> */}
          <Route path="/" element={<Header />}>
            <Route index element={<SeedingReaction />} />
            <Route path="checkxu" element={<CheckXu />} />
            <Route path="chuyenxu" element={< ChuyenXu/>} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

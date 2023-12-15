import { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Loader from "./components/Loader";

const SeedingReaction = lazy(() => import("./pages/SeedingReaction"));
const CheckXu = lazy(() => import("./pages/CheckXu"));


function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
            {/* <Route path="*" element={<SeedingReaction />} /> */}
          <Route path="/" element={<Outlet />}>
            <Route index element={<SeedingReaction />} />
            <Route path="checkxu" element={<CheckXu />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

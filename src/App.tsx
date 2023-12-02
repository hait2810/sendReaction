import { Suspense, lazy } from 'react'
// import SeedingReaction from './pages/SeedingReaction'

import { Routes, Route, Outlet } from "react-router-dom";
import Loader from './components/Loader';

const SeedingReaction = lazy(() => import("./pages/SeedingReaction"))

function App() {

  return (
    <>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path='' element={<Outlet/>}>
          <Route index element={<SeedingReaction/>}/>
      </Route>
    </Routes>
    </Suspense>
    </>
  )
}

export default App

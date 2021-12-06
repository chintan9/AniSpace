import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import { Suspense } from "react";
import TopBarProgress from "./components/TopBarProgress";
import { routes } from "./routes";

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<TopBarProgress />}>
        <Routes>
          {routes.map((e) => (
            <Route key={e.path} path={e.path} element={<e.component />} />
          ))}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

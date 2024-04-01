import { Route, Routes } from "react-router-dom";
import ROUTES from "./routes";
import Layout from "./layout";
import { FullPageSpinner } from "./components/Loaders";
import { Suspense } from "react";
import ErrorBoundaryComponent from "./components/ErrorBoundaryComponent";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryComponent />}>
      <Routes>
        {ROUTES.map(({ component: Element, ...rest }, index) => (
          <Route
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <Layout>
                  <Element />
                </Layout>
              </Suspense>
            }
            path={rest.path}
            key={`auth-route-${index}`}
          />
        ))}
      </Routes>
    </ErrorBoundary>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { Header } from "src/components/Header";
import { NotFound } from "src/components/NotFound";
import { Page } from "src/components/Page";
import { ExploreProvider } from "src/context/ExploreContext";
import { routes } from "src/routes";

export const App = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <Page>
        <ExploreProvider>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ExploreProvider>
      </Page>
    </div>
  );
};

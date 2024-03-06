import { useHashNavigation } from "./hooks/useHashNavigation.js";
import { Home } from "./pages/Home.jsx";
import { Single } from "./pages/Single.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Header } from "./components/Header.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { Alert } from "./components/Alert.jsx";
import { Create } from "./pages/Create.jsx";
import Login from "./pages/Login.jsx";
import { Footer } from "./components/Footer.jsx";
function App() {
  const { page, param } = useHashNavigation();
  const pageContent = getPageContent(page, param);

  return (
    <>
      <div className="container-pad">
        <Header page={page} />
        <div className="container my-3">
          <ErrorBoundary FallbackComponent={PageError}>
            {pageContent}
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </>
  );
}

function PageError({ error }) {
  return <Alert type="danger">{error.toString()}</Alert>;
}

function getPageContent(page, param) {
  if (page === "home") {
    return <Home />;
  }
  if (page === "") {
    return <Single postId={param} />;
  }
  if (page === "create") {
    return <Create />;
  }
  if (page === "login") {
    return <Login />;
  }
  return <NotFound page={page} />;
}

export default App;

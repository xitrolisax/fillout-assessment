import { Navigation, PageHolder } from "./components";
import { ModalProvider, PageNavigationProvider } from "./providers";

function App() {
  return (
    <PageNavigationProvider>
      <ModalProvider>
        <PageHolder />
        <Navigation />
      </ModalProvider>
    </PageNavigationProvider>
  );
}

export default App;

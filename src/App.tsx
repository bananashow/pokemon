import { PageHeader } from "./Common/PageHeader";
import { PageNavigator } from "./PageNavigator";
import { store } from "./Store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <PageHeader />
        <PageNavigator />
      </Provider>
    </>
  );
}

export default App;

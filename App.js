import Main from "./navigation/Main";
import { Provider } from "react-redux";
import store from "./redux/Reducers/store";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

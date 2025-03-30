import {BrowserRouter} from "react-router";
import {AuthForm} from "./components/auth/auth-form";

export default function App() {
  // return <RootRoutes />;

  return (
    <BrowserRouter>
      <AuthForm formType="signin" />
    </BrowserRouter>
  );
}

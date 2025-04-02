import {BrowserRouter} from "react-router";
import AppLayout from "./layouts/app-layout";

// export default function App() {
//   return <RouterProvider router={router} />;
// }

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

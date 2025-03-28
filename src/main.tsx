import {createRoot} from "react-dom/client";
import {Toaster} from "sonner";
import {ThemeProvider} from "next-themes";

import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./context/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    storageKey="vite-ui-theme">
    <QueryProvider>
      <App />
      <Toaster richColors />
    </QueryProvider>
  </ThemeProvider>
);

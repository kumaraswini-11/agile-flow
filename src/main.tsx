import {createRoot} from "react-dom/client";
import {Toaster} from "sonner";
import {NuqsAdapter} from "nuqs/adapters/react";
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
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
      <Toaster richColors />
    </QueryProvider>
  </ThemeProvider>
);

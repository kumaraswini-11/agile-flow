import {Outlet} from "react-router";

// import {AuthProvider} from "@/context/auth-provider";
import {SidebarProvider, SidebarInset} from "@/components/ui/sidebar";
import {Asidebar} from "@/components/sidebar/asidebar";
import {Header} from "@/components/header";
import {useState} from "react";
// import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog";
// import CreateProjectDialog from "@/components/workspace/project/create-project-dialog";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider
    // defaultOpen={sidebarOpen}
    // onOpenChange={setSidebarOpen}
    >
      {/* Sidebar component */}
      <Asidebar />

      {/* Main content area */}
      <SidebarInset className="overflow-x-hidden">
        <div className="w-full">
          <>
            <Header />
            <div className="px-3 py-3 lg:px-20">{/* <Outlet /> */}Dashboard</div>
          </>
          {/* <CreateWorkspaceDialog />
            <CreateProjectDialog /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// <SidebarProvider
// defaultOpen={sidebarOpen}
// onOpenChange={setSidebarOpen}>
// <div className="flex h-screen w-full overflow-hidden">
//   {/* Sidebar component */}
//   <Asidebar />

//   {/* Main content area */}
//   <div className="flex flex-1 flex-col overflow-hidden">
//     {/* Header component */}
//     <Header />

//     {/* Main content */}
//     <main className="flex-1 overflow-auto p-4 md:p-6">children</main>
//   </div>
// </div>
// </SidebarProvider>

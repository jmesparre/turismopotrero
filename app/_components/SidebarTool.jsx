import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from "../../app/_components/app-sidebar"
import "./sidebar.css";


export default function Layout({ children }) {
  return (
    <SidebarProvider className="fixed z-10" >
      <AppSidebar />
      <main>
        <SidebarTrigger className="mt-2 p-4 shadow ml-1 bg-white border-solid" />
        {children}
      </main>
    </SidebarProvider>
  )
}

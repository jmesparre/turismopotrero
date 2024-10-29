import "./globals.css";
import Provider from "./Provider";



export const metadata = {
  title: "Turismo San Luis",
  description: "por Juan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body >        
       <Provider>
        {children}
       </Provider>
      </body>
    </html>
  );
}

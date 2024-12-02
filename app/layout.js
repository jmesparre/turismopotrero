import "./globals.css";
import Provider from "./Provider";



export const metadata = {
  title: "Turismo San Luis",
  description: "por Juan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"/>
      </head>
      <body >        
       <Provider>
        {children}
       </Provider>
      </body>
    </html>
  );
}

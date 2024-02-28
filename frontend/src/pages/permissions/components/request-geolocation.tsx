import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { useState } from "react";
  
  export function RequestGeolocation() {
    const [geolocationPermission, setGeolocationPermission] = useState("Not Requested");
  
    const requestGeolocationPermission = () => {
      navigator.geolocation.getCurrentPosition(
        () => {
          setGeolocationPermission("Granted");
          // No se utiliza la posición
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setGeolocationPermission("Denied");
          } else {
            setGeolocationPermission("Error");
          }
          console.error("Error requesting geolocation permission:", error);
        },
        { timeout: 1000 } // Opción para reducir el tiempo de espera y minimizar el impacto en el usuario
      );
    };
  
    return (
      <AccordionItem value="item-4">
        <AccordionTrigger>Geolocation</AccordionTrigger>
        <AccordionContent>
          <div>
            <p>Geolocation Permission: {geolocationPermission}</p>
            <button onClick={requestGeolocationPermission}>Request Geolocation Permission</button>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
  
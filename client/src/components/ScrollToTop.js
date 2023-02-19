import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const routePath  = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
  
    window.scrollTo(0, 0);
    console.log("scrolling" ,routePath );
    
  }, [routePath ]);

  return null;
}
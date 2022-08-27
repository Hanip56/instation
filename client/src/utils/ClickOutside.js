import { useEffect } from "react";

function useOutsideAlerter(ref, set) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // console.log(ref);
        // console.log("You clicked outside of me!");
        set(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideAlerter;

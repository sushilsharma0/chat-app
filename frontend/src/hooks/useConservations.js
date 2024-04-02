import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useConservations() {
  const [loading, setLoading] = useState(false);
  const [conservations, setConservations] = useState([]);

  useEffect(() => {
    const getConservations = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/users");
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setConservations(data);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false); // Fixed: set loading to false when done
      }
    };
    getConservations();
  }, []);
  return { loading, conservations };
}

export default useConservations;

import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const userFetch = (cb, options = {}) => {
  const { session } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fun = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });

      const res = await cb(supabaseAccessToken, options, ...args);
      setData(res);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { fun, data, error, loading };
};

export default userFetch;

import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { self } from "../http/api";
import { useAuthStore } from "../store";
import { useEffect } from "react";

const getSelfInfo = async () => {
  const { data } = await self();
  return data;
};

export default function Root() {
  const { setUser } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["selfInfo"],
    queryFn: getSelfInfo,
  });

  useEffect(() => {
    console.log("Root useEffect data:", data);
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

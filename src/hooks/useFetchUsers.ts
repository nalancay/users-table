import { useEffect, useRef, useState } from "react";
import ApiUsers from "../services/users";
import { type User } from "../types";

export type ErrorStateProps = {
  hasError: boolean;
  message: string;
};

export const useFetchUsers = () => {
  const [errorState, setErrorState] = useState<ErrorStateProps>({
    hasError: false,
    message: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const originalUsers = useRef<User[]>([]);
  // useRef -> para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente

  useEffect(() => {
    setLoading(true);
    ApiUsers.getUsers()
      .then((data) => {
        const apiData = data.results;
        setUsers(apiData);
        setLoading(false);
        originalUsers.current = data.results;
      })
      .catch((err) => setErrorState({ hasError: true, message: err.message }));
  }, []);

  return { users, setUsers, originalUsers, isLoading, errorState };
};

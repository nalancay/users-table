import { useMemo, useState } from "react";
import { SortBy, type User } from "../types.d";
import { useFetchUsers } from "./useFetchUsers";

export const useTableUsers = () => {
  const { users, setUsers, originalUsers } = useFetchUsers();
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColors = () => setShowColors(!showColors);

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleReset = () => setUsers(originalUsers.current);

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return [...filteredUsers].sort((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);
  return {
    state: {
      sorting,
      showColors,
      sortedUsers,
    },
    functions: {
      toggleColors,
      toggleSortByCountry,
      setFilterCountry,
      handleReset,
      handleChangeSort,
      handleDelete,
    },
  };
};

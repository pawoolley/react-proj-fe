import { useEffect, useState } from 'react';

export type ListItem = {
  description: string;
  ticked: boolean;
};

export type List = {
  id: string;
  name: string;
  description: string;
  listItemsCount: number;
  listItems?: ListItem[];
  createdAt: string;
  updatedAt?: string;
};

export type ListResponse = {
  list?: List;
  setList: (list: List) => void;
  loading: boolean;
  error?: Error;
};

export type ListsResponse = {
  lists?: List[];
  loading: boolean;
  error?: Error;
};

const BASE_URL = 'http://localhost:8080';

export const useLists = (): ListsResponse => {
  const [response, setResponse] = useState<ListsResponse>({
    loading: true,
  });

  useEffect(
    () => {
      fetch(`${BASE_URL}/lists`)
        // First, grab the json payload from the response.
        .then((resp) => {
          return resp.json();
        })
        // then, update the state with the response.
        .then((data) => {
          setResponse({
            loading: false,
            lists: data,
          });
        })
        // report errors.
        .catch((error) => {
          setResponse({
            loading: false,
            error: error,
          });
        });
    },
    /*
  N.B. useEffect fires whenever a component mounts or updates. Because we update the state in the useEffect code
  and thus update the component, we can get in to a loop. By providing a static empty array as the second argument,
  which normally tells the useEffect hook to only fire an update when a property in that list changes, we can ensure the
  useEffect hook only fires on mount and not on update.
  */
    []
  );

  return response;
};

export const useList = (id: string | undefined): ListResponse => {
  const [list, setList] = useState<List | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (id) {
      fetch(`${BASE_URL}/lists/${id}`)
        // First, grab the json payload from the response.
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status}, ${resp.statusText}, failed to fetch list ${id}`);
        })
        // then, update the state with the response.
        .then((data) => {
          setList(data);
          setLoading(false);
        })
        // report errors.
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  }, [id]);

  return {
    list,
    loading,
    error,
    setList,
  };
};

export const updateList = (list: List) => {
  list.updatedAt = new Date().toISOString();
  fetch(`${BASE_URL}/lists/${list.id}`, {
    method: 'PUT',
    body: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(`updated list: ${list.id}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

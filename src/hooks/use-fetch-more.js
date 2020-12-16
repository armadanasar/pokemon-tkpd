import { useQuery } from "@apollo/client";

// Circumventing fetchMore blah blah undefined error

export function useFetchMore(Query, options) {
  const { loading, error, data, fetchMore, ...others } = useQuery(
    Query,
    options
  );
  return { loading, error, data, fetchMore, ...others };
}

import qs from "query-string";

interface urlQueryParams {
  params: string;
  key: string;
  value: string;
}

interface removeUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

// Function to update or add a query parameter
export const formUrlQuery = ({ params, key, value }: urlQueryParams) => {
  const queryString = qs.parse(params);
  queryString[key] = value;

  return `${window.location.pathname}?${qs.stringify(queryString)}`;
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: removeUrlQueryParams) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  const updatedQuery = qs.stringify(queryString, { skipNull: true });

  return updatedQuery
    ? `${window.location.pathname}?${updatedQuery}`
    : window.location.pathname;
};

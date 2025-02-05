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

export const getTimeStamp = (date: Date) => {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

import { useState, useRef, useMemo } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { BASE_URL_PROFILE } from "../../../hooks/config";
import { instance } from "../../../api/api.config";

export function DebounceSelect({
  fetchOptions,
  debounceTimeout = 500,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

export async function fetchUserList(username) {
  return instance.get(`
    ${BASE_URL_PROFILE}/profiles/search?searchText=${username}`)
    .then((response) => response.data)
    .then((body) =>
      body.searchInfo.map((user) => ({
        label: `${user.employeeSearchInfo.lastName} ${user.employeeSearchInfo.firstName} ${user.employeeSearchInfo.middleName}`,
        value: user.employeeSearchInfo.id,
      }))
    );
}

import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import useMetaDataStore from "@/stores/meta-data.store";

import { FilterProps, OptionProps } from "@/types";
import { Box, Button, Flex } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useCallback, useMemo, useState } from "react";
import classes from "./Search.module.scss";

type SearchBar = {
  Component: React.ReactNode;
  Key: string;
};

type SearchBarProps = {
  filter: FilterProps;
  setFilter: (filter: FilterProps) => void;
  keys?: string[];
  leftSection?: React.ReactNode;
};

const OPTION_ACTIVE: OptionProps[] = [
  { label: "Active", value: "Active" },
  { label: "Disable", value: "Disable" },
];

const SearchBar = ({
  filter,
  setFilter,
  keys,
  leftSection,
}: SearchBarProps) => {
  const t = useTranslation();
  const [name, setName] = useState<string | undefined>(undefined);
  const [searchBarKey, setSearchBarKey] = useState(Date.now());
  const { branchOptionsByChainId, chainOptions } = useMetaDataStore();

  const branchOptions = useMemo(
    () => branchOptionsByChainId[filter.chainId || ""] || [],
    [branchOptionsByChainId, filter.chainId],
  );

  const onSelectBranch = useCallback(
    (branch: string | null) => {
      setFilter({
        ...filter,
        branchId: branch ?? undefined,
        _on: true,
      });
    },
    [filter, setFilter],
  );

  const onSelectChain = useCallback(
    (chain: string | null) => {
      setFilter({
        ...filter,
        chainId: chain ?? undefined,
        _on: true,
      });
    },
    [filter, setFilter],
  );

  const onSelectStatus = useCallback(
    (value: string | null) => {
      setFilter({
        ...filter,
        _on: true,
        active:
          value !== null
            ? value === "Active"
              ? true
              : false
            : undefined,
      });
    },
    [filter, setFilter],
  );

  const onEnter = useCallback(
    (value?: string) => {
      setFilter({ ...filter, keyword: value });
    },
    [filter, setFilter],
  );

  const _searchBarOptions = useMemo(() => {
    return [
      {
        Key: "CHAIN_OPTIONS",
        Component: (
          <Select
            key={0}
            placeholder={t("Select chains")}
            options={chainOptions}
            onChange={onSelectChain}
          />
        ),
      },
      {
        Key: "BRANCH_OPTIONS",
        Component: (
          <>
            {branchOptions.length > 0 && (
              <Select
                key={1}
                placeholder={t("Select branches")}
                options={branchOptions}
                onChange={onSelectBranch}
              />
            )}
          </>
        ),
      },
      {
        Key: "STATUS_OPTION",
        Component: (
          <Select
            key={2}
            placeholder={t("Select status")}
            options={OPTION_ACTIVE}
            onChange={onSelectStatus}
          />
        ),
      },
    ];
  }, [
    chainOptions,
    branchOptions,
    onSelectBranch,
    onSelectChain,
    onSelectStatus,
    t,
  ]);

  const _searchBar: SearchBar[] = useMemo(() => {
    return filterSearchBarByKeys(_searchBarOptions, keys);
  }, [_searchBarOptions, keys]);

  const isFiltering = useMemo(() => {
    return (
      Object.values(filter).filter((value) => {
        return value !== undefined && value !== null && value !== "";
      }).length > 0
    );
  }, [filter]);

  const resetFilter = useCallback(() => {
    setFilter({});
    setSearchBarKey(Date.now());
  }, [setFilter]);

  return (
    <Box mt={10} className={classes.container}>
      {leftSection}
      <Box className={classes.container} key={searchBarKey}>
        {_searchBar.map(({ Component }, index) => (
          <React.Fragment key={index}>{Component}</React.Fragment>
        ))}
      </Box>
      <Flex>
        <TextInput
          value={name}
          placeholder={t("Search by name")}
          onChange={(e) => setName(e.target.value)}
          rightSection={<IconSearch />}
          onEnter={() => onEnter(name)}
        />
        <Button
          ml={10}
          type="submit"
          disabled={!isFiltering}
          className={classes.btn}
          onClick={resetFilter}
        >
          {t("Clear filter")}
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchBar;

function filterSearchBarByKeys(
  searchBarArray: SearchBar[],
  keys?: string[],
) {
  return keys
    ? searchBarArray.filter((item) => keys.includes(item.Key))
    : searchBarArray;
}

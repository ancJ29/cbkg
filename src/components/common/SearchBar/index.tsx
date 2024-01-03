import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { branchSelectOptions } from "@/services";
import useBranchStore from "@/stores/branch.store";
import useMetaDataStore from "@/stores/meta-data.store";

import { FilterProps, OptionProps } from "@/types";
import { Box } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useCallback, useMemo, useState } from "react";
import classes from "./Search.module.scss";

const OPTION_ACTIVE: OptionProps[] = [
  { label: "Active", value: "Active" },
  { label: "Disable", value: "Disable" },
];

const SearchBar = ({
  filter,
  setFilter,
  keys,
  leftSection,
}: {
  filter: FilterProps;
  setFilter: (filter: FilterProps) => void;
  keys?: string[];
  leftSection?: React.ReactNode;
}) => {
  const t = useTranslation();
  const { chainOptions: CHAIN_OPTIONS } = useMetaDataStore();
  const { branches } = useBranchStore();
  const [name, setName] = useState<string | undefined>(undefined);

  const onSelectBranch = useCallback(
    (branch: string | null) => {
      setFilter({ ...filter, branchId: branch as string });
    },
    [filter, setFilter],
  );

  const onSelectChain = useCallback(
    (chain: string | null) => {
      setFilter({
        ...filter,
        chainId: chain as string,
      });
    },
    [filter, setFilter],
  );

  const onSelectStatus = useCallback(
    (value: string | null) => {
      setFilter({
        ...filter,
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
      setFilter({ ...filter, name: value });
    },
    [filter, setFilter],
  );

  const BRANCH_OPTIONS: OptionProps[] = useMemo(
    () => branchSelectOptions(branches, filter.chainId || ""),
    [branches, filter.chainId],
  );

  const _searchBarOptions = useMemo(() => {
    return [
      {
        Key: "CHAIN_OPTIONS",
        Component: (
          <Select
            key={0}
            placeholder={t("Select chains")}
            options={CHAIN_OPTIONS}
            onChange={onSelectChain}
          />
        ),
      },
      {
        Key: "BRANCH_OPTIONS",
        Component: (
          <>
            {BRANCH_OPTIONS.length > 0 && (
              <Select
                key={1}
                placeholder={t("Select branches")}
                options={BRANCH_OPTIONS}
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
    BRANCH_OPTIONS,
    CHAIN_OPTIONS,
    onSelectBranch,
    onSelectChain,
    onSelectStatus,
    t,
  ]);

  const _searchBar: SearchBar[] = useMemo(() => {
    return filterSearchBarByKeys(_searchBarOptions, keys);
  }, [_searchBarOptions, keys]);

  return (
    <Box mt={10} className={classes.container}>
      {leftSection}
      <Box className={classes.container}>
        {_searchBar.map(({ Component }, index) => (
          <React.Fragment key={index}>{Component}</React.Fragment>
        ))}
      </Box>
      <TextInput
        value={name}
        placeholder={t("Search by name")}
        onChange={(e) => setName(e.target.value)}
        rightSection={<IconSearch />}
        onEnter={() => onEnter(name)}
      />
    </Box>
  );
};
export default SearchBar;

type SearchBar = {
  Component: React.ReactNode;
  Key: string;
};

function filterSearchBarByKeys(
  searchBarArray: SearchBar[],
  keys?: string[],
) {
  return keys
    ? searchBarArray.filter((item) => keys.includes(item.Key))
    : searchBarArray;
}

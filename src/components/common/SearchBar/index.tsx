import Select from "@/components/common/Select";
import { Box } from "@mantine/core";
import classes from "./Search.module.scss";
import useTranslation from "@/hooks/useTranslation";
import { useCallback, useMemo, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { OptionProps } from "@/types";
import { FilterProps, branchOptions, chainOptions } from "@/services";
import TextInput from "@/components/common/TextInput";
import useChainStore from "@/stores/chain.store";
import useBranchStore from "@/stores/branch.store";

const SearchBar = ({
  filter,
  setFilter,
}: {
  filter: FilterProps;
  setFilter: (filter: FilterProps) => void;
}) => {
  const t = useTranslation();
  const { chains } = useChainStore();
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
        // branchId: null,
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

  const OPTION_CHAIN: OptionProps[] = useMemo(
    () => chainOptions(chains),
    [chains],
  );

  const OPTION_BRANCH: OptionProps[] = useMemo(
    () => branchOptions(branches, filter.chainId || ""),
    [branches, filter.chainId],
  );

  return (
    <Box mt={10} className={classes.container}>
      <Box className={classes.container}>
        <Select
          placeholder={t("Select chains")}
          options={OPTION_CHAIN}
          onChange={onSelectChain}
        />
        {OPTION_BRANCH.length > 0 && (
          <Select
            placeholder={t("Select branches")}
            options={OPTION_BRANCH}
            //   value={filter.branchId}
            onChange={onSelectBranch}
          />
        )}
        <Select
          placeholder={t("Select status")}
          options={OPTION_ACTIVE}
          onChange={onSelectStatus}
        />
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

const OPTION_ACTIVE: OptionProps[] = [
  { id: "Active", name: "Active" },
  { id: "Disable", name: "Disable" },
];

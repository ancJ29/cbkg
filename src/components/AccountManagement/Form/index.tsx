import ConfirmPopup from "@/components/common/ConfirmPopup";
import ErrorMessage from "@/components/common/ErrorMessage";
import PasswordInput from "@/components/common/PasswordInput";
import RadioGroup from "@/components/common/RadioGroup";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import useWatchProp from "@/hooks/useWatchProp";
import { branchOptions, chainOptions } from "@/services";
import useAuthStore from "@/stores/auth.store";
import useBranchStore from "@/stores/branch.store";
import useChainStore from "@/stores/chain.store";
import useUserStore from "@/stores/user.store";
import { OptionProps, Role, User, UserRequest } from "@/types";
import { roles } from "@/types/common/role";
import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import classes from "./AccountForm.module.scss";

type AccountFormProps = {
  fullName: string;
  username: string;
  password: string;
  rePassword: string;
  roles: Role;
};

const AccountForm = ({
  user,
  onSave,
  action,
}: {
  user?: User;
  onSave: (value: UserRequest) => void;
  action?: string;
  error?: string;
}) => {
  const t = useTranslation();
  const { user: currentUser } = useAuthStore();
  const { error } = useUserStore();
  const { chains } = useChainStore();
  const { branches } = useBranchStore();
  const [chainId, setChainId] = useState(
    user?.chain?.id || currentUser?.chain?.id || null,
  );
  const [branchId, setBranchId] = useState(
    user?.branch?.id || currentUser?.branch?.id || null,
  );
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);

  const OPTION_CHAIN: OptionProps[] = useMemo(
    () => chainOptions(chains),
    [chains],
  );

  const OPTION_BRANCH: OptionProps[] = useMemo(
    () => branchOptions(branches, chainId || ""),
    [branches, chainId],
  );

  const form = useForm<AccountFormProps>({
    initialValues: {
      fullName: user?.fullName || "",
      username: user?.name || "",
      password: "",
      rePassword: "",
      roles: roles(user?.role || currentUser?.role || "STAFF")[0].id,
    },
    validate: {
      username: (value: string) =>
        value.length < 1 ? t("Please enter Username") : null,
      password: (value: string) =>
        value.length < 1 ? t("Please enter Password") : null,
      rePassword: (value: string) =>
        value.length < 1 ? t("Please enter Password") : null,
    },
  });

  const onSelectBranch = useCallback((branch: string | null) => {
    setBranchId(branch || "");
  }, []);

  const onSelectChain = useCallback(
    (chain: string | null) => {
      setChainId(chain);
      setBranchId(null);
    },
    [setBranchId],
  );

  const displayChains = useMemo(() => {
    return OPTION_CHAIN.length > 0;
  }, [OPTION_CHAIN.length]);

  const displayBranches = useMemo(() => {
    return (
      !["CHAIN-MANAGER"].includes(form.values.roles || "") &&
      OPTION_BRANCH.length > 0
    );
  }, [OPTION_BRANCH.length, form.values.roles]);

  const onSubmit = useCallback(
    async (value: AccountFormProps) => {
      const data: UserRequest = {
        name: value.username,
        password: value.password,
        role: value.roles,
        chainId: chainId as string,
        branchId: branchId as string,
        active: true,
      };
      data && onSave(data);
    },
    [branchId, chainId, onSave],
  );

  useWatchProp(error, () => {
    !error && form.reset();
  });

  const isValid = useMemo(() => {
    const values = form.values;
    const validationErrors = {
      username:
        values.username.length < 1
          ? t("Please enter current password")
          : null,
      password:
        values.password.length < 1
          ? t("Please enter new password")
          : null,
      rePassword:
        values.rePassword !== values.password
          ? t("Passwords did not match")
          : null,
    };

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null,
    );
    return !hasErrors;
  }, [form, t]);

  return (
    <>
      <form onSubmit={form.onSubmit(() => openModalConfirm())}>
        <Stack gap={20} px={10} my={20}>
          <div className={classes.inputContainer}>
            <Text>{t("FullName")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("FullName")}
              {...form.getInputProps("fullName")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Username")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Username")}
              {...form.getInputProps("username")}
            />
          </div>
          {!user && (
            <>
              <div className={classes.inputContainer}>
                <Text>{t("Password")}:</Text>
                <PasswordInput
                  withAsterisk
                  className={classes.input}
                  placeholder={t("Password")}
                  {...form.getInputProps("password")}
                />
              </div>
              <div className={classes.inputContainer}>
                <Text>{t("Re password")}:</Text>
                <PasswordInput
                  className={classes.input}
                  withAsterisk
                  placeholder={t("Re password")}
                  {...form.getInputProps("rePassword")}
                />
              </div>
            </>
          )}
          <div className={classes.radioContainer}>
            <Text>{t("Roles:")}</Text>
            <RadioGroup
              classNameBox={classes.classNameBox}
              options={roles(currentUser?.role)}
              value={form.values.roles}
              onChange={(value) =>
                form.setFieldValue("roles", value as Role)
              }
            />
          </div>
        </Stack>
        <Box bg="gray.1">
          {displayChains && (
            <Box className={classes.inputContainer} p={10}>
              <Text>{t("Select chains")}:</Text>
              <Select
                placeholder={t("Select chains")}
                options={OPTION_CHAIN}
                value={chainId || ""}
                onChange={(value) => onSelectChain(value)}
                className={classes.input}
              />
            </Box>
          )}
          {displayBranches && (
            <Box className={classes.inputContainer} p={10}>
              <Text>{t("Select branches")}:</Text>
              <Select
                placeholder={t("Select branches")}
                options={OPTION_BRANCH}
                value={branchId}
                onChange={(value) => onSelectBranch(value)}
                className={classes.input}
              />
            </Box>
          )}
        </Box>
        <Flex
          gap={12}
          w="100%"
          py={12}
          justify="center"
          direction="column"
        >
          <Center>
            <Button
              type="submit"
              disabled={!isValid}
              className={classes.btn}
              onClick={openModalConfirm}
            >
              {t(action || "Create")}
            </Button>
          </Center>
          <ErrorMessage message={error as string} />
        </Flex>
        <ConfirmPopup
          title={t("Confirm")}
          description={
            // eslint-disable-next-line quotes
            // t("Add user") + ' "' + form.values.username + '"'
            `${t("Add user")} "${form.values.username}"`
          }
          open={isValid && open}
          onClose={close}
          onSave={() => onSubmit(form.values)}
        />
      </form>
    </>
  );
};

export default AccountForm;

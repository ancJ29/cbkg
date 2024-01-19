import { Role } from "@/auto-generated/prisma-schema";
import CheckBox from "@/components/common/CheckBox";
import ConfirmPopup from "@/components/common/ConfirmPopup";
import ErrorMessage from "@/components/common/ErrorMessage";
import PasswordInput from "@/components/common/PasswordInput";
import RadioGroup from "@/components/common/RadioGroup";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import useAuthStore from "@/stores/auth.store";
import useMetaDataStore from "@/stores/meta-data.store";
import {
  User as Account,
  Branch,
  CheckBoxOptions,
  OptionProps,
} from "@/types";
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
import { useDisclosure, useListState } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import classes from "./CreateForm.module.scss";

type FormProps = {
  id: string;
  userName: string;
  fullName: string;
  password: string;
  rePassword: string;
  role: Role;
  active: boolean;
  branchIds?: string[];
  chainIds?: string[];
};

const initialValues: FormProps = {
  id: "",
  userName: "",
  fullName: "",
  password: "",
  rePassword: "",
  role: "STAFF",
  active: true,
  branchIds: [],
  chainIds: [],
};

type CreateAccountFormProps = {
  onSave: (value: Account) => Promise<string | undefined>;
};

const CreateAccountForm = ({ onSave }: CreateAccountFormProps) => {
  const t = useTranslation();

  const {
    defaultChainId,
    defaultBranchId,
    branches,
    chainOptions,
    branchOptionsByChainId,
  } = useMetaDataStore();

  const form = useForm<FormProps>({
    initialValues: {
      ...initialValues,
      chainIds: defaultChainId ? [defaultChainId] : [],
      branchIds: defaultBranchId ? [defaultBranchId] : [],
    },
    // TODO: consider for better approach!
    transformValues,
    validate: _validate(),
  });
  const [branchId, setBranchId] = useState<string>("");
  const [chainId, setChainId] = useState<string>(
    form.values.chainIds?.[0] || "",
  );

  const [error, setError] = useState<string | undefined>();

  const { user: currentUser } = useAuthStore();

  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);

  const [branchOptions, setBranchOptions] = useState<OptionProps[]>(
    [],
  );
  const [branchCheckboxOptions, setBranchCheckboxOptions] =
    useListState<CheckBoxOptions>(
      _branchCheckBoxOptions(branches, chainId || ""),
    );

  const [hasChain, hasBranch] = useMemo(
    () => [chainOptions.length > 0, branchCheckboxOptions.length > 0],
    [branchCheckboxOptions, chainOptions],
  );

  const isStaff = useMemo(() => {
    return form.values.role === "STAFF";
  }, [form.values.role]);

  const displayBranches = useMemo(() => {
    return hasBranch && form.values.role !== "CHAIN_MANAGER";
  }, [hasBranch, form.values.role]);

  const updateBranchCheckBoxOptions = useCallback(
    (chainId: string) => {
      const options = _branchCheckBoxOptions(branches, chainId || "");
      setBranchCheckboxOptions.setState(options);
    },
    [branches, setBranchCheckboxOptions],
  );

  const switchChain = useCallback(
    (chainId?: string | null) => {
      setChainId(chainId || "");
      updateBranchCheckBoxOptions(chainId || "");
      const options = branchOptionsByChainId[chainId || ""] || [];
      setBranchOptions(options);
      if (options.length === 1) {
        setBranchId(options[0]?.value.toString() || "");
      }
    },
    [updateBranchCheckBoxOptions, branchOptionsByChainId],
  );

  const switchBranch = useCallback((branchId: string | null) => {
    setBranchId(branchId || "");
  }, []);

  const confirm = useCallback(() => {
    form.validate();
    if (form.isValid()) {
      openModalConfirm();
    }
  }, [form, openModalConfirm]);

  const submit = useCallback(async () => {
    if (onSave) {
      setError(undefined);
      if (isStaff) {
        form.values.branchIds = [branchId];
      } else {
        form.values.branchIds = branchCheckboxOptions
          .filter((item) => item.checked)
          .map((item) => item.key) as string[];
      }

      const error = await onSave(form.values);
      if (error) {
        error && setError(error);
        // TODO: toast error
      } else {
        form.reset();
        // TODO: toast success
      }
    }
  }, [branchCheckboxOptions, branchId, form, isStaff, onSave]);

  return (
    <>
      <form onSubmit={form.onSubmit(openModalConfirm)}>
        <Stack gap={20} px={10} my={20}>
          <div className={classes.inputContainer}>
            <Text>{t("Username")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Username")}
              {...form.getInputProps("userName")}
            />
          </div>
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
          <div className={classes.radioContainer}>
            <Text>{t("Roles:")}</Text>
            <RadioGroup
              classNameBox={classes.classNameBox}
              options={roles(currentUser?.role || undefined)}
              value={form.values.role}
              onChange={(value) =>
                form.setFieldValue("role", value as Role)
              }
            />
          </div>
        </Stack>
        <Box bg="gray.1">
          {hasChain && (
            <Box className={classes.inputContainer} p={10}>
              <Text>{t("Select chains")}:</Text>
              <Select
                placeholder={t("Select chains")}
                options={chainOptions}
                value={chainId || null}
                onChange={switchChain}
                className={classes.input}
              />
            </Box>
          )}
          {displayBranches && (
            <Box className={classes.inputContainer} p={10}>
              <Text>{t("Select branches")}:</Text>
              {isStaff ? (
                <Select
                  placeholder={t("Select branch")}
                  options={branchOptions}
                  value={branchId || null}
                  onChange={switchBranch}
                  className={classes.input}
                />
              ) : (
                <CheckBox
                  multiple
                  options={branchCheckboxOptions}
                  handlers={setBranchCheckboxOptions}
                />
              )}
            </Box>
          )}
        </Box>
        <Flex
          gap={12}
          w="100%"
          pb={12}
          pt={28}
          justify="center"
          direction="column"
        >
          <Center>
            <Button
              disabled={!form.isValid()}
              type="submit"
              className={classes.btn}
              onClick={confirm}
            >
              {t("Create")}
            </Button>
          </Center>
          <ErrorMessage message={error} />
        </Flex>
        <ConfirmPopup
          title={t("Confirm")}
          description={t(
            // TODO: translate this (vi.json)
            "Are you sure you want to create this account?",
          )}
          open={open}
          onClose={close}
          onSave={submit}
        />
      </form>
    </>
  );
};

export default CreateAccountForm;

function _validate() {
  return {
    userName: (value: string) => !value,
    fullName: (value: string) => !value,
    password: (value: string) => !value,
    rePassword: (value: string, values: FormProps) =>
      !value && values.password !== value,
    chains: (value: string) => !value,
  };
}

function transformValues(values: FormProps) {
  return {
    id: values.id.trim(),
    userName: values.userName.toString().trim(),
    fullName: values.fullName.toString().trim(),
    password: values.password.toString().trim(),
    rePassword: values.rePassword.toString().trim(),
    role: values.role,
    active: values.active,
    branchIds: values.branchIds,
    chainIds: values.chainIds,
  };
}

function _branchCheckBoxOptions(
  branches: Branch[],
  chainId: string,
): CheckBoxOptions[] {
  const _branches = branches.filter(
    (branch) => branch.chainId === chainId,
  );
  return _branches.map(({ id, name }) => ({
    key: id as string,
    checked: _branches.length === 1,
    label: name as string,
  }));
}

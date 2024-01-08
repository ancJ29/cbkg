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
  Role,
  roleEnums,
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
  branchCheckboxOptions?: string[];
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
  branchCheckboxOptions: [],
  chainIds: [],
};

type CreateAccountFormProps = {
  onSave: (value: Account) => Promise<string | undefined>;
};

const CreateAccountForm = ({ onSave }: CreateAccountFormProps) => {
  const t = useTranslation();
  const { defaultChainId, defaultBranchId, branches, chainOptions } =
    useMetaDataStore();
  const form = useForm<FormProps>({
    initialValues: {
      ...initialValues,
      chainIds: defaultChainId ? [defaultChainId] : [],
      branchCheckboxOptions: defaultBranchId ? [defaultBranchId] : [],
    },
    // TODO: consider for better approach!
    transformValues,
    validate: _validate(t),
  });
  const [chainId, setChainId] = useState<string>(
    form.values.chainIds?.[0] || "",
  );
  const [error, setError] = useState<string | undefined>();
  const { user: currentUser } = useAuthStore();
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);
  const [branchCheckboxOptions, setBranchCheckboxOptions] =
    useListState<CheckBoxOptions>(
      _branchCheckBoxOptions(branches, chainId || ""),
    );

  const hasBranch = useMemo(
    () => branchCheckboxOptions.length > 0,
    [branchCheckboxOptions],
  );
  const hasChain = useMemo(
    () => chainOptions.length > 0,
    [chainOptions],
  );
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
    },
    [updateBranchCheckBoxOptions],
  );

  const confirm = useCallback(() => {
    form.validate();
    if (form.isValid()) {
      openModalConfirm();
    }
  }, [form, openModalConfirm]);

  const submit = useCallback(async () => {
    if (onSave) {
      setError(undefined);
      form.values.branchCheckboxOptions = branchCheckboxOptions
        .filter((item) => item.checked)
        .map((item) => item.key) as string[];

      form.values.chainIds = chainId ? [chainId] : [];
      const error = await onSave(form.values);
      if (error) {
        error && setError(error);
        // TODO: toast error
      } else {
        form.reset();
        // TODO: toast success
      }
    }
  }, [branchCheckboxOptions, chainId, form, onSave]);

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
              options={roles(currentUser?.role)}
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
              <CheckBox
                multiple={[
                  roleEnums.Enum.MANAGER.toString(),
                ].includes(form.values.role)}
                options={branchCheckboxOptions}
                handlers={setBranchCheckboxOptions}
              />
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

function _validate(t: (v: string) => string) {
  return {
    userName: (value: string) =>
      value.length < 1 ? t("Please enter Username") : null,
    fullName: (value: string) =>
      value.length < 1 ? t("Please enter Full name") : null,
    password: (value: string) =>
      value.length < 1 ? t("Please enter Password") : null,
    rePassword: (value: string, values: FormProps) => {
      if (value.length < 1) {
        return t("Please enter Password");
      }
      if (values.password !== value) {
        return t("Passwords did not match");
      }
    },
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
    branchCheckboxOptions: values.branchCheckboxOptions,
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

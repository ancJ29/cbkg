import CheckBox from "@/components/common/CheckBox";
import ConfirmPopup from "@/components/common/ConfirmPopup";
import ErrorMessage from "@/components/common/ErrorMessage";
import PasswordInput from "@/components/common/PasswordInput";
import RadioGroup from "@/components/common/RadioGroup";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { branchCheckBoxOptions } from "@/services";
import useAuthStore from "@/stores/auth.store";
import useBranchStore from "@/stores/branch.store";
import useChainStore from "@/stores/chain.store";
import {
  AddUserRequest,
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
  name: string;
  password: string;
  rePassword: string;
  role: Role;
  active: boolean;
  branchIds?: string[];
  chainIds?: string[];
};

const initialValues: FormProps = {
  id: "",
  name: "",
  password: "",
  rePassword: "",
  role: "STAFF",
  active: true,
  branchIds: [],
  chainIds: [],
};

type CreateAccountFormProps = {
  onSave: (value: AddUserRequest) => Promise<string | undefined>;
};

const CreateAccountForm = ({ onSave }: CreateAccountFormProps) => {
  const t = useTranslation();
  const [chainId, setChainId] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();
  const { user: currentUser } = useAuthStore();
  const { options: chainOptions } = useChainStore();
  const { branches } = useBranchStore();
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);
  const [branchIds, setBranchIds] = useListState<CheckBoxOptions>([]);
  const form = useForm<FormProps>({
    initialValues,
    validate: _validate(t),
    // TODO: consider for better approach!
    transformValues: (values) => {
      const transformedValues = _transformValues(values);
      return transformedValues;
    },
  });
  const hasBranch = useMemo(() => branchIds.length > 0, [branchIds]);
  const hasChain = useMemo(
    () => chainOptions.length > 0,
    [chainOptions],
  );
  const displayBranches = useMemo(() => {
    return hasBranch && form.values.role !== "CHAIN_MANAGER";
  }, [hasBranch, form.values.role]);

  const setBranch = useCallback(
    (chain: string) => {
      setBranchIds.setState(
        branchCheckBoxOptions(branches, chain || ""),
      );
    },
    [branches, setBranchIds],
  );

  const switchChain = useCallback(
    (chainId?: string | null) => {
      setChainId(chainId || null);
      setBranch(chainId || "");
    },
    [setBranch],
  );

  const confirm = useCallback(() => {
    form.validate();
    if (form.isValid()) {
      openModalConfirm();
    }
  }, [form, openModalConfirm]);

  const submit = useCallback(async () => {
    // staff-1
    if (onSave) {
      setError(undefined);
      form.values.branchIds = branchIds
        .map((item) => item.key)
        .filter(Boolean) as string[];
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
  }, [branchIds, chainId, form, onSave]);

  return (
    <>
      <form onSubmit={form.onSubmit(openModalConfirm)}>
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
              {...form.getInputProps("name")}
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
                values={branchIds}
                handlers={setBranchIds}
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
    name: (value: string) =>
      value.length < 1 ? t("Please enter Username") : null,
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

function _transformValues(values: FormProps) {
  return {
    id: values.id.toString().trim(),
    name: values.name.toString().trim(),
    password: values.password.toString().trim(),
    rePassword: values.rePassword.toString().trim(),
    role: values.role,
    active: values.active,
    branchIds: values.branchIds,
    chainIds: values.chainIds,
  };
}

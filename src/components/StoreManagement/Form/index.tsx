import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { Box, Button, Center, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Form.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Branch, OptionProps, STATUS_CODE } from "@/types";
import useWatchProp from "@/hooks/useWatchProp";
import RadioGroup from "@/components/common/RadioGroup";
import { getChains } from "@/services";
import logger from "@/services/logger";
import ConfirmPopup from "@/components/common/ConfirmPopup";
import { useDisclosure } from "@mantine/hooks";
import ErrorMessage from "@/components/common/ErrorMessage";

const BranchForm = ({
  branch,
  onSave,
  action,
  error,
  trigger,
}: {
  branch?: Branch;
  onSave?: (value: Branch) => void;
  action?: string;
  error?: string;
  trigger?: number;
}) => {
  const t = useTranslation();
  const [chains, setChains] = useState<OptionProps[]>([]);
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);

  const form = useForm<Branch>({
    initialValues: {
      id: branch?.id || undefined,
      name: branch?.name || "",
      shortName: branch?.shortName || "",
      address: branch?.address || "",
      phone: branch?.phone || "",
      email: branch?.email || "",
      chainId: branch?.chainId || "",
    },
    validate: {
      name: (value?: string) => !value && t("Please enter name"),
      address: (value?: string) =>
        !value && t("Please enter address"),
      phone: (value?: string) =>
        !value && t("Please enter phone number"),
      email: (value?: string) => !value && t("Please enter Email"),
    },
  });
  const isValid = useMemo(() => {
    const values = form.values;
    const validationErrors = {
      name: !values.name ? t("Please enter name") : null,
      address: !values.address ? t("Please enter address") : null,
      phone: !values.phone ? t("Please enter phone") : null,
      email: !values.email ? t("Please enter email") : null,
    };

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null,
    );

    return !hasErrors;
  }, [form, t]);
  // TODO:
  const onSubmit = useCallback(
    (value: Branch) => {
      onSave && onSave(value);
    },
    [onSave],
  );
  useWatchProp(trigger, () => {
    !error ? form.reset() : form.setErrors({ general: t(error) });
  });

  const fetchChain = async () => {
    const response = await getChains({
      take: 100,
    });
    if (response.status >= STATUS_CODE.ERROR) {
      logger.warn(response.error);
      return;
    }
    setChains(response.data.chains);
  };

  useEffect(() => {
    fetchChain();
  }, []);
  return (
    <>
      <form onSubmit={form.onSubmit(() => openModalConfirm())}>
        <Stack gap={10} px={10} mt={10}>
          <div className={classes.inputContainer}>
            <Text>{t("Name")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Name")}
              {...form.getInputProps("name")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Short Name")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Short Name")}
              {...form.getInputProps("shortName")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Phone Number")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Phone Number")}
              {...form.getInputProps("phone")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Email")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Email")}
              {...form.getInputProps("email")}
            />
          </div>
          <div className={classes.inputContainer}>
            <Text>{t("Address")}:</Text>
            <TextInput
              className={classes.input}
              withAsterisk
              placeholder={t("Address")}
              {...form.getInputProps("address")}
            />
          </div>

          <Box className={classes.radioContainer} p={10}>
            <Text>{t("Select chains")}:</Text>
            <RadioGroup
              options={chains}
              value={form.values.chainId || ""}
              onChange={(value) => {
                const selectedChain = chains.find(
                  (chains) => chains.id === value,
                );
                if (selectedChain) {
                  form.setValues({ chainId: selectedChain.id });
                }
              }}
              classNameBox={classes.classNameBox}
            >
              {/*  */}
            </RadioGroup>
          </Box>
          <div className={classes.inputContainer}>
            <Center className="w-full">
              <Button
                type="submit"
                disabled={!isValid}
                className={classes.btn}
                onClick={openModalConfirm}
              >
                {t(action || "Create")}
              </Button>
            </Center>
          </div>
          <ErrorMessage message={t(form.errors.general as string)} />
        </Stack>
        <ConfirmPopup
          title={t("Confirm")}
          description={
            // eslint-disable-next-line quotes
            t("Add user") + ' "' + form.values.name + '"'
          }
          open={isValid && open}
          onClose={close}
          onSave={() => onSubmit(form.values)}
        />
      </form>
    </>
  );
};
export default BranchForm;

import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { Button, Center, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Form.module.scss";
import { useCallback, useMemo } from "react";
import { Chain } from "@/types";
import useWatchProp from "@/hooks/useWatchProp";
import ErrorMessage from "@/components/common/ErrorMessage";
import ConfirmPopup from "@/components/common/ConfirmPopup";
import { useDisclosure } from "@mantine/hooks";
import useChainStore from "@/stores/chain.store";

const ChainForm = ({
  chain,
  onSave,
  action,
}: {
  chain?: Chain;
  onSave?: (value: Chain) => void;
  action?: string;
}) => {
  const t = useTranslation();
  const { error } = useChainStore();
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);

  const form = useForm<Chain>({
    initialValues: {
      id: chain?.id || "",
      name: chain?.name || "",
    },
    validate: {
      name: (value?: string) => !value && t("Please enter name"),
    },
  });
  const isValid = useMemo(() => {
    const values = form.values;
    const validationErrors = {
      name: !values.name ? t("Please enter name") : null,
    };

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null,
    );

    return !hasErrors;
  }, [form, t]);
  // TODO:
  const onSubmit = useCallback(
    (value: Chain) => {
      onSave && onSave(value);
    },
    [onSave],
  );
  useWatchProp(error, () => {
    !error && form.reset();
  });

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
          <ErrorMessage message={error as string} />
          <Center>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!isValid}
              onClick={openModalConfirm}
            >
              {t(action || "Create")}
            </Button>
          </Center>
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
export default ChainForm;

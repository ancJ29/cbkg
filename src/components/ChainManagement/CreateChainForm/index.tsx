import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { Button, Card, Center, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Form.module.scss";
import { useCallback, useMemo, useState } from "react";
import { Chain } from "@/types";
import ErrorMessage from "@/components/common/ErrorMessage";
import ConfirmPopup from "@/components/common/ConfirmPopup";
import { useDisclosure } from "@mantine/hooks";
import Collapse from "@/components/common/Collapse";
import useChainStore from "@/stores/chain.store";

const CreateChainForm = () => {
  const t = useTranslation();
  const [open, { close: close, open: openModalConfirm }] =
    useDisclosure(false);
  const { addChain } = useChainStore();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<Chain>({
    initialValues: {
      id: "",
      name: "",
    },
    validate: {
      name: (value?: string) => !value && t("Please enter name"),
    },
    // TODO: consider for better approach!
    transformValues: (values) => _transformValues(values),
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

  const onSubmit = useCallback(
    async (value: Chain) => {
      setError(undefined);
      const _error = await addChain(value.name?.trim() as string);
      _error ? setError(_error) : form.reset();
    },
    [addChain, form],
  );

  return (
    <Card
      withBorder
      shadow="md"
      w="100%"
      style={{ overflow: "visible" }}
    >
      <Collapse title={t("Create chain")}>
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
                {t("Create")}
              </Button>
            </Center>
          </Stack>
          <ConfirmPopup
            title={t("Confirm")}
            description={`${t("Add Chain")} "${form.values.name}"`}
            open={isValid && open}
            onClose={close}
            onSave={() => onSubmit(form.values)}
          />
        </form>
      </Collapse>
    </Card>
  );
};
export default CreateChainForm;

function _transformValues(values: Chain) {
  return {
    id: values.id.toString().trim(),
    name: values.name.toString().trim(),
  };
}

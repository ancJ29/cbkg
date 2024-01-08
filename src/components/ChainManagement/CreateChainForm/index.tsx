import Collapse from "@/components/common/Collapse";
import ConfirmPopup from "@/components/common/ConfirmPopup";
import ErrorMessage from "@/components/common/ErrorMessage";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { Chain } from "@/types";
import { Button, Card, Center, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import classes from "./Form.module.scss";

type CreateChainFormProps = {
  addChain: (name: string) => Promise<string | undefined>;
};

const CreateChainForm = ({ addChain }: CreateChainFormProps) => {
  const t = useTranslation();
  const [open, { close, open: openModal }] = useDisclosure(false);
  const [error, setError] = useState<string | undefined>();

  const form = useForm<Chain>({
    initialValues: { id: "", name: "" },
    transformValues,
    validate: {
      name: (value?: string) => !value && t("Please enter name"),
    },
  });

  const onSubmit = useCallback(
    async (chain: Chain) => {
      setError(undefined);
      const _error = await addChain(chain.name);
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
        <form onSubmit={form.onSubmit(openModal)}>
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
                disabled={!form.isValid()}
                onClick={openModal}
              >
                {t("Create")}
              </Button>
            </Center>
          </Stack>
          <ConfirmPopup
            title={t("Confirm")}
            description={`${t("Add Chain")} "${form.values.name}"`}
            open={form.isValid() && open}
            onClose={close}
            onSave={() => onSubmit(form.values)}
          />
        </form>
      </Collapse>
    </Card>
  );
};
export default CreateChainForm;

function transformValues(values: Chain) {
  return {
    id: values.id.trim(),
    name: values.name.toString().trim(),
  };
}

import ErrorMessage from "@/components/common/ErrorMessage";
import TextInput from "@/components/common/TextInput";
import useTranslation from "@/hooks/useTranslation";
import { Chain } from "@/types";
import { Button, Center, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useState } from "react";
import classes from "./Form.module.scss";
import useChainStore from "@/stores/chain.store";

const EditChainForm = ({
  chain,
  onClose,
}: {
  chain?: Chain;
  onClose?: () => void;
}) => {
  const t = useTranslation();
  const [error, setError] = useState<string | undefined>();
  const { editChain } = useChainStore();

  const form = useForm<Chain>({
    initialValues: {
      id: chain?.id || "",
      name: chain?.name || "",
    },
    validate: {
      name: (value?: string) => !value && t("Please enter name"),
    },
    // TODO: consider for better approach!
    transformValues: (values) => _transformValues(values),
  });

  const onSubmit = useCallback(async () => {
    setError(undefined);
    const _error = await editChain(form.values);
    _error ? setError(error) : onClose && onClose();
  }, [editChain, error, form.values, onClose]);

  return (
    <>
      <Stack gap={10} px={10} mt={10}>
        <div className={classes.inputContainer}>
          <Text>{t("Name")}:</Text>
          <TextInput
            className={classes.input}
            withAsterisk
            placeholder={t("Name")}
            onEnter={onSubmit}
            {...form.getInputProps("name")}
          />
        </div>
        <ErrorMessage message={error as string} />
        <Center>
          <Button
            onClick={onSubmit}
            className={classes.btn}
            disabled={!form.values.name}
            type="submit"
          >
            {t("Edit")}
          </Button>
        </Center>
      </Stack>
    </>
  );
};

export default EditChainForm;
function _transformValues(values: Chain) {
  return {
    id: values.id.toString().trim(),
    name: values.name.toString().trim(),
  };
}

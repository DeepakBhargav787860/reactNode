// UserForm.tsx
import API from "@/lib/Api";
import {
  TextInput,
  Button,
  Container,
  Paper,
  Title,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

export default function UserForm() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },

    validate: {
      name: (value) =>
        value.trim().length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const { isLoading: isSubmitLoading, mutate: submitData } = useMutation<
    any,
    Error
  >(
    async (v) => {
      if (true) {
        return await API.post<any>("/users", v, {
          withCredentials: true,
        });
      }
    },
    {
      onSuccess: (response) => {
        console.log("response", response);
        showNotification({
          title: "Success",
          message: "",
          color: "teal",
          icon: <IconCheck />,
        });
      },
      onError: (errMsg: any) => {
        showNotification({
          title: "Error",
          message: "submit failed",
          color: "red",
          icon: <IconX />,
        });
      },
    }
  );

  const handleSubmit = (values: typeof form.values) => {
    if (!form.validate().hasErrors) {
      let data: any = values;
      submitData(data);
    }
    console.log("Submitted values:", values);
    // You can send values to backend here
  };

  return (
    <Container size="sm" py="md">
      <Paper shadow="md" radius="md" p="lg" withBorder>
        <Title order={3} mb="md">
          User Form
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your name"
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <Button loading={isSubmitLoading} type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

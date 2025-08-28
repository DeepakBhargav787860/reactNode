import API from "@/lib/Api";
import {
  TextInput,
  Button,
  Container,
  Paper,
  Title,
  Stack,
  FileInput,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function UserForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

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
    Error,
    FormData
  >(
    async (formData) => {
      return await API.post("/users/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "User data submitted",
          color: "teal",
          icon: <IconCheck />,
        });
        form.reset();
        setFile(null);
        setPreview(null);
      },
      onError: () => {
        showNotification({
          title: "Error",
          message: "Submit failed",
          color: "red",
          icon: <IconX />,
        });
      },
    }
  );

  const handleSubmit = (values: typeof form.values) => {
    if (!form.validate().hasErrors && file) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("image", file);
      submitData(formData);
    } else {
      showNotification({
        title: "Validation Error",
        message: "Please fill all fields and upload image",
        color: "orange",
      });
    }
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
              label="Nameeeee"
              placeholder="Your name"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <FileInput
              label="Upload Image"
              accept="image/*"
              value={file}
              onChange={(f) => {
                setFile(f);
                if (f) setPreview(URL.createObjectURL(f));
                else setPreview(null);
              }}
              required
            />

            {preview && (
              <Image src={preview} alt="Preview" width={150} radius="md" />
            )}

            <Button loading={isSubmitLoading} type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

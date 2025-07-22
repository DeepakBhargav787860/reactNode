import { Notifications } from "@mantine/notifications";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useHotkeys, useColorScheme } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+T", () => toggleColorScheme()]]);

  // @ts-ignore
  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme || "light"}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme: colorScheme || "light" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications position={"top-right"} />
          <RouterProvider router={router} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;

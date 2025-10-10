import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

// Import schemas
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "turmet-travel-agency",
  title: "Turmet Travel Agency",
  projectId: "v488knj2", // Your new project ID
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

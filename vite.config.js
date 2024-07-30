import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// Load environment variables explicitly
const env = loadEnv(process.env.NODE_ENV, process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: env.VITE_BASE_URL || "/",
});

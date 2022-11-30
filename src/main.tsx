import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

/**
 * If you enable use of Node.js API in the Renderer-process
 * ```
 * npm i -D vite-plugin-electron-renderer
 * ```
 * @see - https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
 */
// import './samples/node-api'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>    <QueryClientProvider client={queryClient}>
    <App />    </QueryClientProvider>
  </React.StrictMode>
)

postMessage({ payload: "removeLoading" }, "*")

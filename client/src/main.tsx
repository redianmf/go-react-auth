import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import "./locales/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

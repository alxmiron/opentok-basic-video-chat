import { render } from "preact";
import { App } from "./components/App";
import { loadConfig } from "./config";

loadConfig().then(() => {
    render(<App />, document.getElementById("app"));
})

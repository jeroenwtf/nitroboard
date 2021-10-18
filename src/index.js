import "./styles/styles.scss";

import { Application } from "@hotwired/stimulus";
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers";
import turbolinks from "turbolinks";
import "typeface-inter";
import "alpinejs";
const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));
turbolinks.start();

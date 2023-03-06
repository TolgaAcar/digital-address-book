import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//import "./style.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
	theme: {
		defaultTheme: "dark",
	},
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			mdi,
		},
	},
	components: {
		...components,
		...labs,
	},
	directives,
});

//Pinia
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");

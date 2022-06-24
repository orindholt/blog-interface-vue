import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
	faBookmark,
	faArrowRightFromBracket,
	faPen,
	faTrashCan,
	faRss,
	faBookBookmark,
	faUser,
	faX,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

library.add(
	faBookmark,
	faBookmarkRegular,
	faArrowRightFromBracket,
	faPen,
	faTrashCan,
	faRss,
	faBookBookmark,
	faUser,
	faX
);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.config.unwrapInjectedRef = true;

app.use(router);

app.mount("#app");

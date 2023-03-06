import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
	state: () => ({
		contactListStatus: "initial",
		contactFormStatus: "initial",
		count: 0,
		hasError: false,
	}),
	actions: {
		increment() {
			this.count++;
		},
		setContactListStatus(newStatus) {
			this.contactListStatus = newStatus;
		},
		setContactFormStatus(newStatus) {
			this.contactFormStatus = newStatus;
		},
	},
});

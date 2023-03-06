<template>
	<div class="error-dialog-wrapper">
		<v-dialog v-model="dialog" width="auto">
			<v-card>
				<v-card-text>
					An error occured, please refresh the page.
				</v-card-text>
				<v-card-actions class="d-flex justify-center">
					<v-btn
						variant="tonal"
						color="red-darken-4"
						@click="closeDialog"
					>
						Close
					</v-btn>
					<v-btn
						variant="tonal"
						color="red-darken-4"
						@click="refreshPage"
					>
						Refresh
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useStatusStore } from "../../store/status";

export default {
	name: "ErrorDialog",
	data() {
		return {
			dialog: false,
		};
	},
	methods: {
		closeDialog() {
			this.dialog = false;
		},
		refreshPage() {
			this.$router.go();
		},
	},
	computed: {
		...mapState(useStatusStore, ["contactFormStatus", "contactListStatus"]),
	},
	watch: {
		contactFormStatus(newValue) {
			if (newValue === "error") {
				this.dialog = true;
			} else {
				this.dialog = false;
			}
		},
		contactListStatus(newValue) {
			if (newValue === "error") {
				this.dialog = true;
			} else {
				this.dialog = false;
			}
		},
	},
};
</script>

<style scoped></style>

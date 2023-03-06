<template>
	<div class="new-contact-form-wrapper">
		<v-dialog v-model="dialog" width="1024" persistent>
			<template v-slot:activator="{ props }">
				<v-icon
					v-if="isEditable"
					v-bind="props"
					size="small"
					class="me-2"
					color="lime-darken-4"
				>
					mdi-pencil
				</v-icon>

				<v-btn v-else v-bind="props" color="green-darken-4">
					Add Contact
				</v-btn>
			</template>

			<v-card>
				<v-card-title>
					<span class="text-h5">Add A New Contact</span>
				</v-card-title>

				<v-card-text>
					<v-container>
						<v-form ref="form">
							<v-row>
								<v-col cols="12" sm="6" md="6">
									<v-text-field
										label="First name"
										required
										:rules="nameRules"
										v-model="firstName"
									/>
								</v-col>
								<v-col cols="12" sm="6" md="6">
									<v-text-field
										label="Last name"
										required
										:rules="nameRules"
										v-model="lastName"
									/>
								</v-col>
								<v-col cols="12">
									<v-text-field
										label="Street Address"
										required
										:rules="nameRules"
										v-model="streetAddress"
									/>
								</v-col>
								<v-col cols="12" sm="6" md="6">
									<v-text-field
										label="House Number"
										required
										:rules="nameRules"
										v-model="houseNumber"
									/>
								</v-col>
								<v-col cols="12" sm="6" md="6">
									<v-text-field
										label="Zip"
										required
										:rules="nameRules"
										v-model="zip"
									/>
								</v-col>
								<v-col cols="12" sm="6" md="6">
									<v-text-field
										label="City"
										required
										:rules="nameRules"
										v-model="city"
									/>
								</v-col>
								<v-col cols="12" sm="6" md="6">
									<v-text-field
										label="Country"
										required
										:rules="nameRules"
										v-model="country"
									/>
								</v-col>
							</v-row>
						</v-form>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						variant="tonal"
						:loading="isLoading"
						@click="onCloseClick"
					>
						Close
					</v-btn>
					<v-btn
						variant="tonal"
						:loading="isLoading"
						@click="onSaveClick"
					>
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import api from "../../module/api/api";
import { mapActions, mapState } from "pinia";
import { useStatusStore } from "../../store/status";

export default {
	name: "ContactForm",
	props: {
		//TODO: Change name
		isEditable: {
			type: Boolean,
			default: false,
		},
		editableFormData: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			nameRules: [(v) => !!v || "This field is required"],
			dialog: false,
			firstName: "",
			lastName: "",
			streetAddress: "",
			houseNumber: "",
			zip: "",
			city: "",
			country: "",
		};
	},
	created() {
		if (this.isEditable) {
			this.assingEditableData();
		}
	},
	computed: {
		contactInfo() {
			return {
				firstName: this.firstName,
				lastName: this.lastName,
				streetAddress: this.streetAddress,
				houseNumber: this.houseNumber,
				zip: this.zip,
				city: this.city,
				country: this.country,
				extensionFields: {},
			};
		},
		isLoading() {
			return this.contactFormStatus === "loading";
		},
		...mapState(useStatusStore, ["contactFormStatus"]),
	},
	methods: {
		onCloseClick() {
			this.closeModal();
		},
		async onSaveClick() {
			const isFormValid = await this.validateForm();
			if (isFormValid) {
				let response;

				this.setContactFormStatus("loading");
				if (this.isEditable) {
					response = await api.updateContact({
						id: this.editableFormData.id,
						...this.contactInfo,
					});
				} else {
					response = await api.addContact(this.contactInfo);
				}

				if (response.hasError) {
					this.setContactFormStatus("loading");
					this.closeModal();
					return;
				}

				this.setContactFormStatus("success");
				this.$emit("formSaved");
				this.closeModal();
			}
		},
		closeModal() {
			this.dialog = false;
		},
		async validateForm() {
			const { valid } = await this.$refs.form.validate();

			return valid;
		},
		assingEditableData() {
			this.firstName = this.editableFormData.firstName;
			this.lastName = this.editableFormData.lastName;
			this.streetAddress = this.editableFormData.streetAddress;
			this.houseNumber = this.editableFormData.houseNumber;
			this.zip = this.editableFormData.zip;
			this.city = this.editableFormData.city;
			this.country = this.editableFormData.country;
		},
		...mapActions(useStatusStore, ["setContactFormStatus"]),
	},
};
</script>

<style scoped></style>

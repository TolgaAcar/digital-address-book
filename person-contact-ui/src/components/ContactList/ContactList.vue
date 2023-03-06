<template>
	<div class="contact-list-wrapper mt-10">
		<v-card>
			<v-card-title>
				<div
					class="card-title-toolbar d-flex justify-space-between my-6"
				>
					<div class="title-text">Digital Address Book</div>

					<ContactForm @form-saved="updateContactList" />
				</div>
			</v-card-title>

			<v-data-table-server
				:headers="headers"
				:items="contactList"
				item-value="name"
				:loading="isLoading"
			>
				<template v-slot:item.actions="{ item }">
					<div class="table-actions">
						<ContactForm
							:is-editable="true"
							:editable-form-data="getObject(item.raw)"
							@form-saved="updateContactList"
						/>

						<v-icon
							color="red-darken-4"
							size="small"
							@click="deleteItem(item.raw)"
						>
							mdi-delete
						</v-icon>
					</div>
				</template>
			</v-data-table-server>
		</v-card>
	</div>
</template>

<script>
import api from "../../module/api/api";
import ContactForm from "../ContactForm/ContactForm.vue";
import { mapActions, mapState } from "pinia";
import { useStatusStore } from "../../store/status";

export default {
	name: "ContactList",
	components: {
		ContactForm,
	},
	data() {
		return {
			contactList: [],
			headers: [
				{
					title: "First Name",
					align: "start",
					sortable: false,
					key: "firstName",
				},
				{
					title: "Last Name",
					align: "start",
					sortable: false,
					key: "lastName",
				},
				{
					title: "Street Address",
					align: "start",
					sortable: false,
					key: "streetAddress",
				},
				{
					title: "House Number",
					align: "start",
					sortable: false,
					key: "houseNumber",
				},
				{ title: "Zip", align: "start", sortable: false, key: "zip" },
				{
					title: "City",
					align: "start",
					sortable: false,
					key: "city",
				},
				{
					title: "Country",
					align: "start",
					sortable: false,
					key: "country",
				},
				{ title: "Actions", key: "actions", sortable: false },
			],
		};
	},
	async created() {
		await this.fetchContactList();
		console.log(this.contactList);
	},
	computed: {
		isLoading() {
			return this.contactListStatus === "loading";
		},
		...mapState(useStatusStore, ["contactListStatus"]),
	},
	methods: {
		async fetchContactList() {
			this.setContactListStatus("loading");
			const response = await api.fetchContacts();

			if (response.hasError) {
				this.setContactListStatus("error");
				return;
			}

			this.contactList = response;
			this.setContactListStatus("success");
		},
		editItem(item) {
			const clickedItem = this.getObject(item);
			console.log(clickedItem);
		},
		async deleteItem(item) {
			this.setContactListStatus("loading");
			const response = await api.deleteContact(item.id);

			if (response.hasError) {
				this.setContactListStatus("error");
				return;
			}

			this.updateContactList();
			console.log(response);
		},
		getObject(proxyObject) {
			return Object.assign({}, proxyObject);
		},
		async updateContactList() {
			this.fetchContactList();
		},
		...mapActions(useStatusStore, ["setContactListStatus"]),
	},
};
</script>

<style scoped>
.table-actions {
	display: flex;
	align-items: center;
}
</style>

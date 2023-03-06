<template>
	<div class="home-wrapper">
		<ErrorDialog />
		<ContactList />
	</div>
</template>

<script>
import ContactList from "../components/ContactList/ContactList.vue";
import ErrorDialog from "../components/ErrorDialog/ErrorDialog.vue";

export default {
	name: "Home",
	components: {
		ContactList,
		ErrorDialog,
	},
};
</script>

<style scoped></style>

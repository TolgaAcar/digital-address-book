<template>
	<div class="home-wrapper">
		<ContactList />
	</div>
</template>

<script>
import ContactList from "../components/ContactList/ContactList.vue";

export default {
	name: "Home",
	components: {
		ContactList,
	},
};
</script>

<style scoped></style>

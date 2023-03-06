const urlBase = "http://localhost:8080/api/v1/person";

export default {
	async fetchContacts() {
		const url = `${urlBase}`;

		try {
			const reponse = await fetch(url);
			const data = await reponse.json();

			return data;
		} catch (error) {
			console.log(error);

			return {
				hasError: true,
				errorMessage: error,
			};
		}
	},
	async addContact(contactInfo) {
		const url = `${urlBase}`;

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(contactInfo),
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.log(error);

			return {
				hasError: true,
				errorMessage: error,
			};
		}
	},
	async updateContact(contactInfo) {
		const url = `${urlBase}/${contactInfo.id}`;

		try {
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(contactInfo),
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.log(error);

			return {
				hasError: true,
				errorMessage: error,
			};
		}
	},
	async deleteContact(contactId) {
		const url = `${urlBase}/${contactId}`;

		try {
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});

			return response;
		} catch (error) {
			console.log(error);

			return {
				hasError: true,
				errorMessage: error,
			};
		}
	},
};

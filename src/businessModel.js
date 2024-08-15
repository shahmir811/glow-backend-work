class Business {
	constructor(fein, name, industry, contact = null) {
		this.fein = fein;
		this.name = name;
		this.industry = industry;
		this.contact = contact;
		this.stage = 'New';
	}

	toJSON() {
		return {
			fein: this.fein,
			name: this.name,
			industry: this.industry,
			contact: this.contact,
			stage: this.stage,
		};
	}
}

module.exports = Business;

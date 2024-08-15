const Business = require('./businessModel');

const businesses = [];

const createBusiness = (req, res) => {
	const { fein, name, industry } = req.body;
	if (!fein || !name) {
		return res.status(400).json({ error: 'FEIN and Name are required.' });
	}

	const newBusiness = new Business(fein, name, industry);
	businesses.push(newBusiness);
	res.status(201).json({ message: 'Business created.', business: newBusiness });
};

const progressWorkflow = (req, res) => {
	const { fein } = req.params;
	const business = businesses.find(b => b.fein === fein);

	if (!business) {
		return res.status(404).json({ error: 'Business not found.' });
	}

	switch (business.stage) {
		case 'New':
			if (business.industry === 'restaurants' || business.industry === 'stores') {
				business.stage = 'Market Approved';
			} else {
				business.stage = 'Market Declined';
			}
			break;
		case 'Market Approved':
			if (business.contact) {
				business.stage = 'Sales Approved';
			} else {
				return res.status(400).json({ error: 'Contact information is required to progress.' });
			}
			break;
		case 'Sales Approved':
			const { status } = req.body;
			if (status === 'Won' || status === 'Lost') {
				business.stage = status;
			} else {
				return res.status(400).json({ error: "Invalid status. Only 'Won' or 'Lost' are allowed." });
			}
			break;
		default:
			return res.status(400).json({ error: 'Invalid workflow state.' });
	}

	res.json({ message: 'Business progressed.', business: business });
};

module.exports = { createBusiness, progressWorkflow };

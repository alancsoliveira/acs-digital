const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const family = await connection('family')
            .where('id', id)
            .select('id', 'responsible_name')
            .first();

        if (!family) {
            return response.status(400).json({ error: 'No FAMILY found with this ID' });
        }

        return response.json(family);
    }
}
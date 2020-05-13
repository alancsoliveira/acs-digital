const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const family_id = request.headers.authorization;

        const people = await connection('person')
            .where('family_id', family_id)
            .select('*')
            .orderBy('person.name','asc');

        return response.json(people);
    }
}
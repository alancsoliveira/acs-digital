const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const family_id = request.headers.authorization;

        const [count] = await connection('person').where('family_id', family_id).count();

        response.header('X-Total-Count', count['count(*)']);

        const people = await connection('person')
            .where('family_id', family_id)
            .select('*')
            .orderBy('person.name', 'asc');

        return response.json(people);
    }
}
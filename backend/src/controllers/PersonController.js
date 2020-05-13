const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { name, genre, birthday, sus_card, health_condition, phone } = request.body;
        const family_id = request.headers.authorization;

        const family = await connection('family')
            .where('id', family_id)
            .select('id')
            .first();

        if (!family) {
            return response.status(401).json({ erro: 'No family found with this ID.' })
        }

        const [id] = await connection('person').insert({
            name,
            genre,
            birthday,
            sus_card,
            health_condition,
            phone,
            family_id,
        });
        return response.json({ id });
    },

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('person').count();

        const people = await connection('person')
            .join('family', 'family.id', '=', 'person.family_id')
            .limit(10)
            .offset((page - 1) * 5)
            .select([
                'person.family_id',
                connection.ref('person.id').as('person_id'),
                'person.name',
                'person.genre',
                'person.birthday',
                'person.sus_card',
                'person.health_condition',
                'person.phone',
            ])
            .orderBy('person.name','asc');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(people);
    },

    async delete(request, response) {
        const { id } = request.params;
        const family_id = request.headers.authorization;


        const person = await connection('person')
            .where('id', id)
            .select('family_id')
            .first()

        if (person.family_id != family_id) {
            return response.status(401).json({ erro: 'Operation not permitted.' })
        }

        await connection('person').where('id', id).delete();

        return response.status(204).send();
    }

}
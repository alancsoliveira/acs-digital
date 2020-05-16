const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {

    async create(request, response) {
        const { responsible_name, uf, city, neighborhood, number } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('family').insert({
            id,
            responsible_name,
            uf,
            city,
            neighborhood,
            number,
        })

        return response.json({ id })
    },

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('family').count()

        const family = await connection('family').select('*')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*')
            .orderBy('family.responsible_name','asc');

            response.header('X-Total-Count', count['count(*)']);

        return response.json(family);
    },

    async delete(request, response) {
        const { id } = request.params;
        await connection('family').where('id', id).delete();

        return response.status(204).send()
    },
}
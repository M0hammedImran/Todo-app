import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/', async function (_, reply) {
        reply.status(400);
        return { ok: false };
    });
};

export default root;

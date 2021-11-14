import type { FastifyPluginAsync } from 'fastify';
import type { Prisma } from '@prisma/client';

const todo: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/', async function () {
        const todos = await this.prisma.todo.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        });
        return { ok: true, data: todos };
    });

    fastify.get<{ Params: { id: string } }>(
        '/:id',
        async function (request, response) {
            const data = await this.prisma.todo.findUnique({
                where: { id: request.params.id },
            });
            if (!data) {
                response.status(404);
                return { ok: false, data: null, message: 'Todo not found' };
            }
            return { ok: true, data };
        }
    );

    fastify.post<{ Body: Prisma.TodoCreateInput }>(
        '/',
        async function (request, response) {
            const data = await this.prisma.todo.create({
                data: { ...request.body, completed: false },
            });

            response.status(201);
            return {
                ok: true,
                data,
            };
        }
    );

    fastify.put<{ Body: Prisma.TodoCreateInput; Params: { id: string } }>(
        '/:id',
        async function (request) {
            const data = await this.prisma.todo.upsert({
                where: { id: request.params.id },
                create: { ...request.body, completed: false },
                update: { ...request.body },
            });

            return {
                ok: true,
                data,
            };
        }
    );

    fastify.patch<{ Body: Prisma.TodoUpdateInput; Params: { id: string } }>(
        '/:id',
        async function (request, response) {
            const data = await this.prisma.todo.update({
                where: { id: request.params.id },
                data: { ...request.body },
            });

            if (!data) {
                response.status(404);
                return { ok: false, data: null, message: 'Todo not found' };
            }

            return {
                ok: true,
                data,
            };
        }
    );

    fastify.delete<{ Params: { id: string } }>(
        '/:id',
        async function (request, response) {
            try {
                const data = await this.prisma.todo.delete({
                    where: { id: request.params.id },
                });
                return { ok: true, data };
            } catch (e: any) {
                console.log(JSON.stringify(e, null, 2));
                const defaultMessage = `Unable to delete todo with id: ${request.params.id}`;
                response.status(500);

                return {
                    ok: false,
                    data: null,
                    message:
                        e.code === 'P2025'
                            ? e.meta?.cause || defaultMessage
                            : defaultMessage,
                };
            }
        }
    );
};

export default todo;

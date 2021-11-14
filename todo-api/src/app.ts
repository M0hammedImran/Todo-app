import AutoLoad from 'fastify-autoload';
import { join } from 'path';
import type { AutoloadPluginOptions } from 'fastify-autoload';
import type { FastifyPluginAsync } from 'fastify';

export type AppOptions = Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        options: opts,
    });

    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        options: opts,
    });

    void fastify.listen(5555);
};

export default app;
export { app };

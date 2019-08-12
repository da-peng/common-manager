

export default function errorHandle(): (ctx: any, next: Function) => Promise<void> {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            console.error(err);
            ctx.status = err.status || 500;
            ctx.body = {
            status: err.status|| 500,
            message: err.message
            };
            ctx.app.emit('error', err, ctx);
        }
    };
}

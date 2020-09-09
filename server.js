const Koa = require("koa")
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")

const router = new Router()
const app = new Koa();
const db = require("./db")

app.use(bodyParser())

router.get("/", async (ctx) => {
    const count = await db.getCount()
    ctx.response.body = {
        "status": true,
        "count": count
    }
})

router.post("/visit", async (ctx) => {
    if (ctx.request.body.temperature <= 37.3 && ctx.request.body.temperature >= 35.7) {
        const prop = [ctx.request.body.id, ctx.request.body.name, ctx.request.body.sex, ctx.request.body.temperature]
        try {
            const res = await db.insertVisitor(prop)
            if (res) {
                ctx.response.body = {
                    "status": true,
                    "permission": true
                }
            }
        } catch (err) {
            ctx.response.body = {
                "status": true,
                "permission": false
            }
        }
    } else {
        try {
            await db.addBlackList([ctx.request.body.id, ctx.request.body.name])
        } catch (error) {
            ctx.body = {
                "status": true,
                "permission": false
            }
        }
        ctx.response.body = {
            "status": true,
            "permission": false
        }
    }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
    console.log("请打开 localhost:4000")
});
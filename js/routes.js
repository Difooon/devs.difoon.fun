const loc = window.location.href.split("/")

const routes = [
    {
        slug: '/',
        file: '/main.html',
        title: 'FRZ | Home',
    },
    {
        slug: '#discord',
        file: '/social/discord.html',
        title: 'discord',
        afterLoad() {
            window.location.href = "/social/discord.html"
        }
    },
    {
        slug: '#telegram',
        file: '/social/telegram.html',
        title: 'telegram',
        afterLoad() {
            window.location.href = "/social/telegram.html"
        }
    },

]

function route(slug) {
    return new Promise((resolve, _) => {
        const route = routes.find(x => x.slug.toLowerCase() === slug.toLowerCase())

        if (!slug) return

        history.pushState({}, route.title, route.slug)

        fetch(route.file)
            .then(res => res.text())
            .then(res => {
                document.write(res)

                if (route.afterLoad) {
                    route.afterLoad()
                }

                resolve()
            })
    })
}

route(loc[loc.length - 1].length == 0 ? "/" : loc[loc.length - 1])

// ВЗЯТО С РАЗРЕШЕНИЕМ MIDEEV
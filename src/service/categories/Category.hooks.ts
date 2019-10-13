

const Hooks = <T>(ServiceModel: T) => ({
    before: {
        list: [],
        create: [],
    },
    after: {
        list: [],
        create: []
    },
    error: {
        list: [function (ctx) {
            return ctx
        }],
        create: []
    }
});

export default Hooks;
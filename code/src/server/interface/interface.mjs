/**
 * Defines a general Interface
 * @interface
 * @param {string} name - Name of concrete Interface
 * @param {string[]} methods - Method names of concrete interface
 * Resource {@link https://link.springer.com/book/10.1007/978-1-4302-0496-1| Pro JavaScript Design Patterns}
 */
const Interface = function (name, methods) {
    if (arguments.length !== 2) {
        throw new Error(`Interface constructor called with ${arguments.length} arguments, but expected exactly 2.`);
    }

    this.name = name;
    this.methods = [];

    methods.forEach(method => {
        if (typeof method !== 'string') {
            throw new Error('Interface constructor expects '
                + 'method names to be passed in as a string.');
        }
        this.methods.push(method);
    });
};

Interface.ensureImplements = function (...args) {
    if (args.length < 2) {
        throw new Error(`Function Interface.ensureImplements called with ${args.length}arguments, but expected at least 2.`);
    }

    for (let i = 1, len = args.length; i < len; i++) {
        const concreteInterface = args[i];
        if (concreteInterface.constructor !== Interface) {
            throw new Error('Function Interface.ensureImplements expects '
                + 'arguments two and above to be instances of Interface.');
        }

        const index = i - 1;
        for (let j = 0, methodsLen = concreteInterface.methods.length;
            j < methodsLen;
            j++) {
            const definedMethod = concreteInterface.methods[j];
            if (!args[index][definedMethod]
                || typeof args[index][definedMethod] !== 'function') {
                throw new Error(`Function Interface.ensureImplements: object does not implement the ${concreteInterface.name} interface. Method ${definedMethod} was not found.`);
            }
        }
    }
};

export default Interface;

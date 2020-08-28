/**
 * Helper Functions
 */
const defaultEquals = (x, y) => x.getData() === y.getData();
const doNothing = x => x;

/**
 * Describes a node in a tree
 * @typedef {function} Node
 * @param {*} nodeData - Data to store in node
 * @param {(Node|null)} parentNode - Reference to parent node
 * @param {function=} equalsFn - Compare function used to compare data of two nodes. Must return true if arguments are equal.
 * @property {*} getData - Data stored in node
 * @property {function} updateData - New data to store in node
 * @property {boolean} isLeafNode - Determines if node has no children
 * @property {function} addChild - Add a single child node
 * @property {(Node|Node[])} getChildren - Get all children
 * @property {function} getParent - Get Parent Node
 * @property {function} getLevel - Level node belongs to (root is at level 0)
 * @property {function} equalNodes
 * @property {boolean} isNode
 * @returns {Node}
 */
const Node = (nodeData, parentNode, equalsFn) => {
    const children = [];
    const parent = parentNode;
    let data = nodeData;
    const level = parentNode === null ? 0 : parent.getLevel() + 1;
    const isLeafNode = () => children.length === 0;
    const equalNodes = equalsFn || defaultEquals;

    /**
     * Add one child
     * If child has already a parent, reference is overriden
     * @param {*} childData
     * @param {function=} equalMethod
     */
    function addChild(childData, equalMethod) {
        if (this !== null && this !== undefined) {
            const node = Node(childData, this, equalMethod);
            children.push(node);
            return node;
        }
        return null;
    }

    return {
        getChildren: _ => children,
        addChild,
        getParent: _ => parent,
        getData: _ => data,
        updateData: newData => (data = newData),
        getLevel: _ => level,
        isLeafNode,
        equalNodes,
    };
};

/**
 * Queue datastructure with its typical functions
 */
const Queue = () => {
    const queue = [];

    const enqueue = newElement => {
        queue.push(newElement);
    };

    const dequeue = () => queue.shift();

    const isEmpty = () => queue.length === 0;

    const peek = () => (!isEmpty() ? queue[0] : undefined);

    return {
        enqueue,
        dequeue,
        isEmpty,
        peek,
    };
};

/**
 * Describes a Tree holding one or multiple nodes
 * @typedef {function} Tree
 * @param {*} nodeData
 * @param {function=} equalsFn - Compare function used to compare data of two nodes. Must return true if arguments are equal.
 * @returns {Tree}
 */
const Tree = (nodeData, equalsFn) => {
    const equalTreeNodes = equalsFn || defaultEquals;
    const root = Node(nodeData, null, equalTreeNodes);
    const numberOfNodesAtLevels = [1];

    const defaultBreakFn = () => false;

    /**
     * Traverse Tree down starting at root node
     * Used algorithm Breadth First Search
     * @param {Node} startNode - Starting node of traverse
     * @param {function} callbackFn - Processes current parent node
     * @param {boolean} includeStartNode - Determines whether the start node is visited or not (true by default)
     * @param {function=} breakFn - Argument to end search
     * @returns {null} - If tree was traversed completely
     */
    const traverseTreeDown = (startNode,
                              callbackFn, includeStartNode = true,
                              breakFn = defaultBreakFn) => {
        const queue = Queue();
        queue.enqueue(startNode);
        let currentNode = queue.dequeue();

        if (!includeStartNode && currentNode) {
            currentNode.getChildren().forEach(child => queue.enqueue(child));
            currentNode = queue.dequeue();
        }

        while (currentNode) {
            if (breakFn(currentNode)) return currentNode;
            currentNode.getChildren().forEach(child => queue.enqueue(child));
            callbackFn(currentNode);
            currentNode = queue.dequeue();
        }
        return null;
    };

    /**
     * Traverse Tree up starting at given starting node
     * @param {Node} startNode - Node in tree to begin with search
     * @param {function} callbackFn - Processes current parent node
     * @param {boolean} includeStartNode - Determines whether the start node is included or no.
     */
    const traverseTreeUp = (startNode, callbackFn, includeStartNode = true) => {
        let next = includeStartNode ? startNode : startNode.getParent();

        while (next) {
            callbackFn(next);
            next = next.getParent();
        }
    };

    /**
     * Find given node in tree
     * @param {function} predicate
     * @returns {node | null} Found node if not found null
     */
    const find = predicate => (
        traverseTreeDown(root, doNothing, true, predicate)
    );

    /**
     * Checks if given parameter is an node as defined in function Node
     * @param node {Node}
     */
    const isNode = node => (
        Object.prototype.hasOwnProperty.call(node, 'getChildren')
        && Object.prototype.hasOwnProperty.call(node, 'getParent')
        && Object.prototype.hasOwnProperty.call(node, 'getData')
        && Object.prototype.hasOwnProperty.call(node, 'addChild')
        && Object.prototype.hasOwnProperty.call(node, 'updateData')
        && Object.prototype.hasOwnProperty.call(node, 'isLeafNode')
    );

    /**
     * Check if tree contains given node
     * @param {Node} nodeToCheck
     * @returns {boolean}
     */
    const contains = nodeToCheck => {
        if (nodeToCheck !== null && isNode(nodeToCheck)) {
            const queue = Queue();
            queue.enqueue(root);
            let currentNode = queue.dequeue();

            let found = false;
            while (currentNode && !found) {
                if (equalTreeNodes(currentNode, nodeToCheck)) found = true;
                currentNode.getChildren()
                    .forEach(child => queue.enqueue(child));
                currentNode = queue.dequeue();
            }
            return found;
        }

        return false;
    };

    /**
     * Add a new single node
     * @param {*} data
     * @param {Node} parentNode - Parent Node
     * @returns {Node | null} Added node if adding failed null
     */
    const addNode = (data, parentNode) => {
        if (parentNode !== null) {
            if (isNode(parentNode) && contains(parentNode)) {
                const success = parentNode.addChild(data, equalTreeNodes);

                if (success !== null) {
                    const levelToUpdate = parentNode.getLevel() + 1;
                    if (numberOfNodesAtLevels[levelToUpdate] === undefined) {
                        numberOfNodesAtLevels.push(1);
                    } else {
                        numberOfNodesAtLevels[levelToUpdate] += 1;
                    }
                    return success;
                }
            }
        }

        return null;
    };

    /**
     * Accumulate given property to get root total
     * @param {function} getValueFn - Property of data which has to be added up
     * @param {Node} nodeToGetSum - Node of interest to calculate total of given property of all its children.
     * @returns {number} Sum of all, -1 if value of propertyToSum is not a number
     */
    const sumUpDataProperty = (getValueFn, nodeToGetSum) => {
        if (typeof getValueFn(root) === 'number') {
            let sum = 0;

            nodeToGetSum.getChildren().forEach(child => {
                const match = node => {
                    sum += getValueFn(node);
                    return sum;
                };

                traverseTreeDown(child, match);
                return sum;
            });

            return sum;
        }
        return -1;
    };

    /**
     * Get number of nodes on given level
     * @param {number} level
     * @returns {number}
     */
    const numberOfNodesAtLevel = level => numberOfNodesAtLevels[level];

    return {
        traverseTreeDown,
        traverseTreeUp,
        find,
        getRoot: _ => root,
        addNode,
        sumUpDataProperty,
        numberOfNodesAtLevel,
        contains,

    };
};

export default Tree;

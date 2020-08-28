import Tree from './tree.mjs';
import { Suite } from '../../test/test.js';

const treeTests = Suite('tree data structure');

/**
 * Node structure
 */
treeTests.add('Node Structure - AddNode', async assert => {
    // Add single node without children or parent
    const treeOne = Tree(1);
    const root = treeOne.getRoot();
    assert.is(root.getLevel(), 0);
    assert.is(root.getParent(), null);
    assert.is(root.getChildren().length, 0);
    assert.is(root.isLeafNode(), true);

    // Add sequentially children without predefined parent node
    const child1 = root.addChild(2, root.getLevel() + 1);
    assert.is(child1 !== null, true);
    const child2 = root.addChild(3, root.getLevel() + 1);
    assert.is(child2 !== null, true);

    // assert.is(null.addChild(3, root.getLevel() + 1), null);
    // assert.is(undefined.addChild(3, root.getLevel() + 1), null);

    root.getChildren().forEach(child => {
        assert.is(child.isLeafNode(), true);
        assert.is(child.getLevel(), 1);
    });

    assert.is(root.getChildren().length, 2);
    assert.is(root.isLeafNode(), false);
});

treeTests.add('Node Structure - equals Method', async assert => {
    // Default equals Method
    const treeOne = Tree(1);
    const treeTwo = Tree(2);

    assert.is(treeOne.getRoot()
        .equalNodes(treeOne.getRoot(), treeTwo.getRoot()), false);
    assert.is(treeOne.getRoot()
        .equalNodes(treeOne.getRoot(), treeOne.getRoot()), true);
});

/**
 * Tree structure
 */
treeTests.add('Create new Tree', async assert => {
    const newTree = Tree(1);
    assert.is(newTree.numberOfNodesAtLevel(0), 1);
    assert.is(newTree.numberOfNodesAtLevel(1), undefined);
});

treeTests.add('Add Nodes to Tree', async assert => {
    // Create a tree with one node
    const newTree = Tree(1);

    assert.is(newTree.numberOfNodesAtLevel(0), 1);
    assert.is(newTree.contains(newTree.getRoot()), true);

    // Add children to root
    const node1 = newTree.addNode(2.1, newTree.getRoot());
    assert.is(node1 !== null, true);

    const node2 = newTree.addNode(2.2, newTree.getRoot());
    assert.is(node2 !== null, true);
    assert.is(newTree.numberOfNodesAtLevel(1), 2);
    assert.is(newTree.getRoot().getChildren().length, 2);

    // Add grand children to root
    newTree.getRoot().getChildren().forEach(child => {
        newTree.addNode(child.getData() + 1, child);
        newTree.addNode(child.getData() + 2, child);
        assert.is(child.getChildren().length, 2);
    });
    assert.is(newTree.numberOfNodesAtLevel(2), 4);

    // Try adding a node without parent to a tree
    assert.is(newTree.addNode(5, null), null);
    assert.is(newTree.addNode(5, 'node'), null);
});

treeTests.add('Check contains function', async assert => {
    // Added nodes on different level to tree
    const newTree = Tree(1);
    assert.is(newTree.contains(newTree.getRoot()), true);

    const firstChild = newTree.addNode(2.1, newTree.getRoot());
    assert.is(newTree.contains(firstChild), true);

    const secondChild = newTree.addNode(2.2, newTree.getRoot());
    assert.is(newTree.contains(secondChild), true);

    const firstGrandChild = newTree.addNode(3.1, firstChild);
    assert.is(newTree.contains(firstGrandChild), true);

    // Null value should never be found
    const nullValue = null;
    assert.is(newTree.contains(nullValue), false);
});

treeTests.add('Traverse Down', async assert => {
    const tree = Tree(0);
    const node1 = tree.addNode(1, tree.getRoot());
    const node2 = tree.addNode(2, tree.getRoot());

    tree.addNode(3, node1);
    tree.addNode(4, node1);
    tree.addNode(5, node2);
    tree.addNode(6, node2);

    let sum = 0;
    const callback = currentNode => {
        sum += currentNode.getData();
    };

    assert.is(tree.traverseTreeDown(tree.getRoot(), callback), null);
    assert.is(sum === 21, true);
});

treeTests.add('Traverse Up', async assert => {
    const tree = Tree(1);
    const node1 = tree.addNode(2, tree.getRoot());
    const node2 = tree.addNode(3, tree.getRoot());

    const node3 = tree.addNode(4, node1);
    tree.addNode(5, node1);
    tree.addNode(6, node2);
    const node6 = tree.addNode(7, node2);

    let sum = 0;
    const callback = currentNode => {
        sum += currentNode.getData();
    };

    tree.traverseTreeUp(node3, callback);
    assert.is(sum === 7, true);

    sum = 0;
    tree.traverseTreeUp(node1, callback);
    assert.is(sum === 3, true);

    sum = 0;
    tree.traverseTreeUp(node6, callback);
    assert.is(sum === 11, true);
});

treeTests.add('Find Node', async assert => {
    const tree = Tree(1);

    const dataN1 = 2;
    const child1 = tree.addNode(dataN1, tree.getRoot());
    assert.is(child1 !== null, true);

    const dataN2 = 3;
    const child2 = tree.addNode(dataN2, tree.getRoot());
    assert.is(child2 !== null, true);

    const returnValue1 = tree.find(node => node.getData() === dataN1);
    assert.is(returnValue1.getData(), dataN1);
    assert.is(returnValue1.getParent(), tree.getRoot());
    assert.is(returnValue1.getChildren().length, 0);

    const returnValue2 = tree.find(node => node.getData() === dataN2);
    assert.is(returnValue2.getData(), dataN2);
    assert.is(returnValue2.getParent(), tree.getRoot());
    assert.is(returnValue2.getChildren().length, 0);

    const dataN3 = -1;
    const returnValue3 = tree.find(node => node.getData() === dataN3);
    assert.is(returnValue3, null);
});

treeTests.add('sumUpDataProperty', async assert => {
    const tree = Tree({ count: 1 });
    tree.addNode({ count: 2 }, tree.getRoot());
    const child1 = tree.addNode({ count: 3 }, tree.getRoot());
    const child2 = tree.addNode({ count: 4 }, tree.getRoot());
    tree.addNode({ count: 5 }, child1);
    tree.addNode({ count: 6 }, child1);
    tree.addNode({ count: 5 }, child2);
    tree.addNode({ count: 6 }, child2);
    tree.addNode({ count: 7 }, child2);
    tree.addNode({ count: 8 }, child2);

    const getValueFn = node => node.getData().count;
    assert.is(tree.sumUpDataProperty(getValueFn, tree.getRoot()), 46);
    assert.is(tree.sumUpDataProperty(getValueFn, child1), 11);
    assert.is(tree.sumUpDataProperty(getValueFn, child2), 26);
});

export default treeTests;

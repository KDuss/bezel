const Observable = value => {
    let storedValue = value;
    const listeners = [];
    return {
        onChange: callback => {
            listeners.push(callback);
            callback(storedValue, storedValue);
        },
        getValue: () => storedValue,
        setValue: newValue => {
            if (storedValue === newValue) return;
            const oldValue = storedValue;
            storedValue = newValue;
            listeners.forEach(callback => callback(storedValue, oldValue));
        },
    };
};

const ObservableList = list => {
    const addListeners = [];
    const delListeners = [];
    const removeAt = array => index => array.splice(index, 1);
    const removeItem = array => item => {
        const i = array.indexOf(item);
        if (i >= 0) removeAt(array)(i);
    };
    const listRemoveItem = removeItem(list);
    const delListenersRemove = removeAt(delListeners);
    const forEachAfter = (pos, callback) => {
        for (let i = pos + 1; i < list.length; i++) {
            callback(list[i]);
        }
    };
    const indexOf = item => list.indexOf(item);
    const getById = id => list.find(el => el.getId() === id);

    const includes = item => list.includes(item);
    const isEmpty = _ => list.length === 0;

    const find = predicate => list.find(predicate);

    const move = (item, start, end) => {
        console.log('start', start, 'end', end);
        list.splice(start, 1);
        if (end <= -1) {
            list.splice(list.length, 0, item);
        } else if (end > list.length) {
            list.splice(0, 0, item);
        } else {
            list.splice(end, 0, item);
        }
    };

    return {
        onAdd: listener => addListeners.push(listener),
        onDel: listener => delListeners.push(listener),
        add: item => {
            list.push(item);
            addListeners.forEach(listener => listener(item));
            return item;
        },
        addAt: position => item => {
            list.splice(position, 0, item);
            addListeners.forEach(listener => listener(item));
            return item;
        },
        del: item => {
            listRemoveItem(item);
            const safeIterate = [...delListeners]; // shallow copy as we might change listeners array while iterating
            safeIterate.forEach((listener, index) => {
                listener(item, () => delListenersRemove(index));
            });
        },
        removeDeleteListener: removeItem(delListeners),
        count: () => list.length,
        forEachAfter,
        indexOf,
        getById,
        find,
        includes,
        isEmpty,
        list,
        get: i => list[i],
        move,
    };
};

export { Observable, ObservableList };

/**
 * Defines the test "framework", exports the Suite function plus a total of how many assertions have been tested
 */
import { padLeft, padRight } from '../util/strings.js';
import Tuple from '../util/tuple.js';
import { doNothing } from '../util/util.mjs';

// eslint-disable-next-line import/no-mutable-exports
let total = 0;

function Assert() {
    const results = [];
    return {
        results,
        true: testResult => {
            if (!testResult) {
                console.error('test failed');
            }
            results.push(testResult);
        },
        is: (actual, expected) => {
            const testResult = actual === expected;
            if (!testResult) {
                console.error(`test failure. Got '${actual}', 
                    expected '${expected}'`);
            }
            results.push(testResult);
        },
    };
}

/**
 * Data type to capture test to-be-run
 */
const [Test, name, logic] = Tuple(2);

function writeHTML(message) {
    const out = document.getElementById('out');
    const newParagraph = document.createElement('p');
    newParagraph.innerHTML = `${message}`;
    out.appendChild(newParagraph);
}

function writeConsole(message) {
    console.info(message);
}

function bar(extend) {
    writeHTML(`${'-'.repeat(extend)
        .fontcolor('#cc0000')}`);
    writeConsole(`+${'-'.repeat(extend)}+`);
}

/**
 * Prints report of how many tests have passed and which have failed
 * @param origin {string}
 * @param ok {boolean[]}
 */
function report(origin, ok) {
    const extend = 20;
    const passed = 'passed';
    const passedBag = ok.filter(test => test === true);
    const passedCounter = passedBag.length.toString();
    const signalColor = passedBag.length === ok.length ? 'black' : '#cc0000';
    writeHTML(` ${passedCounter.fontcolor('green')
        .bold()}/${ok.length.toString()
        .bold()
        .fontcolor(signalColor)} 
            tests in ${origin.bold()} ${passed.fontcolor('green')}.`);
    writeConsole(`${padLeft(passedCounter, 3)} 
            tests in ${padRight(origin, extend)} ${passed}.`);
    if (ok.length !== passedBag.length) {
        const reportLine = '    Failing tests in ';
        bar(2 * reportLine.length + origin.length);
        writeHTML(`${reportLine} ${origin.fontcolor('#cc0000')
            .bold()}`);
        writeConsole(`|${reportLine} ${padRight(origin, extend)}|`);
        for (let i = 0; i < ok.length; i++) {
            if (!ok[i]) {
                const text = `#${padLeft(i, 3)} failed`;
                writeHTML(`Test ${text.fontcolor('#cc0000')
                    .bold()}`);
                writeConsole(`|    Test ${text}                     |`);
            }
        }
        bar(2 * reportLine.length + origin.length);
    }
}

const test = async (testName, callback) => {
    const assert = Assert();
    await callback(assert);
    report(testName, assert.results);
};

function Suite(suiteName) {
    const tests = [];
    const suite = {
        test: (testName, callback) => {
            test(`${suiteName}-${testName}`, callback);
        },
        add: (testName, callback) => tests.push(Test(testName)(callback)),
        run: async () => {
            const suiteAssert = Assert();
            const promises = tests
                .map(currentTest => currentTest(logic)(suiteAssert));
            await Promise.all(promises);
            total += suiteAssert.results.length;

            if (suiteAssert.results.every(doNothing)) {
                report(`suite ${suiteName}`, suiteAssert.results);
            } else {
                tests.forEach(currentTest => {
                    suite.test(currentTest(name), currentTest(logic));
                });
            }
        },
    };
    return suite;
}

export { Suite, total };

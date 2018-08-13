import StorageClient from '../src/modules/storageClient';

// 本地存储demo--------------------------------------------------------------------------------------
let storageClient = StorageClient({});
storageClient.setMemory('abcd', {
    text: '测试'
}, {
    isSetTime: true
});
storageClient.setMemory('abcde', {
    text: '测试e'
}, {
    isSetTime: true,
    storageKey: 'http'
});
// storageClient.setLocal('abcdx', {
//     text: '测试x'
// }, {
//     isSetTime: true,
//     timeout: 3000 // 超时时间
// });
// storageClient.setSession('abcds', {
//     text: '测试s'
// }, {
//     isSetTime: true // ,
//     // timeout: 5000 // 超时时间
// });
storageClient.removeMemory('abcd');
storageClient.removeMemory('abcde', {
    storageKey: 'http'
});
console.log(storageClient.getMemory('abcd'));
console.log(storageClient.getMemory('abcde', false, {
    storageKey: 'http'
}));
setTimeout(() => {
    console.log(storageClient.getMemory('abcd'));
    console.log(storageClient.getMemory('abcde', false, {
        storageKey: 'http'
    }));
    console.log(storageClient.getLocal('abcdx'));
    console.log(storageClient.getSession('abcds'));
}, 2000);
setTimeout(() => {
    storageClient.removeMemory('abcd');
    storageClient.removeMemory('abcde', {
        storageKey: 'http'
    });
    storageClient.removeLocal('abcdx');
    storageClient.removeSession('abcds');
    console.log(storageClient.getMemory('abcd'));
    console.log(storageClient.getMemory('abcde', false, {
        storageKey: 'http'
    }));
    console.log(storageClient.getLocal('abcdx'));
    console.log(storageClient.getSession('abcds'));
}, 4000);
setTimeout(() => {
    console.log(storageClient.getMemory('abcd', true));  // undefined
    console.log(storageClient.getLocal('abcdx', true));  // undefined
    console.log(storageClient.getSession('abcds'));  // undefined
}, 10000);


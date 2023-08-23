const fetch = require('isomorphic-fetch');

async function fetchUrl(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    return null;
}

async function SortResponse(urls) {
    const uniqueSet = new Set();

    for (const i of urls) {
        const startTime = Date.now();
        const responseData = await fetchUrl(i);
        const elapsedTime = Date.now() - startTime;

        if (elapsedTime <= 500 && responseData !== null) {
            const Numbers = responseData.numbers.filter(number => Number.isInteger(number));
            Numbers.forEach(number => uniqueSet.add(number));
        }
    }
    
    const uniqueArray = [...uniqueSet].sort((a, b) => a - b);
    return uniqueArray;
}

const apiUrls = [
    'http://20.244.56.144/numbers/primes',
    'http://20.244.56.144/numbers/fibo',
    'http://20.244.56.144/numbers/odd',
    'http://20.244.56.144/numbers/rand'
];

(async () => {
    const sortedArray = await SortResponse(apiUrls);

    if (sortedArray.length > 0) {
        console.log('Sorted Unique Numbers:', sortedUniqueNumbersArray);
    } else {
        console.log('No valid numbers found.');
    }
})();
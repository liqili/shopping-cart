/**
 * Mocking client-server processing
 */
const TIMEOUT = 100

export default {
    getProducts: (cb, timeout) => setTimeout(() => {
        fetch('/rest/products')
            .then(response => response.json())
            .then(data => cb(data));
    }, timeout || TIMEOUT
    ),
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}

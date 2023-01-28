export const getDeepLink = (path = '') => {
    const scheme = 'myapp'
    const prefix = `${scheme}://`
    return prefix + path
}
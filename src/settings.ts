export let settings = {
    domain: `${location.protocol}//${location.hostname}${PROD ? '' : ':1234'}`
};

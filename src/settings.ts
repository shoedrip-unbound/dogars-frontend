let port: string;
if (!PROD)
    port = '1234';
else
    port = location.port

export let settings = {
    domain: `${location.protocol}//${location.hostname}${!port ? '' : `:${port}`}`
};

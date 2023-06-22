export async function dataRequest(action, options) {
    const result = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/data-vldda/endpoint/data/v1/action/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'VRkLvr3Xlu0lPjsukcRxpzSs1HVJgzR27gLvTxGIfQucS5VVfcLj0wDEPhRbmiPU'
        },
        body: JSON.stringify({
            dataSource: 'Cluster0',
            database: 'PostDB',
            collection: 'posts',
            ...options
        })
    }).then((res) => res.json())

    return result
}
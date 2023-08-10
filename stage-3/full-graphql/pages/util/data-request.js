import fetch from 'node-fetch' 

export async function dataRequest(action, options) {
    const result = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/data-vldda/endpoint/data/v1/action/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'nYyltXYriIucKsJCrePbxq77bKTZisBctousxFzUs2keTXDoHE5om0RBtxWuSC0g'
        },
        body: JSON.stringify({
            dataSource: 'Cluster0',
            database: 'graphql-example',
            collection: 'postQL',
            ...options
        })
    }).then((res) => res.json())

    return result
}
const postData = async (url, data) => {
    let result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    if (!result.ok) {
        throw new Error(`Couldn't post data to ${url}, status: ${result.status}`)
    }

    return await result.json();
}

async function getData(url) {
    let result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Couldn't get data from ${url}, status: ${result.status}`);
    }

    return await result.json();
}



export {getData, postData};
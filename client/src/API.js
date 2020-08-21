const API_URL = 'https://travel-log-mern-stack.herokuapp.com/';

export async function listEntryLogs() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function createEntryLogs(entry) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(entry)
    });
    return response.json();
}
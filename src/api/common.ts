import { AppConfig } from '../AppConfig';

function updateUrl(url: string): string {
    if (url.startsWith('/')) {
        url = new URL(url, AppConfig.SERVER_URL).toString();
    }
    return url;
}

export async function getJson(url: string, headers = {}): Promise<any> {
    url = updateUrl(url);

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    });

		return response.json();
}

export async function postJson(url: string, data = {}, headers = {}): Promise<any> {
    url = updateUrl(url);

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function patchJson(url: string, data = {}, headers = {}): Promise<any> {
    url = updateUrl(url);

    const response = await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

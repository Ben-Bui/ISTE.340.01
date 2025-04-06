const BASE_URL = 'https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/';

export default async function getData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
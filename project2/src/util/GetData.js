const proxyServer = 'https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/';

async function getData(endpoint) {
    try {
        const result = await fetch(`${proxyServer}${endpoint}`);
        if (!result.ok) throw new Error(`HTTP error! status: ${result.status}`);
        return await result.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default getData;

// Additional helper for minor courses
export const getMinorCourses = async (minorId) => {
    return getData(`minors/UgMinors/name=${minorId}`);
};
"use server"

interface Hackathon {
    name: string;
    date: Date;
    location: string;
    description: string;
    url: string;
}

export async function fetchDevfolio() {
    const url = "https://api.devfolio.co/api/search/hackathons";
    const headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
    };
    const body = JSON.stringify({
        "type": "application_open",
        "from": 10,
        "size": 10
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function fetchDevpost() {
    const url = "https://devpost.com/api/hackathons";
    const headers = {
        'authority': 'devpost.com',
        'accept': '*/*',
        'accept-language': 'en-GB,en;q=0.9',
    };

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchUnstop() {
    let currentPage = 1;
    const responses = [];

    while (true) {
        const url = `https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&per_page=15&oppstatus=open&page=${currentPage}`;
        const headers = {
            'Accept': 'application/json, text/plain, */*',
        };

        try {
            const response = await fetch(url, { headers });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const responseData = await response.json();

            if (responseData.data.data.length === 0) {
                break;
            } else {
                responses.push(responseData);
                currentPage += 1;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return responses;
}

export async function getFormattedHackathons() {
    const hackathons: Hackathon[] = [];
    const devfolio = await fetchDevfolio();
    for (const i of devfolio.hits.hits) {
        const name = i._source.name
        const date = new Date(i._source.starts_at)
        const location = i._source.is_online ? "Online" : (i._source.location ? i._source.location : "Unannounced")
        const description = i._source.desc
        const url = "https://" + i._source.slug + ".devfolio.co"
        hackathons.push({ name, date, location, description, url })
    }
    //console.log(hackathons);
    return hackathons;
}

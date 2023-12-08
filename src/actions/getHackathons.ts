"use server"

interface Hackathon {
    name: string;
    date: Date;
    end_date: Date;
    location: string;
    description: string;
    url: string;
    registration_start_date: Date;
    registration_end_date: Date;
    team_size: number;
    team_min: number;
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
        const end_date = new Date(i._source.ends_at)
        const location = i._source.is_online ? "Online" : (i._source.location ? i._source.location : "Unannounced")
        const description = i._source.desc
        const url = "https://" + i._source.hackathon_setting.subdomain + ".devfolio.co"
        const registration_start_date = new Date(i._source.hackathon_setting.reg_starts_at)
        const registration_end_date = new Date(i._source.hackathon_setting.reg_ends_at)
        const team_size = parseInt(i._source.team_size)
        const team_min = parseInt(i._source.team_min)
        hackathons.push({ name, date, end_date, location, description, url, registration_start_date, registration_end_date, team_size, team_min })
    }
    //console.log(hackathons);
    return hackathons;
}

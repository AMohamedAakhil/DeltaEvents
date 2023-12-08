"use server";
import { parseDateRange } from "@/utils/parseDate";

interface Hackathon {
  from: string;
  name: string;
  date?: Date;
  end_date?: Date;
  location?: string;
  description?: string;
  url: string;
  registration_start_date: Date;
  registration_end_date: Date;
  team_size?: number;
  team_min?: number;
}

export async function fetchDevfolio() {
  const url = "https://api.devfolio.co/api/search/hackathons";
  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/json",
  };
  const body = JSON.stringify({
    type: "application_open",
    from: 10,
    size: 10,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
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
    authority: "devpost.com",
    accept: "*/*",
    "accept-language": "en-GB,en;q=0.9",
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
      Accept: "application/json, text/plain, */*",
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
  const devpost = await fetchDevpost();
  const unstop = await fetchUnstop();

  // DEVFOLIO

  for (const i of devfolio.hits.hits) {
    const from = "Devfolio";
    const name = i._source.name;
    const date = new Date(i._source.starts_at);
    const end_date = new Date(i._source.ends_at);
    const location = i._source.is_online
      ? "Online"
      : i._source.location
        ? i._source.location
        : "Unannounced";
    const description = i._source.desc;
    const url =
      "https://" + i._source.hackathon_setting.subdomain + ".devfolio.co";
    const registration_start_date = new Date(
      i._source.hackathon_setting.reg_starts_at,
    );
    const registration_end_date = new Date(
      i._source.hackathon_setting.reg_ends_at,
    );
    const team_size = parseInt(i._source.team_size);
    const team_min = parseInt(i._source.team_min);

    hackathons.push({
      from,
      name,
      date,
      end_date,
      location,
      description,
      url,
      registration_start_date,
      registration_end_date,
      team_size,
      team_min,
    });
  }

  //DEVPOST

  for (const i of devpost.hackathons) {
    const from = "Devpost";
    const name = i.title;
    const location = i.displayed_location.location;
    const url = i.url;
    const dateRange = parseDateRange(i.submission_period_dates);
    const registration_start_date = dateRange.start;
    const registration_end_date = dateRange.end;
    hackathons.push({
      from,
      name,
      location,
      url,
      registration_start_date,
      registration_end_date,
    });
  }

  // UNSTOP 

  for (const page of unstop) {
    for (const i of page.data.data) {
      const from = "Unstop";
      const url = "https://unstop.com/" + i.public_url;
      const name = i.title;
      const date = new Date(i.start_date);
      const end_date = new Date(i.end_date);
      const registration_start_date = new Date(i.regnRequirements.start_regn_dt)
      const registration_end_date = new Date(i.regnRequirements.end_regn_dt)
      const description = i.seo_details && i.seo_details.length > 0 ? i.seo_details[0].description : '';
      const team_size = i.regnRequirements.max_team_size ? i.regnRequirements.max_team_size : -1;
      const team_min = i.regnRequirements.min_team_size ? i.regnRequirements.min_team_size : -1;

      hackathons.push({
        from,
        name,
        date,
        end_date,
        description,
        url,
        registration_start_date,
        registration_end_date,
        team_size,
        team_min,
      });
    }
  }
  
  return hackathons;
}

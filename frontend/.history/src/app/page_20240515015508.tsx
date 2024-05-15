import qs from "qs";

const homePageQuesry = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://127.0.0.1:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuesry;

  console.log(url.href);

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    console.dir(data, { depth: null });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  const { title, description } = strapiData.data.attributes;

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}

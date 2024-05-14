import { Button } from "@/components/ui/button";

async function getStrapiData(path: string) {
  const baseUrl = "http://127.0.0.1:1337";
  try {
    const response = await fetch(baseUrl + path);
    const data = await response.json();
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
      <Button>Click Me</Button>
    </main>
  );
}

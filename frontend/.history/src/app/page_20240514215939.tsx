import { Button } from "@/components/ui/button";

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337/api/home-page";
  try {
    const response = await fetch(baseUrl + path);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Button>Click Me</Button>
    </main>
  );
}

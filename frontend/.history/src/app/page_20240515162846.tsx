import { HeroSection } from "@/components/custom/HeroSection";
import { flattenAttributes } from "@/lib/utils";
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
        feature: {
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
  // console.log(url.href);

  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const data = await response.json();
    const flattenData = flattenAttributes(data);
    console.dir(flattenData, { depth: null });
    return flattenData;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  const { title, description, blocks } = strapiData;

  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}

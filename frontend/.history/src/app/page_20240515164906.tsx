import { FeatureSection } from "@/components/custom/FeatureSection";
import { HeroSection } from "@/components/custom/HeroSection";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
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

function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

async function getStrapiData(path: string) {
  const baseUrl = getStrapiURL();

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

  const { blocks } = strapiData;

  if (!blocks) return <div>No Blocks Found</div>;

  return (
    <main>
      <HeroSection data={blocks[0]} />
      <FeatureSection data={blocks[1]} />
    </main>
  );
}

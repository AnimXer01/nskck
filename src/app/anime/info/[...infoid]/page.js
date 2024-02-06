import Episodesection from '@/components/Episodesection'
import { AnimeInfoAnilist } from '@/lib/Anilistfunctions'
import React from 'react'
import AnimeDetailsTop from '@/components/details/AnimeDetailsTop'
import AnimeDetailsBottom from '@/components/details/AnimeDetailsBottom'
import { getEpisodes } from '@/lib/getData'
import Navbarcomponent from '@/components/navbar/Navbar'
import Animecards from '@/components/CardComponent/Animecards'

// async function getData(id,status,refresh=false) {
//   try {
//     const response = await fetch(
//       `${checkEnvironment()}/api/episode/${id}?releasing=${status === "RELEASING" ? "true" : "false"}&refresh=${refresh}`
//     );
//     if (!response.ok) {
//       throw new Error('Failed to fetch episodes')
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching Consumet Episodes:", error);
//   } 
// }

export async function generateMetadata({ params }) {
  const id = params.infoid[0];
  const data = await AnimeInfoAnilist(id);
  
  return {
    title: data?.title.english || data?.title.romaji || 'Loading...',
    description: data?.description.slice(0,180),
    openGraph: {
      title: data?.title.english || data?.title.romaji,
      images: [data?.coverImage?.extraLarge],
      description: data?.description,
    },
    twitter: {
      card: "summary",
      title: data?.title.english || data?.title.romaji,
      description: data?.description.slice(0,180),
    },
  }
}

async function AnimeDetails({params}) {
  const id = params.infoid[0];
  const data = await AnimeInfoAnilist(id);
  // const episodeData = await getEpisodes(id,data?.status,false);
  
  return (
    <div className="">
      <Navbarcomponent/>
      <div className='h-[460px] sm:h-[500px] '>
      <AnimeDetailsTop data={data}/>
      </div>
      <AnimeDetailsBottom data={data}/>
      <Episodesection data={data} id={id}/>
      <div className="recommendationglobal">
      <Animecards data={data?.recommendations?.nodes} cardid={"Recommendations"}/>
      </div>
    </div>
  )
}

export default AnimeDetails
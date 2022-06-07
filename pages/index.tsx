import { useState } from "react";
import Image from "next/image";
import supabaseAdmin from "../utils/supabase";

export async function getStaticProps() {
  const {data} = await supabaseAdmin
  .from('images')
  .select('*')
  .order('id');

  return {
    props: {
      images: data
    }
  }
}


// Helper function taht Concat classnames
function cn(...classes:string[]) {
  return classes.filter(Boolean).join(" ");
}

type Image = {
  id: number
  name: string
  href: string
  username: string
  imgSrc: string
}

export default function Gallery({images}:{images:Image[]}) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {images.map((image) => (
        <BlurImage key={image.id} image={image} />
      ))}
      </div>
    </div>
  );
}

function BlurImage({image}:{image:Image}){
  const [isLoading, setIsLoading] = useState(true);

  return(
    <a href="#" className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full- overflow-hidden rounded-lg bg-gray-200">
        <Image 
        alt="" 
        src={image.imgSrc}
        layout="fill"
        objectFit="cover"
        className={cn(
          "group-hover:opacity-75 transition ease-in-out duration-150",
          isLoading 
          ? 'grayscale blur-2xl scale-110'
          : 'grayscale-0 blur-0 scale-100'
          )}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">Lee</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">@leeorg</p>
    </a>
  )
}
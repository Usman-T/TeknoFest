import { ALL_COMPETITIONS } from "@/queries";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Header from "./Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Competitions = () => {
  const {
    data,
    loading: allCompetitionsLoading,
    error,
  } = useQuery(ALL_COMPETITIONS);

  if (allCompetitionsLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader size={64} />
      </div>
    );
  }

  console.log(error);

  const categories = [
    {
      category: "Robotics and Electronics",
      image:
        "https://www.teknofestpakistan.com/product-category/competition/robotics-and-electronics/",
    },
    {
      category: "Graphics and Animation",
      image:
        "https://www.teknofestpakistan.com/wp-content/uploads/2024/09/Cinematic_vision_video_editing-300x300.jpg.webp",
      description: "jjajaj",
    },
    {
      category: "Development and Programming",
      image:
        "https://www.teknofestpakistan.com/wp-content/uploads/2024/09/2D_animation-300x300.jpg.webp",
      description: "jjajaj",
    },
    {
      category: "AI/ML",
      image:
        "https://www.teknofestpakistan.com/wp-content/uploads/2024/09/Machine-learning-def--300x300.png.webp",
      description: "jjajaj",
    },
  ];

  console.log(data);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto p-4 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Competitions</h1>
          </div>

          <div className=" gap-6">
            <Card className="border-none">
              <CardHeader>
                <CardTitle>All Categories</CardTitle>
                <CardDescription>Here are all the categories</CardDescription>
              </CardHeader>

              <CardContent>
                <Carousel
                  opts={{ loop: true }}
                  plugins={[
                    AutoScroll({
                      playOnInit: true,
                      stopOnMouseEnter: true,
                      stopOnInteraction: false,
                      speed: 0.5,
                    }),
                  ]}
                  className="mx-auto border-none w-full"
                >
                  <CarouselContent className="ml-1">
                    {categories.map((c, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/2"
                      >
                        <div className="p-1">
                          <Card key={index} className="w-full">
                            <div className="relative aspect-video w-full overflow-clip rounded-md border-b">
                              <LazyLoadImage
                                src={c.image}
                                alt={c.category}
                                className="w-full scale-100 grayscale-0 duration-500 ease-in-out"
                                style={{
                                  aspectRatio: "1920/1080",
                                  objectFit: "cover",
                                  filter: "blur(20px)",
                                  transition: "filter 0.5s ease",
                                }}
                                loading="lazy"
                                onLoad={(e) =>
                                  (e.target.style.filter = "blur(0px)")
                                }
                              />
                            </div>
                            <div className="font-semibold text-center my-2">
                              {c.category}
                            </div>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="container mx-auto p-4 space-y-6">
          <div className="flex justify-between items-center mb-6"></div>

          <div className=" gap-6">
            {data?.map((c, index) => (
              <Card key={index} className="border-none">
                <CardHeader>
                  <CardTitle>{c.category}</CardTitle>
                  <CardDescription>{c.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <Card key={index} className="w-full">
                    <div className="relative aspect-video w-full overflow-clip rounded-md border-b">
                      <LazyLoadImage
                        src={c?.image}
                        alt={c?.title}
                        className="w-full scale-100 grayscale-0 duration-500 ease-in-out"
                        style={{
                          aspectRatio: "1920/1080",
                          objectFit: "cover",
                          filter: "blur(20px)",
                          transition: "filter 0.5s ease",
                        }}
                        loading="lazy"
                        onLoad={(e) => (e.target.style.filter = "blur(0px)")}
                      />
                    </div>
                    <div className="font-semibold text-center my-2">
                      {c?.title}
                      jajaja
                    </div>
                  </Card>
                </CardContent>
              </Card>
            ))}{" "}
            <div className="grid grid-cols-3"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Competitions;

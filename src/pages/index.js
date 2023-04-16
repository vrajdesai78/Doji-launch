import Footer from "@/components/footer-landing";
import GradientButton from "@/components/gradient-button";
import Head from "next/head";
import Image from "next/image";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Home() {
  return (
    <>
      <Head>
        <title>Doji Launch</title>
        <meta name="description" content="dojilaunch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#030413] opacity-90">
        <div className="bg-[url('../../public/bg.svg')] bg-no-repeat bg-cover bg-center">
          <div className="px-4 lg:px-0 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[100vh]">
            <div className="flex justify-center flex-row">
              <div className="flex flex-col justify-between text-center h-[100vh] py-10 md:py-32">
                <Image
                  src="/tokenverse.png"
                  width="100"
                  height="100"
                  className="mx-auto animate__animated animate__zoomIn"
                  alt="dojilaunch"
                />
                <h1 className="text-4xl sm:text-5xl mt-[-3rem] font-extrabold text-[#E4E4ED] animate__animated animate__zoomIn">
                  Doji Launch
                </h1>
                <div className="text-4xl tracking-tight font-extrabold text-[#E4E4ED] sm:text-5xl md:text-7xl lg:px-32 space-y-5">
                  <h2 className="animate__animated animate__slideInRight">
                    Simplified Community
                  </h2>
                  <h2 className="animate__animated animate__slideInLeft">
                    Monetization & Growth
                  </h2>
                  <h3 className="block text-[#AEACC9] font-medium text-2xl lg:px-32 animate__animated animate__slideInRight">
                    Leading communities trust our no-code tools for token and
                    NFT memberships
                  </h3>
                </div>
                <div className="animate__animated animate__pulse">
                  <GradientButton link="/dashboard" title="Use dojilaunch" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-0 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[80vh] bg-[url('../../public/arch.png')] bg-no-repeat bg-contain bg-center">
          <div className="flex justify-center flex-row">
            <div className="flex flex-col justify-center text-center h-[80vh] py-32 lg:px-32 space-y-20">
              <AnimationOnScroll animateIn="animate__zoomIn">
                <h2 className="text-4xl font-medium text-[#E4E4ED] sm:text-5xl md:text-6xl mb-5">
                  Empower your Community <br /> with Superpowers
                </h2>
                <h3 className="text-[#AEACC9] leading-relaxed font-medium text-2xl lg:px-32">
                  Leading communities trust our no-code tools for token and NFT
                  memberships
                </h3>
              </AnimationOnScroll>
            </div>
          </div>
        </div>
        <div className="pt-[110px] md:pt-4 px-4 lg:px-0 mx-auto max-w-[1080px] flex md:justify-center items-center flex-col md:flex-row min-h-[40vh]">
          <div className="w-full md:w-1/2 flex justify-center flex-col">
            <div className="flex flex-col justify-center md:h-[100vh] md:mt-[-10] lg:px-32 overflow-hidden">
              <AnimationOnScroll animateIn="animate__zoomIn">
                <Image
                  src="/tProduct.png"
                  width="300"
                  height="100"
                  alt="coindeck"
                  className="absolute w-[150px] md:w-[300px] left-[50%] mt-[-250px] md:mt-[-250px] md:left-auto z-20 border rounded-3xl drop-shadow-[0_35px_40px_rgba(0,0,0,1)]"
                />
                <Image
                  src="/tProduct.png"
                  width="300"
                  height="100"
                  alt="coindeck"
                  className="absolute w-[150px] md:w-[300px] left-[50%] md:left-auto ml-[-80px] md:ml-[-120px] mt-[-350px] md:mt-[-350px] border rounded-3xl drop-shadow-[0_3px_6px_#0000] z-10"
                />
              </AnimationOnScroll>
            </div>
          </div>
          <div className="pt-[120px] md:pt-0 w-full md:w-1/2 flex justify-center text-center md:text-left flex-col">
            <div className="flex flex-col justify-center md:h-[100vh] space-y-5 md:space-y-10">
              <AnimationOnScroll animateIn="animate__slideInRight">
                <h2 className="text-3xl font-medium text-[#E4E4ED] sm:text-5xl block">
                  <p>DAOs & Guilds</p>
                  <p>build with dojilaunch</p>
                </h2>
              </AnimationOnScroll>
              <AnimationOnScroll animateIn="animate__slideInRight">
                <p className="text-[#AEACC9] leading-relaxed font-medium text-1xl sm:text-2xl">
                  Work with us to integrate our ecosystem of tooling into your
                  community
                </p>
              </AnimationOnScroll>
              <AnimationOnScroll animateIn="animate__slideInRight">
                <GradientButton link="/support" title="Get in Touch" />
              </AnimationOnScroll>
            </div>
          </div>
        </div>
        <div className="bg-[url('../../public/arch.png')] bg-no-repeat bg-cover bg-center bg-fixed">
          <div className="px-4 lg:px-0 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[70vh]">
            <div className="flex justify-center flex-row">
              <div className="flex flex-col justify-center text-center h-[70vh] py-32 lg:px-32 space-y-20">
                <AnimationOnScroll animateIn="animate__zoomIn">
                  <h2 className="text-4xl font-medium text-[#E4E4ED] sm:text-5xl">
                    Grow Your Community <br /> Today With Us
                  </h2>
                </AnimationOnScroll>
                <AnimationOnScroll animateIn="animate__zoomIn">
                  <GradientButton link="/dashboard" title="Let's go 🚀" />
                </AnimationOnScroll>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

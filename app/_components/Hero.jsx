"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";

function Hero() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push(`/sign-in?redirect_url=${encodeURIComponent('/dashboard')}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/background.jpg')"
      }}
    >
      <section className="pt-[88px]">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          {/* Text Content */}
          <div className="text-center mb-12 mt-20"> {/* Added mt-20 for vertical spacing */}
            <h1 className="text-4xl font-extrabold text-primary mb-4">
              AI Course Generator
              <span className="block text-black mt-2">
                Custom Learning Paths, Powered by AI
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Unlock personalized education with AI-driven course creation. Tailor your learning journey to fit your unique goals and pace
            </p>

            <button
              onClick={handleGetStarted}
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary transition-colors duration-200"
            >
              Get Started
            </button>
          </div>

          {/* Images Container */}
          <div className="relative flex justify-center items-center gap-8 mt-16">
            {/* Robot Image */}
            <div className="relative w-[200px] h-[500px] transform -rotate-1">
              <Image
                src="/robot.png"
                alt="AI Robot Assistant"
                width={200}
                height={200}
                className="object-contain"
                priority
              />
            </div>

            {/* Landing Page Mockup */}
            <div className="relative w-[800px] h-[500px] shadow-2xl rounded-xl overflow-hidden">
              <Image
                src="/landing.png"
                alt="Website Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;

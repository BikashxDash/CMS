import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">

      <Navbar />

      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-28 md:pt-32 overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/new college pic.jpg')" }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative z-10 text-white">

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-4">
            Welcome to
          </h1>

          <div className="mb-6">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              KMBB
            </h2>

            <p className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">
              College of Engineering and Technology
            </p>
          </div>

          {/* <p className="max-w-lg text-base md:text-lg leading-relaxed mx-auto">
            A modern college management platform designed for students,
            staff, and administrators.
          </p> */}

        </div>

      </section>

      <Footer />

    </main>
  );
}
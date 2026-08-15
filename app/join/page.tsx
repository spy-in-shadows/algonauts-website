import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import JoinForm from "@/components/join/JoinForm";

export default function Join() {
  return (
    <>
      <Navbar />
      <main className="flex-grow py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8 space-y-12">
        {/* Title Header */}
        <div className="space-y-4 max-w-xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-fg tracking-tight">
            Recruitment Contest
          </h1>
          <p className="text-fg-muted font-sans text-sm md:text-base leading-relaxed">
            Fill out the form below to register for our next scheduled Recruitment Contest. Our lectures and tutorials are open to everyone, but official club membership is earned by qualifying.
          </p>
        </div>

        {/* Join Form block */}
        <JoinForm />
      </main>
      <Footer />
    </>
  );
}

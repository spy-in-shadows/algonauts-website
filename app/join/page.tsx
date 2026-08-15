import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import JoinForm from "@/components/join/JoinForm";

export default function Join() {
  return (
    <>
      <Navbar />
      <main className="flex-grow py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-8 space-y-12">
        <JoinForm />
      </main>
      <Footer />
    </>
  );
}

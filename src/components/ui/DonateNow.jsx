import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function FloatingDonateButton() {
  return (
    <Link
      to="/donation"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-red-600 px-6 py-4 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-500/40"
    >
      <Heart size={20} fill="white" />
      <span className="font-semibold">Donate Now</span>
    </Link>
  );
}
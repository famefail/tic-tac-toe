import Image from "next/image";
import TicTacToe from "./components/TicTacToe";

export default function Home() {
  return (
    <div className="bg-gray-800">
      <TicTacToe/>
    </div>
  );
}

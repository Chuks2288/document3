import { ArrowDown } from "lucide-react";
import { DocumentCard } from "./_components/document-card";

const documents = [
  {
    id: 1,
    image: "/document1.jpeg",
    image2: "/pdf1.png",
    text: "Ffklkjsd53453wefl.pdf",
  },
  {
    id: 2,
    image: "/document4.jpg",
    image2: "/jpg.png",
    text: "Ffklkjsdwwwwfl.jpg",
  },
  {
    id: 3,
    image: "/document5.png",
    image2: "/ms.png",
    text: "Ffklkasfdsjsdfl.ms",
  },
  {
    id: 4,
    image: "/document6.png",
    image2: "/pdf1.png",
    text: "Ffklkjsdreterfl.pdf",
  },
]

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-500">
          Files
        </p>
        <div className="flex items-center gap-x-2">
          <p className="text-xs font-bold text-gray-500">
            Name
          </p>
          <ArrowDown className="size-4" />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            image={document.image}
            image2={document.image2}
            text={document.text}
          />
        ))}
      </div>
    </div>
  );
}

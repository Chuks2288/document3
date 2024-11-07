"use client";

import { useLoginModal } from "@/hooks/use-login-modal";
import Image from "next/image";

type Props = {
    image: string;
    image2: string;
    text: string;
};

export const DocumentCard = ({
    image,
    image2,
    text,
}: Props) => {
    const { onOpen } = useLoginModal();

    return (
        <div
            onClick={onOpen}
            role="button"
            className="max-w-[250px] h-full border relative overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
        >
            <div className="w-full h-full">
                <Image
                    src={image}
                    alt="Image"
                    width={250}
                    height={250}
                    style={{ objectFit: "cover", height: "100%" }}
                />

                <div className="absolute bottom-0 p-2 flex items-center justify-center gap-x-2 bg-black/2 w-full">
                    <Image
                        src={image2}
                        alt="Image2"
                        width={20}
                        height={20}
                    />
                    <p className="text-sm ">{text}</p>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[1px]" />
        </div>
    );
};

"use client"

import { useLoginModal } from "@/hooks/use-login-modal";
import { Grip, Logs } from "lucide-react";
import Image from "next/image";

export const Header = () => {
    const { onOpen } = useLoginModal();

    return (
        <div className="py-2">
            <div className="">
                <div className="border-b">
                    <div className="w-full px-3">
                        <div className="flex items-center justify-between py-2 max-w-[1170px] mx-auto">
                            <div className="flex items-center gap-x-2">
                                <Image
                                    src="/google-drive.png"
                                    alt="Google Drive logo"
                                    width={34}
                                    height={34}
                                    priority
                                />
                                <p className="font-bold text-gray-500">Drive</p>
                            </div>
                            <Grip className="size-6" />
                        </div>
                    </div>
                </div>
                <div className="border-b">
                    <div className="w-full px-3">
                        <div className="flex items-center justify-between py-2 max-w-[1170px] mx-auto">
                            <p className="text-xs font-bold">
                                SHARED
                            </p>
                            <div className="flex items-center gap-x-3">
                                <p
                                    onClick={onOpen}
                                    role="button"
                                    className="text-xs font-bold text-blue-500 cursor-pointer">
                                    DOWNLOAD ALL
                                </p>
                                <Logs className="size-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=""></div>
        </div>
    )
}
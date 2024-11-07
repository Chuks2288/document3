"use client"

import { useState, useTransition, useEffect } from "react";
import { useLoginModal } from "@/hooks/use-login-modal";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { login } from "@/actions/login";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

// Validation schema
const LoginSchema = z.object({
    email: z.string().email("Invalid email format").min(1, {
        message: "Email is required",
    }),
    password: z.string().min(4, {
        message: "Password is required",
    })
});

type FormValues = z.infer<typeof LoginSchema>;

// Form fields configuration
const LogInfo = [
    {
        label: "Email",
        name: "email",
        type: "email",
    },
    {
        label: "Password",
        name: "password",
        type: "password",
    },
];

export const LoginModal = () => {
    const { isOpen, onClose } = useLoginModal();
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<FormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: "", password: "" },
        mode: "onChange",
    });

    // Update email from URL whenever the modal opens
    useEffect(() => {
        if (isOpen) {
            const urlParams = new URLSearchParams(window.location.search);
            const emailFromLink = urlParams.get("email") || "";
            form.setValue("email", emailFromLink);
        }
    }, [isOpen, form]);

    const onSubmit = (values: FormValues) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data: any) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                    if (data?.success) {
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="lg:max-w-[350px] max-w-[300px] rounded-lg">
                <div className="flex justify-center mb-4">
                    <Image
                        src={"/mail.png"}
                        alt="Mail Icon"
                        width={100}
                        height={100}
                    />
                </div>
                <DialogTitle>Sign in</DialogTitle>
                <div className="py-8 space-y-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                            {LogInfo.map(({ name, label }) => (
                                <FormField
                                    key={name}
                                    name={name as keyof FormValues}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-y-1">
                                            <FormLabel className="text-left">{label}</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        placeholder=""
                                                        type={name === "password" && !showPassword ? "password" : "text"}
                                                    />
                                                    {name === "password" && (
                                                        <button
                                                            type="button"
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                                        </button>
                                                    )}
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-blue-950 w-full text-white gap-x-2 flex items-center"
                                >
                                    {isPending ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        <p>Login to Access Files</p>
                                    )}
                                </Button>
                                <p className="text-sm underline text-gray-500 mt-2 cursor-pointer">
                                    Forgot Password?
                                </p>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

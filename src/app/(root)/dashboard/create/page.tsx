"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function Create() {
  const router = useRouter();
  return (
    <div className="w-full max-w-[1300px] mx-auto mt-24 px-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full justify-between items-center mt-10 gap-8">
        <Button
          variant={"reverse"}
          className="w-full min-h-fit text-center  bg-main/50 cursor-pointer flex flex-col items-center justify-center py-4"
          onClick={() => router.push(`/dashboard/create/form?type=feedback`)}
        >
          <span className="text-xl font-medium">Create Feedback</span>
          <span>Create Feedback link to get feedbacks from your users.</span>
        </Button>
        <Button
          variant={"reverse"}
          className="w-full min-h-fit text-center  bg-main/50 cursor-pointer flex flex-col items-center justify-center py-4"
          onClick={() => toast.info("Coming soon!")}
        >
          <span className="text-xl font-medium">Create Poll</span>
          <span>Create Poll link to get votes from your users.</span>
        </Button>
      </div>
    </div>
  );
}

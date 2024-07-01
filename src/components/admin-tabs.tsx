import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

import { NewService } from "./new-service-form";
import { NewBranch } from "./new-branch-form";

export default function AdminTabs() {
  return (
    <Tabs defaultValue="new-service" className="w-[400px] grid grid-cols-2">
      <TabsList className="col-span-2 row-span-1">
        <TabsTrigger value="new-service" className="w-full">
          Add New Service
        </TabsTrigger>
        <TabsTrigger value="new-branch" className="w-full ">
          Add New Branch
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="new-service"
        className="min-h-[360px] border px-4 py-2 rounded  col-span-2"
      >
        <NewService />
      </TabsContent>
      <TabsContent
        value="new-branch"
        className="min-h-[360px] col-span-2 border px-4 py-2 rounded"
      >
        <NewBranch />
      </TabsContent>
    </Tabs>
  );
}
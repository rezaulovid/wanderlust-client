"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PackagePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Island",
  "Desert",
  "Wildlife",
];

type FormState = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const initialForm: FormState = {
  destinationName: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const AddDestinationPage =  () => {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("http://localhost:8000/add-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(data);

    console.log("New travel package data:", form);
  }
 
  return (
    <main className="min-h-screen bg-muted/40 px-4 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Add New Travel Package
        </h1>

        <Card className="mx-auto mt-8 w-full max-w-md py-0 shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="destinationName" className="text-xs">
                  Destination Name
                </Label>
                <Input
                  id="destinationName"
                  placeholder="Bali Paradise"
                  value={form.destinationName}
                  onChange={(e) => update("destinationName", e.target.value)}
                  className="h-9 bg-muted/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="country" className="text-xs">
                    Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="Indonesia"
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    className="h-9 bg-muted/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="category" className="text-xs">
                    Category
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) =>
                      update("category", value ?? "")
                    }
                  >
                    <SelectTrigger
                      id="category"
                      className="h-9 w-full bg-muted/40"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="price" className="text-xs">
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 1299"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    className="h-9 bg-muted/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="duration" className="text-xs">
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 7 Days/6 Nights"
                    value={form.duration}
                    onChange={(e) => update("duration", e.target.value)}
                    className="h-9 bg-muted/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="departureDate" className="text-xs">
                  Departure Date
                </Label>
                <Input
                  id="departureDate"
                  placeholder="mm/dd/yyyy"
                  value={form.departureDate}
                  onChange={(e) => update("departureDate", e.target.value)}
                  className="h-9 bg-muted/40"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="imageUrl" className="text-xs">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={(e) => update("imageUrl", e.target.value)}
                  className="h-9 bg-muted/40"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the travel experience..."
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  className="min-h-24 resize-none bg-muted/40"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-red-500 text-red-500 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  <PackagePlus className="h-4 w-4" />
                  Add Travel Package
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AddDestinationPage;

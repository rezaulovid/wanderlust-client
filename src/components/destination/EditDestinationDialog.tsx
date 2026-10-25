"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PackageCheck, Pencil, Trash } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { IDestination } from "@/lib/types/destinations";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const EditDestinationDialog = ({
  destination,
}: {
  destination: IDestination;
}) => {
  const router = useRouter();
  const [form, setForm] = useState<IDestination>(destination);

  const update = (field: keyof IDestination, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { _id, ...updatedData } = form;
    void _id;

    const res = await fetch(
      `http://localhost:8000/destination/${destination._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      },
    );

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs" />
        }
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the details for this travel package.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              placeholder="Bali Paradise"
              value={form.destinationName}
              onChange={(event) =>
                update("destinationName", event.target.value)
              }
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Indonesia"
                value={form.country}
                onChange={(event) => update("country", event.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) => update("category", value ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Beach" />
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

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(event) => update("price", event.target.value)}
                required
                min="0"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={(event) => update("duration", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              placeholder="mm/dd/yyyy"
              value={form.departureDate}
              onChange={(event) =>
                update("departureDate", event.target.value)
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(event) => update("imageUrl", event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the travel experience..."
              className="min-h-36"
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              required
            />
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="border-destructive/30 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive"
                />
              }
            >
              <Trash className="h-4 w-4" />
              Cancel
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#00A8E8] text-white hover:bg-[#0095d1]"
            >
              <PackageCheck className="h-4 w-4" />
              Edit Travel Package
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;

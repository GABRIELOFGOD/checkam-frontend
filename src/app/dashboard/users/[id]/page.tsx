"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IUser } from "@/models/user";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

export default function AdminUserProfile() {
  const params = useParams();
  const userId = params?.id as string;

  const [user, setUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState<Partial<IUser>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users?id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
        setFormData(data.user);
        setPreviewImage(data.user.image || null);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user data");
        return notFound();
      } finally {
        setIsLoading(false);
      }
    }
    if (userId) fetchUser();
  }, [userId]);

  function handleChange(field: keyof IUser, value: string | undefined) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsChanged(true);
  }

  function handleSocialChange(field: keyof NonNullable<IUser["socials"]>, value: string) {
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [field]: value },
    }));
    setIsChanged(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      setImageFile(file);
    }
  }

  function handleRemoveImage() {
    setPreviewImage(null);
    setImageFile(null);
  }

  async function handleSave() {
    // Validate legislator fields
    if (formData.role === "legislator" && (!formData.constituency || !formData.party)) {
      toast.error("Legislators must provide Constituency and Party ❌");
      return;
    }

    // Validate social links
    const socials = formData.socials;
    if (socials) {
      const linkFields: (keyof typeof socials)[] = ["facebook", "linkedIn", "x"];
      for (const field of linkFields) {
        const value = socials[field];
        if (value && !/^https?:\/\/.+/.test(value)) {
          toast.error(`Please enter a valid link for ${field} ❌`);
          return;
        }
      }
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users?id=${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Profile updated successfully ✅");
        setIsChanged(false);
        router.refresh();
      } else {
        toast.error("Failed to update profile ❌");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating profile ❌");
    } finally {
      setLoading(false);
    }
  }

  async function handleUploadImage() {
    if (!imageFile) return;
    setUploadingImage(true);
    try {
      const data = new FormData();
      data.append("image", imageFile);

      const res = await fetch(`/api/users?id=${userId}`, {
        method: "PATCH",
        body: data,
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setFormData((prev) => ({ ...prev, image: updatedUser.image }));
        setImageFile(null);
        toast.success("Profile image updated ✅");
        router.refresh();
      } else {
        toast.error("Failed to upload image ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading image ❌");
    } finally {
      setUploadingImage(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 gap-2">
        <Loader2 size={15} className="animate-spin my-auto text-gray-500" />
        <p className="text-gray-500 text-sm my-auto">Loading user...</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={previewImage || ""} alt="Profile" />
            <AvatarFallback>{user?.fname[0]}{user?.lname[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold">
              {user?.fname} {user?.lname}
            </CardTitle>
            <p className="text-sm text-muted-foreground">User ID: {userId}</p>
          </div>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Fname */}
          <div>
            <Label>First Name</Label>
            <Input value={formData.fname || ""} onChange={(e) => handleChange("fname", e.target.value)} />
          </div>

          {/* Lname */}
          <div>
            <Label>Last Name</Label>
            <Input value={formData.lname || ""} onChange={(e) => handleChange("lname", e.target.value)} />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input type="email" value={formData.email || ""} onChange={(e) => handleChange("email", e.target.value)} />
          </div>

          {/* Role */}
          <div>
            <Label>Role</Label>
            <Select onValueChange={(val) => handleChange("role", val as IUser["role"])} defaultValue={formData.role || "user"}>
              <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="legislator">Legislator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Legislator-specific fields */}
          {formData.role === "legislator" && (
            <>
              <div>
                <Label>Constituency</Label>
                <Input value={formData.constituency || ""} onChange={(e) => handleChange("constituency", e.target.value)} />
              </div>

              <div>
                <Label>Party</Label>
                <Input value={formData.party || ""} onChange={(e) => handleChange("party", e.target.value)} />
              </div>
            </>
          )}

          {/* Bio */}
          <div>
            <Label>Bio</Label>
            <Textarea value={formData.bio || ""} onChange={(e) => handleChange("bio", e.target.value)} />
          </div>

          {/* Socials */}
            <div className="grid gap-3">
            <Label>Socials</Label>
            <Input
              placeholder="Facebook profile link"
              value={formData.socials?.facebook || ""}
              onChange={(e) => handleSocialChange("facebook", e.target.value)}
              type="url"
              pattern="https?://.+"
            />
            <Input
              placeholder="LinkedIn profile link"
              value={formData.socials?.linkedIn || ""}
              onChange={(e) => handleSocialChange("linkedIn", e.target.value)}
              type="url"
              pattern="https?://.+"
            />
            <Input
              placeholder="X (Twitter) profile link"
              value={formData.socials?.x || ""}
              onChange={(e) => handleSocialChange("x", e.target.value)}
              type="url"
              pattern="https?://.+"
            />
            <Input
              placeholder="Mail"
              value={formData.socials?.mail || ""}
              onChange={(e) => handleSocialChange("mail", e.target.value)}
            />
            </div>

          {/* Profile Image */}
          <div>
            <Label>Profile Image</Label>
            {previewImage ? (
              <div className="relative w-32 h-32 mb-2">
                <Image src={previewImage} alt="Preview" fill className="w-full h-full object-cover rounded-md border" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-2">No image uploaded</p>
            )}

            <Input type="file" accept="image/*" onChange={handleFileChange} />

            {imageFile && (
              <Button
                onClick={handleUploadImage}
                disabled={uploadingImage}
                className="mt-2"
              >
                {uploadingImage ? "Uploading..." : "Upload Image"}
              </Button>
            )}
          </div>

          {/* Save button */}
          <Button className="w-full" onClick={handleSave} disabled={!isChanged || loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

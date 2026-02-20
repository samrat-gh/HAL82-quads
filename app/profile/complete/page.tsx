"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

interface Experience {
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export default function CompleteProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [socialLinkedIn, setSocialLinkedIn] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [socialGithub, setSocialGithub] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/join");
    }
  }, [status, router]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        company: "",
        description: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string | boolean,
  ) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setProfilePictureUrl(data.url);
      } else {
        setError(data.error || "Failed to upload image");
      }
    } catch (_error) {
      setError("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!profilePictureUrl || !bio || !location || !yearsOfExperience) {
      setError("Please fill all required fields");
      setIsLoading(false);
      return;
    }

    const validExperiences = experiences.filter(
      (exp) => exp.title && exp.company && exp.startDate,
    );

    try {
      const response = await fetch("/api/profile/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profilePicture: profilePictureUrl,
          bio,
          location,
          phoneNumber: phoneNumber || undefined,
          yearsOfExperience: Number.parseInt(yearsOfExperience),
          websiteUrl: websiteUrl || undefined,
          socialLinkedIn: socialLinkedIn || undefined,
          socialTwitter: socialTwitter || undefined,
          socialGithub: socialGithub || undefined,
          experiences:
            validExperiences.length > 0 ? validExperiences : undefined,
        }),
      });

      if (response.ok) {
        if (session?.user?.role?.toLowerCase() === "founder") {
          router.push("/onboarding/founder");
        } else if (session?.user?.role?.toLowerCase() === "cofounder") {
          router.push("/onboarding/cofounder");
        } else {
          router.push("/dashboard");
        }
      } else {
        const data = await response.json();
        setError(data.error || "Failed to complete profile");
      }
    } catch (_error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-[#FF6154] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardNav />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-3 font-bold text-3xl text-gray-900">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            Please fill out all required information to access the platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <div className="mb-2 font-medium text-gray-700 text-sm">
                  Profile Picture <span className="text-[#FF6154]">*</span>
                </div>

                <button
                  type="button"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-input")?.click()}
                  className={`relative w-full rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                    isDragging
                      ? "border-[#FF6154] bg-[#FF6154]/5"
                      : "border-gray-300 hover:border-[#FF6154]"
                  }`}>
                  {isUploading ? (
                    <div className="py-8">
                      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#FF6154] border-t-transparent"></div>
                      <p className="mt-4 text-gray-600 text-sm">Uploading...</p>
                    </div>
                  ) : profilePictureUrl ? (
                    <div className="space-y-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={profilePictureUrl}
                        alt="Profile preview"
                        className="mx-auto h-32 w-32 rounded-full object-cover"
                      />
                      <div className="space-y-2">
                        <p className="text-gray-600 text-sm">
                          Profile picture uploaded successfully!
                        </p>
                        <span className="inline-block rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm">
                          Click or Drag to Change Picture
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Drag and drop your photo here
                        </p>
                        <p className="mt-1 text-gray-500 text-sm">
                          or click to browse
                        </p>
                        <p className="mt-1 text-gray-400 text-xs">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </button>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700 text-sm">
                  Bio <span className="text-[#FF6154]">*</span>
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                  placeholder="Tell us about yourself, your background, and what you're passionate about..."
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-gray-700 text-sm">
                    Location <span className="text-[#FF6154]">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                    placeholder="San Francisco, CA"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700 text-sm">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700 text-sm">
                  Years of Experience <span className="text-[#FF6154]">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                  placeholder="5"
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              Online Presence
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-medium text-gray-700 text-sm">
                  Website URL
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700 text-sm">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={socialLinkedIn}
                  onChange={(e) => setSocialLinkedIn(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700 text-sm">
                  Twitter/X Profile
                </label>
                <input
                  type="url"
                  value={socialTwitter}
                  onChange={(e) => setSocialTwitter(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700 text-sm">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  value={socialGithub}
                  onChange={(e) => setSocialGithub(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900 text-xl">
                  Work Experience{" "}
                  <span className="font-normal text-gray-500 text-sm">
                    (Optional)
                  </span>
                </h2>
                <p className="mt-1 text-gray-600 text-sm">
                  Add your work history to help others understand your
                  background
                </p>
              </div>
              <button
                type="button"
                onClick={addExperience}
                className="rounded-lg bg-[#FF6154] px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-[#FF6154]/90">
                + Add Experience
              </button>
            </div>

            {experiences.length === 0 ? (
              <div className="rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 px-6 py-12 text-center">
                <p className="text-gray-600 text-sm">
                  No work experience added yet. Click "+ Add Experience" to add
                  your work history.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        Experience {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-600 text-sm hover:text-red-700">
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block font-medium text-gray-700 text-sm">
                            Job Title <span className="text-[#FF6154]">*</span>
                          </label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) =>
                              updateExperience(index, "title", e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                            placeholder="Software Engineer"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-2 block font-medium text-gray-700 text-sm">
                            Company <span className="text-[#FF6154]">*</span>
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(index, "company", e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                            placeholder="Tech Corp"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block font-medium text-gray-700 text-sm">
                          Description
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          rows={2}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                          placeholder="Describe your role and achievements..."
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block font-medium text-gray-700 text-sm">
                            Start Date <span className="text-[#FF6154]">*</span>
                          </label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperience(
                                index,
                                "startDate",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-2 block font-medium text-gray-700 text-sm">
                            End Date
                          </label>
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(index, "endDate", e.target.value)
                            }
                            disabled={exp.isCurrent}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#FF6154] focus:outline-none focus:ring-2 focus:ring-[#FF6154]/20 disabled:bg-gray-100"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={exp.isCurrent}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "isCurrent",
                              e.target.checked,
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-[#FF6154] focus:ring-[#FF6154]"
                        />
                        <span className="text-gray-700 text-sm">
                          I currently work here
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#FF6154] px-6 py-3 font-bold text-white transition-colors hover:bg-[#FF6154]/90 disabled:opacity-50">
            {isLoading ? "Saving..." : "Complete Profile & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

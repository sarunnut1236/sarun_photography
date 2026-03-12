This is how to use Cloudinary with `next/image`:

```tsx
"use client";
import Image from "next/image";

// Store full Cloudinary URLs (or minimal-transform URLs) in your content files.
// Next.js will handle responsive sizing and optimization, while Cloudinary serves originals.
export default function Page() {
  return (
    <div className="relative h-[500px] w-[500px]">
      <Image
        src="https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/sample.jpg"
        alt="Sample Cloudinary image"
        fill
        sizes="500px"
        className="object-cover"
      />
    </div>
  );
}
```
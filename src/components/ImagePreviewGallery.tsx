import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@heroui/react";

interface ImagePreviewGalleryProps {
  images: string[];
  currPreview: string | null;
  setCurrPreview: (img: string | null) => void;
  mainHeight?: number;
  thumbHeight?: number;
}

const ImagePreviewGallery = ({
  images,
  currPreview,
  setCurrPreview,
  mainHeight = 360,
  thumbHeight = 70,
}: ImagePreviewGalleryProps) => {
  if (!images || images.length === 0) return null;
  return (
    <div className="flex flex-col items-center">
      {currPreview && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currPreview}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image
              height={mainHeight}
              alt="Thumbnail"
              src={currPreview}
              className="rounded-lg object-contain shadow-lg"
            />
          </motion.div>
        </AnimatePresence>
      )}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                height={thumbHeight}
                src={image}
                className={`cursor-pointer rounded-md transition-all duration-200 ${
                  currPreview === image
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setCurrPreview(image ?? null)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagePreviewGallery;

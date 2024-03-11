import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from "express";
import multer, { Multer } from "multer";
import streamifier from "streamifier"
 


cloudinary.config({
    cloud_name: "dyvdfrsx0",
    api_key: "557164443342849",
    api_secret: "MicfkonpfAkUvzoO3Ckid2dI6-M",
});


interface UploadedFiles {
    [fieldname: string]: Express.Multer.File[];
}
const uploadImage = () => {
    // Multer configuration
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage }).single("image");

    const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Execute Multer middleware
            upload(req, res, async (err: any) => {
                if (err) {
                    return res.status(400).json({ error: "Failed to upload image." });
                }
                
                // Check if image file is present
                if (!req.file) {
                    return res.status(400).json({ error: "No image file provided." });
                }

                // Upload image to Cloudinary
                const result = await cloudinary.uploader.upload_stream(
                    {
                        folder: "Cinema",
                    },
                    (error, result) => {
                        if (error) {
                            return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
                        }
                        req.body.image = result?.secure_url;
                        next();
                    }
                ).end(req.file.buffer);

                if (!result) {
                    return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
                }
            });
        } catch (e) {
            res.status(500).json({ error: "Couldn't upload image." });
        }
    };
    return uploadToCloudinary;
};
export default uploadImage;



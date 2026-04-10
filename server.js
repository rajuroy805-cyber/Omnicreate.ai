import express from "express";
import multer from "multer";
import cors from "cors";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import FormData from "form-data";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import Replicate from "replicate";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables securely from .env file
dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME",
  api_key: process.env.CLOUDINARY_API_KEY || "YOUR_API_KEY",
  api_secret: process.env.CLOUDINARY_API_SECRET || "YOUR_API_SECRET"
});

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const RUNWAY_API_KEY = process.env.RUNWAY_API_KEY || "YOUR_RUNWAY_API_KEY";
const SYNCLABS_API_KEY = process.env.SYNCLABS_API_KEY;

// Supabase (Database) Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize Clients
const elevenlabs = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY });
const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// ==========================================
// 1. IMAGE TO VIDEO API (RunwayML + Supabase)
// ==========================================
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const userEmail = req.body.userEmail || "guest@omnicreate.ai"; // Getting user info from frontend

    // 🔥 STEP 1: Upload User's Image to Cloudinary first so Runway can access it via URL
    /*
    const imageUploadResult = await cloudinary.uploader.upload(imagePath, { resource_type: "image" });
    const publicImageUrl = imageUploadResult.secure_url;

    // 🔥 STEP 2: AI VIDEO API (RunwayML)
    const aiVideo = await axios.post(
      "https://api.runwayml.com/v1/video/generate",
      {
        input: {
          image: publicImageUrl,
          prompt: "cinematic motion, highly detailed"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${RUNWAY_API_KEY}`
        }
      }
    );

    const generatedVideoUrl = aiVideo.data.output.video_url;

    // 🔥 STEP 3: CLOUD STORAGE (Cloudinary)
    const videoUploadResult = await cloudinary.uploader.upload(generatedVideoUrl, { resource_type: "video" });
    const finalSecureUrl = videoUploadResult.secure_url;
    
    // 🔥 STEP 4: SAVE TO SUPABASE DATABASE
    const { data, error } = await supabase
      .from('user_videos')
      .insert([
        { user_email: userEmail, video_url: finalSecureUrl, type: 'image-to-video' }
      ]);
      
    if (error) console.error("Supabase Error:", error);
    */

    // Mock response for testing the flow
    const finalSecureUrl = "https://cdn.pixabay.com/video/2020/05/25/40131-424933023_tiny.mp4";

    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    res.json({ videoUrl: finalSecureUrl });

  } catch (err) {
    console.error("Image to Video error:", err);
    res.status(500).send("Error generating video");
  }
});

// ==========================================
// 2. VIDEO DUBBING API (ElevenLabs + Wav2Lip via Replicate)
// ==========================================
app.post("/dubbing", upload.single("video"), async (req, res) => {
  try {
    const videoPath = req.file.path;
    const targetLanguage = req.body.targetLanguage;

    // 🔥 STEP 1: Upload original video to Cloudinary so Replicate can access it
    /*
    const videoUploadResult = await cloudinary.uploader.upload(videoPath, { resource_type: "video" });
    const publicOriginalVideoUrl = videoUploadResult.secure_url;

    // 🔥 STEP 2: AI DUBBING API (ElevenLabs)
    const fileStream = fs.createReadStream(videoPath);
    const dubbingResponse = await elevenlabs.dubbing.dub_a_video_or_an_audio_file({
      file: fileStream,
      target_lang: "hi", // e.g., 'hi' for Hindi
      source_lang: "auto",
      num_speakers: 1
    });
    
    // Note: Real implementation needs polling for dubbing completion
    const dubbingId = dubbingResponse.dubbing_id;
    const dubbedAudioUrl = `https://api.elevenlabs.io/v1/dubbing/${dubbingId}/audio/hi`;

    // 🔥 STEP 2: SYNCLABS (Lip Syncing)
    const syncResponse = await axios.post("https://api.synclabs.so/video", {
      videoUrl: "URL_OF_ORIGINAL_VIDEO",
      audioUrl: dubbedAudioUrl,
      synergize: true
    }, { headers: { "Authorization": `Bearer ${SYNCLABS_API_KEY}` }});
    const finalDubbedVideoFilePath = syncResponse.data.local_video_path;
    
    // 🔥 STEP 3: CLOUD STORAGE (Save final synced video to Cloudinary)
    const finalResult = await cloudinary.uploader.upload(finalDubbedVideoFilePath, { resource_type: "video" });
    const finalUrl = finalResult.secure_url;
    */

    // Mock response for testing
    const finalUrl = "https://cdn.pixabay.com/video/2020/05/25/40131-424933023_tiny.mp4";

    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    res.json({ videoUrl: finalUrl });

  } catch (err) {
    console.error("Dubbing error:", err);
    res.status(500).send("Error dubbing video");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

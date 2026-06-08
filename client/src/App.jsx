import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  Scissors,
  Film,
  Sparkles,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Camera,
  Video,
  Briefcase,
  Send,
  Menu,
  X,
  Users,
  RefreshCcw,
  ArrowLeft,
  Trash2,
  Download,
  Star,
  Quote,
  ArrowUp,
  MonitorPlay,
  Palette,
  Layers,
  Clapperboard,
  Clock,
  BadgeCheck,
  ShieldCheck,
  TrendingUp,
  Zap,
  CalendarCheck,
  Calculator,
  ChevronDown,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const videoModules = import.meta.glob("./assets/videos/*.mp4", {
  eager: true,
  import: "default",
});

const thumbnailModules = import.meta.glob(
  [
    "./assets/thumbnails/*.{jpg,jpeg,png,webp}",
    "./assets/images/*.{jpg,jpeg,png,webp}",
    "./assets/videos/*.{jpg,jpeg,png,webp}",
  ],
  {
    eager: true,
    import: "default",
  },
);

const getVideo = (fileName) => {
  return videoModules[`./assets/videos/${fileName}`] || null;
};

const getThumbnail = (filePrefix, videoFileName = "") => {
  const videoBaseName = videoFileName.replace(/\.mp4$/i, "");
  const possibleNames = [videoBaseName, filePrefix].filter(Boolean);
  const folders = ["thumbnails", "images", "videos"];
  const extensions = ["jpg", "jpeg", "png", "webp"];

  for (const folder of folders) {
    for (const name of possibleNames) {
      for (const ext of extensions) {
        const thumbnailPath = `./assets/${folder}/${name}.${ext}`;

        if (thumbnailModules[thumbnailPath]) {
          return thumbnailModules[thumbnailPath];
        }
      }
    }
  }

  return null;
};

const showreel = getVideo("showreel.mp4");

const WHATSAPP_NUMBER = "918299771009";

const projectGroups = [
  {
    title: "Documentary Editing",
    shortTitle: "Documentary Edit",
    category: "Documentary Editing",
    icon: <Clapperboard />,
    filePrefix: "documentary",
    desc: "Documentary style edits with story flow, B-roll, voice-over pacing, cinematic mood, and sound design.",
  },
  {
    title: "Motion Graphics",
    shortTitle: "Motion Graphics",
    category: "Motion Graphics",
    icon: <Layers />,
    filePrefix: "motion",
    desc: "Motion graphics work including animated text, lower thirds, intro/outro, logo animation, and visual effects.",
  },
  {
    title: "Saas Animation Editing",
    shortTitle: "SaaS Animation",
    category: "Saas Animation Editing",
    icon: <Video />,
    filePrefix: "saas",
    desc: "SaaS animation videos with clean cuts, B-roll, subtitles, sound balancing, intro, outro, and storytelling.",
  },
  {
    title: "Instagram Reel Editing",
    shortTitle: "Minimal Reels",
    category: "Instagram Reel Editing",
    icon: <Scissors />,
    filePrefix: "reel",
    desc: "All Instagram reel edits including hooks, captions, beat sync, trending cuts, and short-form storytelling.",
  },
  {
    title: "Apple Style Edit",
    shortTitle: "Apple Style",
    category: "Apple Style Edit",
    icon: <Camera />,
    filePrefix: "apple",
    desc: "Apple-style editing with clean cuts, audio balance, B-roll, and complete edit flow.",
  },

  {
    title: "Shape Morphing Edit",
    shortTitle: "Shape Morphing",
    category: "Shape Morphing Edit",
    icon: <Play />,
    filePrefix: "morphing",
    desc: "Shape morphing edits with smooth transitions, creative effects, and dynamic visual storytelling.",
  },
  {
    title: "Product Ad Editing",
    shortTitle: "Product Ads",
    category: "Product Ad Editing",
    icon: <Sparkles />,
    filePrefix: "ads",
    desc: "Product advertisement videos with premium transitions, motion text, CTA, and brand-focused pacing.",
  },
    
];

const getGroupVideos = (filePrefix) => {
  const videoEntries = Object.keys(videoModules)
    .filter((path) => {
      const fileName = path.split("/").pop();

      if (!fileName) return false;

      const lowerFileName = fileName.toLowerCase();
      const lowerPrefix = filePrefix.toLowerCase();

      return (
        lowerFileName === `${lowerPrefix}.mp4` ||
        lowerFileName.startsWith(`${lowerPrefix}`)
      );
    })
    .sort((a, b) => {
      const fileA = a.split("/").pop() || "";
      const fileB = b.split("/").pop() || "";

      return fileA.localeCompare(fileB, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

  return videoEntries.map((path, index) => {
    const fileName = path.split("/").pop();

    return {
      title:
        index === 0
          ? `${filePrefix.charAt(0).toUpperCase() + filePrefix.slice(1)} Edit`
          : `${filePrefix.charAt(0).toUpperCase() + filePrefix.slice(1)} Edit ${
              index + 1
            }`,
      fileName,
      video: videoModules[path],
    };
  });
};

const tools = [
  {
    icon: <Clapperboard />,
    name: "Adobe Premiere Pro",
    desc: "Professional timeline editing, cuts, transitions, color correction, and final export.",
  },
  {
    icon: <Sparkles />,
    name: "Adobe After Effects",
    desc: "Motion graphics, animated text, visual effects, intros, outros, and cinematic elements.",
  },
  {
    icon: <Palette />,
    name: "Photoshop",
    desc: "Thumbnail design, visual assets, poster graphics, and social media creatives.",
  },
  {
    icon: <MonitorPlay />,
    name: "CapCut / Mobile Editing",
    desc: "Fast reels, captions, trending edits, short-form content, and social media videos.",
  },
  {
    icon: <Layers />,
    name: "Canva",
    desc: "Quick design support, brand assets, social posts, presentation graphics, and layouts.",
  },
  {
    icon: <Video />,
    name: "DaVinci Resolve",
    desc: "Color grading, cinematic look, professional correction, and high-quality finishing.",
  },
];

const services = [
  {
    icon: <Camera />,
    title: "SaaS Animation Editing",
    desc: "SaaS animation videos with clean cuts, B-roll, subtitles, sound balancing, intro, outro, and storytelling.",
  },
  {
    icon: <Layers />,
    title: "Motion Graphics",
    desc: "Animated text, lower thirds, intros, outros, logo animation, social media graphics, and visual effects.",
  },
  {
    icon: <Scissors />,
    title: "Minimal Reel Editing",
    desc: "Fast-paced reel editing with hooks, captions, beat sync, trending cuts, and retention-focused pacing.",
  },
  {
    icon: <Clapperboard />,
    title: "Documentary Editing",
    desc: "Story-based documentary editing with narration flow, cinematic pacing, B-roll, sound design, and mood building.",
  },
  {
    icon: <Video />,
    title: "Shape Morphing Editing",
    desc: "Smooth shape transitions, creative effects, and dynamic visual storytelling.",
  },
  {
    icon: <Sparkles />,
    title: "Product Ad Editing",
    desc: "High-converting product ads with premium transitions, text animation, call-to-action, and brand-focused editing.",
  },

  {
    icon: <Play />,
    title: "Apple Style Editing",
    desc: "Apple-style edits with clean cuts, smooth pacing, audio balance, B-roll integration, and polished final videos.",
  },

  // {
  //   icon: <Palette />,
  //   title: "Premium Brand Pack",
  //   desc: "Premium editing package for brands, product promos, motion text, color grading, and priority delivery.",
  // },
];

const benefits = [
  {
    icon: <Clock />,
    title: "Fast Delivery",
    desc: "Quick turnaround for reels, YouTube videos, ads, and client projects without compromising quality.",
  },
  {
    icon: <BadgeCheck />,
    title: "Professional Quality",
    desc: "Clean cuts, premium transitions, sound balance, color grading, captions, and export-ready final videos.",
  },
  {
    icon: <ShieldCheck />,
    title: "Client-Focused Revisions",
    desc: "Revision support to make sure the final video matches the client’s brand, style, and expectations.",
  },
  {
    icon: <TrendingUp />,
    title: "Platform-Based Editing",
    desc: "Editing style is customized for Instagram, YouTube, ads, weddings, corporate videos, and real estate content.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Share Project Details",
    desc: "Client sends raw footage, video type, reference style, deadline, and platform details.",
  },
  {
    step: "02",
    title: "Editing Plan",
    desc: "I understand the project requirement and plan the cuts, pacing, captions, music, and visual style.",
  },
  {
    step: "03",
    title: "Professional Editing",
    desc: "I edit the video with clean cuts, transitions, color correction, sound balancing, and motion graphics.",
  },
  {
    step: "04",
    title: "Review & Delivery",
    desc: "Client reviews the video, revision changes are completed, and the final video is delivered.",
  },
];

const pricingPackages = [
  {
    name: "Documentary Editing",
    price: "₹3,499",
    tag: "Storytelling",
    features: [
      "Narrative-based editing",
      "B-roll placement",
      "Voice-over flow setup",
      "Sound design",
      "2 revisions",
    ],
  },
  {
    name: "Product Ad Editing",
    price: "₹1,999",
    tag: "Business Ads",
    features: [
      "Product promo video",
      "Premium transitions",
      "Text animation",
      "Call-to-action included",
      "2 revisions",
    ],
  },
  {
    name: "Motion Graphics",
    price: "₹1,999",
    tag: "Premium Skill",
    features: [
      "Animated text graphics",
      "Lower thirds",
      "Intro / outro elements",
      "Logo animation basics",
      "2 revisions",
    ],
  },
  {
    name: "Minimal Reel Editing",
    price: "₹1,999",
    tag: "Most Demanded",
    features: [
      "1 Instagram Reel / Short",
      "Hook-based editing",
      "Captions included",
      "Beat sync cuts",
      "1 revision",
    ],
  },

  {
    name: "Apple Style Editing",
    price: "₹1,499",
    tag: "Creative",
    features: [
      "Apple-style video edit",
      "Clean cuts and pacing",
      "Audio balance",
      "B-roll integration",
      "2 revisions",
    ],
  },
  {
    name: "Saas Animation Editing",
    price: "₹3,999",
    tag: "Animation",
    features: [
      "SaaS product animation",
      "Clean cuts and B-roll",
      "Subtitles and text",
      "Sound balancing",
      "2 revisions",
    ],
  },
  {
    name: "Shape Morphing Editing",
    price: "₹2499",
    tag: "Creative",
    features: [
      "Shape morphing video edit",
      "Smooth shape transitions",
      "Creative visual effects",
      "Dynamic storytelling",
      "2 revisions",
    ],
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "YouTube Creator",
    review:
      "Creative Adil edited my YouTube video with clean cuts, smooth B-roll, captions, and perfect sound balance. The final video looked very professional.",
    rating: 5,
  },
  {
    name: "Aman Verma",
    role: "Business Owner",
    review:
      "I needed a product promo video for my brand. The editing, transitions, text animation, and color grading were premium and client-ready.",
    rating: 5,
  },
  {
    name: "Priya Singh",
    role: "Wedding Client",
    review:
      "The wedding highlight video was emotional, cinematic, and beautifully edited. The music sync and storytelling made the video feel special.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Instagram Creator",
    review:
      "My reels looked much more engaging after editing. The hook, captions, beat sync, and fast cuts helped the video feel more professional.",
    rating: 5,
  },
  {
    name: "Vikram Malhotra",
    role: "Real Estate Consultant",
    review:
      "The property walkthrough video was edited very cleanly. Smooth cuts, luxury feel, and color correction made the listing look premium.",
    rating: 4,
  },
  {
    name: "Sana Khan",
    role: "Small Business Owner",
    review:
      "The product ad was short, clear, and attractive. The call-to-action and motion text made the video perfect for social media promotion.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Corporate Client",
    review:
      "The corporate video was clean, professional, and well-structured. The typography, pacing, and brand presentation were excellent.",
    rating: 4,
  },
  {
    name: "Karan Patel",
    role: "Documentary Creator",
    review:
      "The documentary edit had strong storytelling, good pacing, and smooth B-roll placement. The sound design improved the overall mood.",
    rating: 5,
  },
  {
    name: "Riya Thomas",
    role: "YouTube Shorts Creator",
    review:
      "The short-form edit was fast, catchy, and retention-focused. Captions, zoom cuts, and music sync made the final video much better.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "How long does it take to edit a video?",
    answer:
      "Delivery time depends on video length and editing style. Short reels usually take 24–48 hours, while YouTube, wedding, or brand videos may take more time.",
  },
  {
    question: "Do you provide revisions?",
    answer:
      "Yes, every package includes revisions. Extra revisions can be discussed depending on the project requirements.",
  },
  {
    question: "How can I send my raw video files?",
    answer:
      "You can send raw files using Google Drive, WeTransfer, Dropbox, or any cloud link. Make sure the footage is clear and properly uploaded.",
  },
  {
    question: "Can you edit Instagram Reels and YouTube Shorts?",
    answer:
      "Yes, I edit Instagram Reels, YouTube Shorts, Facebook Reels, and other short-form videos with hooks, captions, music sync, and fast pacing.",
  },
  {
    question: "Do you edit wedding and event videos?",
    answer:
      "Yes, I can edit cinematic wedding highlights, event aftermovies, birthday videos, engagement videos, and other personal event videos.",
  },
  {
    question: "How do I book a project?",
    answer:
      "Fill the contact form with your name, phone number, service type, and project details. Your message will open directly in WhatsApp.",
  },
];

const quoteBasePrices = {
  "Minimal Reel Editing": 1999,
  "Apple Style Editing": 1499,
  "SaaS Animation Editing": 3999,
  "Product Ad Editing": 1999,
  "Motion Graphics": 1999,
  "Documentary Editing": 3499,
  "Shape Morphing Editing": 2499,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioWebsite />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

function PortfolioWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProjectCategory, setActiveProjectCategory] = useState("All");
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [openProjectGroup, setOpenProjectGroup] = useState(null);
  const [playingVideoKey, setPlayingVideoKey] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const heroVideoRef = useRef(null);
  const showcaseVideoRef = useRef(null);

  const [quoteData, setQuoteData] = useState({
    service: "Instagram Reel Editing",
    length: "short",
    urgency: "normal",
  });

  const [briefData, setBriefData] = useState({
    videoType: "Instagram Reel Editing",
    deadline: "",
    budget: "",
    referenceLink: "",
    footageLink: "",
    details: "",
  });

  const projectCategories = [
    "All",
    ...projectGroups.map((group) => group.category),
  ];

  const filteredProjectGroups = projectGroups.filter((group) => {
    const matchesCategory =
      activeProjectCategory === "All" ||
      group.category === activeProjectCategory;

    const searchText = projectSearch.toLowerCase();

    const matchesSearch =
      group.title.toLowerCase().includes(searchText) ||
      group.category.toLowerCase().includes(searchText) ||
      group.desc.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const getInlineVideoKey = (category, fileName) => {
    return `${category}-${fileName}`.replaceAll(" ", "-").toLowerCase();
  };

  const handleInlineVideoPlay = (videoKey) => {
    setPlayingVideoKey(videoKey);
  };

  useEffect(() => {
    const playShowreelVideos = () => {
      const videos = [heroVideoRef.current, showcaseVideoRef.current];

      videos.forEach((video) => {
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;
        video.controls = false;
        video.playsInline = true;

        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        video.setAttribute("preload", "auto");

        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // iOS may block autoplay until first user interaction.
          });
        }
      });
    };

    playShowreelVideos();

    document.addEventListener("touchstart", playShowreelVideos, {
      once: true,
      passive: true,
    });
    document.addEventListener("click", playShowreelVideos, { once: true });

    return () => {
      document.removeEventListener("touchstart", playShowreelVideos);
      document.removeEventListener("click", playShowreelVideos);
    };
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const skills = [
    "Adobe Premiere Pro",
    "Adobe After Effects",
    "DaVinci Resolve",
    "CapCut Editing",
    "Photoshop Thumbnail Design",
    "Minimal Reels Editing",
    "Documentary Storytelling",
    "Product Advertisement Editing",
    "Motion Graphics",
    "Color Grading",
    "Sound Design",
    "Subtitles & Captions",
    "B-Roll Placement",
    "Cinematic Transitions",
  ];

  const serviceOptions = Object.keys(quoteBasePrices);

  const getQuoteEstimate = () => {
    const base = quoteBasePrices[quoteData.service] || 1499;

    const lengthMultiplier = {
      short: 1,
      medium: 1.45,
      long: 2.15,
    };

    const urgencyExtra = {
      normal: 0,
      fast: 350,
      urgent: 750,
    };

    return Math.round(
      base * lengthMultiplier[quoteData.length] +
        urgencyExtra[quoteData.urgency],
    );
  };

  const handleQuoteChange = (e) => {
    setQuoteData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuoteRequest = () => {
    const estimatedPrice = getQuoteEstimate();

    setForm((prev) => ({
      ...prev,
      service: quoteData.service,
      message: `I want a quote for ${quoteData.service}. Video length: ${quoteData.length}. Delivery: ${quoteData.urgency}. Approx estimate shown: ₹${estimatedPrice}. Please contact me for final pricing.`,
    }));

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 120);
  };

  const handleBriefChange = (e) => {
    setBriefData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBriefSubmit = (e) => {
    e.preventDefault();

    const briefMessage = `Project Brief:
Video Type: ${briefData.videoType}
Deadline: ${briefData.deadline || "Not mentioned"}
Budget: ${briefData.budget || "Not mentioned"}
Reference Link: ${briefData.referenceLink || "Not provided"}
Raw Footage Link: ${briefData.footageLink || "Not provided"}

Project Details:
${briefData.details || "No extra details provided."}`;

    setForm((prev) => ({
      ...prev,
      service: briefData.videoType,
      message: briefMessage,
    }));

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 120);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceSelect = (serviceName) => {
    setForm((prev) => ({
      ...prev,
      service: serviceName,
    }));

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const getServiceFromProjectCategory = (category) => {
    return category || "";
  };

  const handleContact = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/contact`, form);

      const text = `Hello Creative Adil, I want to hire you for video editing.%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}%0AMessage: ${form.message}`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");

      alert("Your message has been saved. WhatsApp is opening now.");

      setForm({
        name: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.log("Contact form error:", error);
      alert("Something went wrong. Please check backend server.");
    }
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        setOpenProjectGroup(null);
        setPlayingVideoKey(null);
      }
    };

    if (selectedProject || openProjectGroup) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscClose);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [selectedProject, openProjectGroup]);

  return (
    <div className="app">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="hero" id="home">
        {showreel && (
          <video
            ref={heroVideoRef}
            className="hero-video"
            autoPlay
            muted
            defaultMuted
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            aria-label="Creative Adil showreel background video"
          >
            <source src={showreel} type="video/mp4" />
          </video>
        )}

        <div className="hero-overlay"></div>

        <div className="hero-layout">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <span className="badge">Professional Video Editor</span>

            <h1>
              I Create Videos That Look Premium, Feel Cinematic & Convert
              Viewers
            </h1>

            <p>
              I am Creative Adil, a video editor focused on reels, YouTube
              videos, wedding films, brand promos, product ads, and cinematic
              storytelling.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn primary">
                View My Work
              </a>

              <a href="#contact" className="btn secondary">
                Hire Me
              </a>

              <a
                href="/files/creative-adil-video-editor-resume.pdf"
                download
                className="btn resume-btn"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-showcase"
            initial={{ opacity: 0, x: 55 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="showcase-card">
              <div className="showcase-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              {showreel ? (
                <video
                  ref={showcaseVideoRef}
                  autoPlay
                  muted
                  defaultMuted
                  loop
                  playsInline
                  preload="auto"
                  controls={false}
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate nofullscreen"
                  aria-label="Creative Adil showreel preview video"
                >
                  <source src={showreel} type="video/mp4" />
                </video>
              ) : (
                <div className="under-process-box">
                  <div className="under-process-content">
                    <span>Showreel Missing</span>
                    <h4>Upload showreel.mp4</h4>
                    <p>
                      Add <strong>showreel.mp4</strong> inside videos folder.
                    </p>
                  </div>
                </div>
              )}

            </div>

            <div className="floating-card card-one">
              <h4>4K</h4>
              <p>Premium Export</p>
            </div>

            <div className="floating-card card-two">
              <h4>50+</h4>
              <p>Videos Edited</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="about section" id="about">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span>About Me</span>
          <h2>Creative Editing With Purpose</h2>
          <p>
            I help creators, brands, businesses, and wedding clients transform
            raw footage into clean, engaging, and professional videos.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3>Why Clients Choose Me</h3>

            <p>
              My editing style focuses on storytelling, smooth pacing, visual
              clarity, sound design, color grading, and platform-focused
              retention.
            </p>

            <div className="stats">
              <div>
                <h4>50+</h4>
                <p>Edited Videos</p>
              </div>

              <div>
                <h4>4K</h4>
                <p>Export Quality</p>
              </div>

              <div>
                <h4>100%</h4>
                <p>Client Focused</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="skill-card"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3>Editing Skills</h3>

            {skills.map((skill) => (
              <div className="skill" key={skill}>
                <span>{skill}</span>
                <div>
                  <b></b>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="benefits section" id="benefits">
        <div className="section-head">
          <span>Benefits</span>

          <h2>Why Clients Should Hire Me</h2>

          <p>
            I focus on quality, speed, communication, and platform-based editing
            so every video looks professional and useful for the client.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <motion.div
              className="benefit-card"
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
            >
              <div className="benefit-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="tools section" id="tools">
        <div className="section-head">
          <span>Tools</span>

          <h2>Editing Software & Creative Tools I Use</h2>

          <p>
            I use professional editing and design tools to create clean,
            cinematic, and client-ready video content.
          </p>
        </div>

        <div className="tools-grid">
          {tools.map((item, index) => (
            <motion.div
              className="tool-card"
              key={item.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
            >
              <div className="tool-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-head">
          <span>Portfolio</span>
          <h2>Industry-Demand Video Project Categories</h2>
          <p>
            Each category is shown as a portfolio card. Click any card to open
            another box where all uploaded videos of that category will appear.
          </p>
        </div>

        <div className="project-filter">
          {projectCategories.map((category) => (
            <button
              key={category}
              className={activeProjectCategory === category ? "active" : ""}
              onClick={() => setActiveProjectCategory(category)}
            >
              {category === "All"
                ? "All"
                : projectGroups.find((group) => group.category === category)
                    ?.shortTitle || category}
            </button>
          ))}
        </div>

        <div className="project-search-row">
          <input
            type="text"
            placeholder="Search project categories by title, category, or style..."
            value={projectSearch}
            onChange={(e) => setProjectSearch(e.target.value)}
          />

          <button
            type="button"
            onClick={() => {
              setProjectSearch("");
              setActiveProjectCategory("All");
            }}
          >
            Reset
          </button>
        </div>

        <div className="project-result-count">
          Showing <strong>{filteredProjectGroups.length}</strong> project
          categor{filteredProjectGroups.length !== 1 ? "ies" : "y"}
        </div>

        {filteredProjectGroups.length === 0 ? (
          <div className="project-empty">
            <h3>No project category found</h3>
            <p>
              Try searching another keyword or reset the project filter to view
              all portfolio categories.
            </p>
          </div>
        ) : (
          <div className="project-grid">
            {filteredProjectGroups.map((group, index) => {
              const groupVideos = getGroupVideos(group.filePrefix);
              const hasVideos = groupVideos.length > 0;
              const firstVideo = hasVideos ? groupVideos[0] : null;
              const firstVideoKey = firstVideo
                ? getInlineVideoKey(group.category, firstVideo.fileName)
                : null;
              const isFirstVideoPlaying =
                firstVideoKey && playingVideoKey === firstVideoKey;
              const firstThumbnail = firstVideo
                ? getThumbnail(group.filePrefix, firstVideo.fileName)
                : null;

              return (
                <motion.div
                  className={
                    hasVideos
                      ? "project-card category-project-card"
                      : "project-card category-project-card under-process-card"
                  }
                  key={group.category}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={
                      hasVideos
                        ? isFirstVideoPlaying
                          ? "video-box inline-video-playing"
                          : "video-box"
                        : "video-box under-process-box"
                    }
                    onClick={() => {
                      if (hasVideos && firstVideoKey) {
                        handleInlineVideoPlay(firstVideoKey);
                      } else {
                        setOpenProjectGroup(group);
                      }
                    }}
                  >
                    {hasVideos ? (
                      <>
                        {isFirstVideoPlaying ? (
                          <video
                            key={firstVideoKey}
                            playsInline
                            autoPlay
                            muted
                            controls={false}
                            disablePictureInPicture
                            controlsList="nodownload noplaybackrate nofullscreen"
                          >
                            <source src={firstVideo.video} type="video/mp4" />
                          </video>
                        ) : firstThumbnail ? (
                          <img
                            src={firstThumbnail}
                            alt={`${group.title} thumbnail`}
                            className="project-thumbnail"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        ) : (
                          <video
                            key={`fallback-thumb-${firstVideoKey}`}
                            preload="metadata"
                            muted
                            playsInline
                            poster=""
                          >
                            <source src={firstVideo.video} type="video/mp4" />
                          </video>
                        )}

                        {!isFirstVideoPlaying && (
                          <div className="video-hover">
                            <Play size={24} />
                            <span>Click to Play</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="under-process-content">
                        <span>Under Process</span>
                        <h4>Videos Coming Soon</h4>
                        <p>
                          Upload <strong>{group.filePrefix}.mp4</strong> or{" "}
                          <strong>{group.filePrefix}1.mp4</strong> to activate.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="project-info">
                    <span>{group.category}</span>
                    <h3>{group.title}</h3>
                    <p>{group.desc}</p>

                    <button
                      type="button"
                      className="project-hire-btn"
                      onClick={() => setOpenProjectGroup(group)}
                    >
                      {hasVideos
                        ? `View ${groupVideos.length} Video${
                            groupVideos.length !== 1 ? "s" : ""
                          }`
                        : "Under Process"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <section className="services section" id="services">
        <div className="section-head">
          <span>Services</span>
          <h2>Freelancing Services I Offer</h2>
          <p>
            Choose the service you need and contact me directly for your video
            project.
          </p>
        </div>

        <div className="service-grid">
          {services.map((item, index) => (
            <motion.div
              className="service-card"
              key={item.title}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <div className="service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <button
                type="button"
                className="service-select-btn"
                onClick={() => handleServiceSelect(item.title)}
              >
                Select Service
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="process section" id="process">
        <div className="section-head">
          <span>Process</span>
          <h2>My Professional Editing Workflow</h2>
          <p>
            A simple and clear workflow helps clients understand how their raw
            footage becomes a polished final video.
          </p>
        </div>

        <div className="process-grid">
          {processSteps.map((item, index) => (
            <motion.div
              className="process-card"
              key={item.step}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pricing section" id="pricing">
        <div className="section-head">
          <span>Pricing</span>
          <h2>Simple Packages for Freelance Clients</h2>
          <p>
            Choose a service package based on your video type. Final pricing can
            change depending on video length, editing style, deadline, and
            project complexity.
          </p>
        </div>

        <div className="pricing-grid">
          {pricingPackages.map((item, index) => (
            <motion.div
              className="pricing-card"
              key={item.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <span className="pricing-tag">{item.tag}</span>
              <h3>{item.name}</h3>
              <h4>{item.price}</h4>

              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <button
                type="button"
                className="pricing-btn"
                onClick={() => handleServiceSelect(item.name)}
              >
                Choose Package
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="client-brief section" id="brief">
        <div className="section-head">
          <span>Project Brief</span>

          <h2>Tell Me About Your Video Project</h2>

          <p>
            Fill this quick project brief so I can understand your video type,
            deadline, budget, reference style, raw footage, and editing
            requirement.
          </p>
        </div>

        <motion.form
          className="brief-form"
          onSubmit={handleBriefSubmit}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <div className="brief-grid">
            <div className="brief-field">
              <label>Video Type</label>
              <select
                name="videoType"
                value={briefData.videoType}
                onChange={handleBriefChange}
                required
              >
                {serviceOptions.map((service) => (
                  <option value={service} key={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="brief-field">
              <label>Deadline</label>
              <input
                type="text"
                name="deadline"
                placeholder="Example: 2 days / 1 week / urgent"
                value={briefData.deadline}
                onChange={handleBriefChange}
              />
            </div>

            <div className="brief-field">
              <label>Budget</label>
              <input
                type="text"
                name="budget"
                placeholder="Example: ₹1000 - ₹3000"
                value={briefData.budget}
                onChange={handleBriefChange}
              />
            </div>

            <div className="brief-field">
              <label>Reference Video Link</label>
              <input
                type="url"
                name="referenceLink"
                placeholder="Paste Instagram / YouTube reference link"
                value={briefData.referenceLink}
                onChange={handleBriefChange}
              />
            </div>

            <div className="brief-field full">
              <label>Raw Footage Link</label>
              <input
                type="url"
                name="footageLink"
                placeholder="Paste Google Drive / Dropbox / WeTransfer link"
                value={briefData.footageLink}
                onChange={handleBriefChange}
              />
            </div>

            <div className="brief-field full">
              <label>Project Details</label>
              <textarea
                name="details"
                placeholder="Tell me your editing style, video length, platform, captions, music, color style, and special requirements..."
                value={briefData.details}
                onChange={handleBriefChange}
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="brief-submit-btn">
            <Send size={18} />
            Add Brief to Contact Form
          </button>
        </motion.form>
      </section>

      <section className="quote-section section" id="quote">
        <div className="section-head">
          <span>Quick Quote</span>

          <h2>Estimate Your Video Editing Cost</h2>

          <p>
            Select your project type, video length, and delivery speed to get a
            quick starting estimate before contacting me.
          </p>
        </div>

        <div className="quote-grid">
          <motion.div
            className="quote-card"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <div className="quote-icon">
              <Calculator />
            </div>

            <h3>Quick Price Estimator</h3>

            <p>
              This is an approximate estimate. Final pricing depends on raw
              footage quality, editing complexity, deadline, and revisions.
            </p>

            <div className="quote-form">
              <label>Service Type</label>
              <select
                name="service"
                value={quoteData.service}
                onChange={handleQuoteChange}
              >
                {serviceOptions.map((service) => (
                  <option value={service} key={service}>
                    {service}
                  </option>
                ))}
              </select>

              <label>Video Length</label>
              <select
                name="length"
                value={quoteData.length}
                onChange={handleQuoteChange}
              >
                <option value="short">Short / Reel / Under 1 minute</option>
                <option value="medium">Medium / 3 to 8 minutes</option>
                <option value="long">Long / 10+ minutes</option>
              </select>

              <label>Delivery Speed</label>
              <select
                name="urgency"
                value={quoteData.urgency}
                onChange={handleQuoteChange}
              >
                <option value="normal">Normal Delivery</option>
                <option value="fast">Fast Delivery</option>
                <option value="urgent">Urgent Delivery</option>
              </select>
            </div>
          </motion.div>

          <motion.div
            className="quote-result-card"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <span>Estimated Starting Price</span>

            <h3>₹{getQuoteEstimate()}</h3>

            <p>
              This is a starting estimate for <b>{quoteData.service}</b>. You
              can request a final quote by sending your details through the
              contact form.
            </p>

            <div className="quote-summary">
              <div>
                <strong>Service</strong>
                <small>{quoteData.service}</small>
              </div>

              <div>
                <strong>Length</strong>
                <small>{quoteData.length}</small>
              </div>

              <div>
                <strong>Delivery</strong>
                <small>{quoteData.urgency}</small>
              </div>
            </div>

            <button
              type="button"
              className="quote-request-btn"
              onClick={handleQuoteRequest}
            >
              Send Quote Request
            </button>
          </motion.div>
        </div>
      </section>

      <section className="reviews section" id="reviews">
        <div className="section-head">
          <span>Reviews</span>
          <h2>What Clients Say About My Editing</h2>
          <p>
            Client feedback helps build trust and shows the quality,
            communication, and editing style I deliver in every project.
          </p>
        </div>

        <div className="reviews-grid">
          {testimonials.map((item, index) => (
            <motion.div
              className="review-card"
              key={item.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <div className="quote-icon">
                <Quote size={24} />
              </div>

              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < item.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <p className="review-text">"{item.review}"</p>

              <div className="review-user">
                <div>
                  <h3>{item.name}</h3>
                  <span>{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="section-head">
          <span>FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>
            Here are some common questions clients usually ask before starting a
            video editing project.
          </p>
        </div>

        <div className="faq-accordion">
          {faqs.map((item, index) => (
            <motion.div
              className={
                openFaqIndex === index ? "faq-item active" : "faq-item"
              }
              key={item.question}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() =>
                  setOpenFaqIndex(openFaqIndex === index ? null : index)
                }
              >
                <span>{item.question}</span>
                <ChevronDown size={20} />
              </button>

              {openFaqIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="cta-section section" id="cta">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <span className="cta-badge">
              <CalendarCheck size={17} />
              Available for Freelance Projects
            </span>

            <h2>Have Raw Footage? Let’s Turn It Into a Professional Video</h2>

            <p>
              Whether you need reels, YouTube videos, wedding highlights,
              product ads, documentary edits, corporate videos, or real estate
              walkthroughs — I can help you create clean, cinematic, and
              client-ready videos.
            </p>

            <div className="cta-points">
              <div>
                <Zap size={18} />
                Fast delivery
              </div>

              <div>
                <BadgeCheck size={18} />
                Premium quality
              </div>

              <div>
                <MessageCircle size={18} />
                WhatsApp support
              </div>
            </div>
          </div>

          <div className="cta-actions">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello Creative Adil, I want to discuss a video editing project.",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="cta-whatsapp"
            >
              <MessageCircle size={19} />
              Discuss on WhatsApp
            </a>

            <a href="#contact" className="cta-contact">
              Fill Contact Form
            </a>
          </div>
        </motion.div>
      </section>

      <section className="contact section" id="contact">
        <div className="section-head">
          <span>Contact</span>
          <h2>Let’s Work Together</h2>
          <p>
            Fill the form and your project message will open directly in
            WhatsApp.
          </p>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3>Hire Creative Adil</h3>
            <p>
              Tell me your video type, deadline, style reference, and platform.
              I will help you create a clean and professional final video.
            </p>

            <div className="contact-line">
              <Phone size={18} />
              <span>WhatsApp Available</span>
            </div>

            <div className="contact-line">
              <Mail size={18} />
              <span>adilkhankhan2003@gmail.com</span>
            </div>

            <div className="contact-line">
              <MapPin size={18} />
              <span>Lucknow, India</span>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleContact}
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Select Service</option>
              {serviceOptions.map((service) => (
                <option value={service} key={service}>
                  {service}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">
              <Send size={18} />
              Send on WhatsApp
            </button>
          </motion.form>
        </div>
      </section>

      {openProjectGroup && (
        <div
          className="video-modal"
          onClick={() => {
            setOpenProjectGroup(null);
            setPlayingVideoKey(null);
          }}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal-close"
              onClick={() => {
                setOpenProjectGroup(null);
                setPlayingVideoKey(null);
              }}
            >
              <X size={22} />
            </button>

            <div className="video-modal-info">
              <span>{openProjectGroup.category}</span>
              <h3>{openProjectGroup.title}</h3>
              <p>{openProjectGroup.desc}</p>

              <button
                type="button"
                className="modal-hire-btn"
                onClick={() => {
                  const selectedService = getServiceFromProjectCategory(
                    openProjectGroup.category,
                  );

                  setOpenProjectGroup(null);
                  setPlayingVideoKey(null);

                  setTimeout(() => {
                    handleServiceSelect(selectedService);
                  }, 150);
                }}
              >
                Hire for this category
              </button>
            </div>

            {getGroupVideos(openProjectGroup.filePrefix).length > 0 ? (
              <div className="nested-project-grid modal-project-grid">
                {getGroupVideos(openProjectGroup.filePrefix).map(
                  (videoItem, videoIndex) => {
                    const currentProject = {
                      title: `${openProjectGroup.title} ${videoIndex + 1}`,
                      category: openProjectGroup.category,
                      desc: openProjectGroup.desc,
                      videoFile: videoItem.fileName,
                    };
                    const videoKey = getInlineVideoKey(
                      openProjectGroup.category,
                      videoItem.fileName,
                    );
                    const isVideoPlaying = playingVideoKey === videoKey;
                    const videoThumbnail = getThumbnail(
                      openProjectGroup.filePrefix,
                      videoItem.fileName,
                    );

                    return (
                      <div
                        className="nested-project-card"
                        key={videoItem.fileName}
                      >
                        <div
                          className={
                            isVideoPlaying
                              ? "video-box inline-video-playing"
                              : "video-box"
                          }
                          onClick={() => handleInlineVideoPlay(videoKey)}
                        >
                          {isVideoPlaying ? (
                            <video
                              key={videoKey}
                              playsInline
                              controls
                              autoPlay
                              controlsList="nodownload"
                            >
                              <source src={videoItem.video} type="video/mp4" />
                            </video>
                          ) : videoThumbnail ? (
                            <img
                              src={videoThumbnail}
                              alt={`${currentProject.title} thumbnail`}
                              className="project-thumbnail"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          ) : (
                            <video
                              key={`fallback-thumb-${videoKey}`}
                              preload="metadata"
                              muted
                              playsInline
                              poster=""
                            >
                              <source src={videoItem.video} type="video/mp4" />
                            </video>
                          )}

                          {!isVideoPlaying && (
                            <div className="video-hover">
                              <Play size={24} />
                              <span>Click to Play</span>
                            </div>
                          )}
                        </div>

                        <div className="project-info">
                          <span>{openProjectGroup.category}</span>
                          <h3>{currentProject.title}</h3>
                          <p>{videoItem.fileName}</p>

                          <button
                            type="button"
                            className="project-hire-btn"
                            onClick={() =>
                              handleServiceSelect(openProjectGroup.category)
                            }
                          >
                            Hire for this type
                          </button>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            ) : (
              <div className="under-process-box group-under-process">
                <div className="under-process-content">
                  <span>Under Process</span>
                  <h4>Videos Coming Soon</h4>
                  <p>
                    Upload files like{" "}
                    <strong>{openProjectGroup.filePrefix}.mp4</strong>,{" "}
                    <strong>{openProjectGroup.filePrefix}1.mp4</strong>,{" "}
                    <strong>{openProjectGroup.filePrefix}2.mp4</strong> inside
                    videos folder. They will automatically appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedProject && getVideo(selectedProject.videoFile) && (
        <div
          className="video-modal"
          onClick={() => {
            setSelectedProject(null);
            setPlayingVideoKey(null);
          }}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal-close"
              onClick={() => {
                setSelectedProject(null);
                setPlayingVideoKey(null);
              }}
            >
              <X size={22} />
            </button>

            <div className="video-modal-info">
              <span>{selectedProject.category}</span>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.desc}</p>

              <button
                type="button"
                className="modal-hire-btn"
                onClick={() => {
                  const selectedService = getServiceFromProjectCategory(
                    selectedProject.category,
                  );

                  setSelectedProject(null);

                  setTimeout(() => {
                    handleServiceSelect(selectedService);
                  }, 150);
                }}
              >
                Hire for this video style
              </button>
            </div>

            <video
              autoPlay
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
            >
              <source
                src={getVideo(selectedProject.videoFile)}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      )}

      <FloatingActions />
      <Footer />
    </div>
  );
}

function AdminDashboard() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("creativeAdilAdmin") === "true",
  );

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statusOptions = [
    "New Lead",
    "Contacted",
    "In Progress",
    "Completed",
    "Rejected",
  ];

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (
      loginData.username === "admin" &&
      loginData.password === "creative123"
    ) {
      localStorage.setItem("creativeAdilAdmin", "true");
      setIsAdminLoggedIn(true);
    } else {
      alert("Wrong username or password");
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("creativeAdilAdmin");
    setIsAdminLoggedIn(false);
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/leads`);
      setLeads(res.data.data || []);
    } catch (error) {
      console.log("Error fetching leads:", error);
      alert("Backend server is not running or leads API failed.");
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/leads/${id}/status`, {
        status,
      });

      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? { ...lead, status } : lead)),
      );
    } catch (error) {
      console.log("Status update error:", error);
      alert("Status update failed.");
    }
  };

  const deleteLead = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/leads/${id}`);

      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (error) {
      console.log("Delete lead error:", error);
      alert("Lead delete failed.");
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      lead.name?.toLowerCase().includes(searchText) ||
      lead.phone?.toLowerCase().includes(searchText) ||
      lead.service?.toLowerCase().includes(searchText) ||
      lead.message?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportLeadsToCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = ["Name", "Phone", "Service", "Message", "Status", "Date"];

    const rows = filteredLeads.map((lead) => [
      lead.name || "",
      lead.phone || "",
      lead.service || "",
      lead.message || "",
      lead.status || "New Lead",
      lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "creative-adil-client-leads.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchLeads();
    }
  }, [isAdminLoggedIn]);

  if (!isAdminLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <span className="admin-badge">Protected Area</span>
          <h1>Admin Login</h1>
          <p>
            Login to manage client leads, update project status, and reply on
            WhatsApp.
          </p>

          <form onSubmit={handleAdminLogin} className="admin-login-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <button type="submit">Login to Dashboard</button>
          </form>

          <Link to="/" className="admin-login-back">
            <ArrowLeft size={18} />
            Back to Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <span className="admin-badge">Admin Dashboard</span>
          <h1>Client Leads</h1>
          <p>Search, filter, manage inquiries, and reply on WhatsApp.</p>
        </div>

        <div className="admin-actions">
          <Link to="/" className="admin-btn secondary-admin">
            <ArrowLeft size={18} />
            Back to Website
          </Link>

          <button className="admin-btn" onClick={fetchLeads}>
            <RefreshCcw size={18} />
            Refresh
          </button>

          <button className="admin-btn export-admin" onClick={exportLeadsToCSV}>
            <Download size={18} />
            Export CSV
          </button>

          <button
            className="admin-btn logout-admin"
            onClick={handleAdminLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <Users />
          <div>
            <h3>{leads.length}</h3>
            <p>Total Leads</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <MessageCircle />
          <div>
            <h3>{leads.filter((lead) => lead.status === "New Lead").length}</h3>
            <p>New Leads</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <Briefcase />
          <div>
            <h3>
              {leads.filter((lead) => lead.status === "In Progress").length}
            </h3>
            <p>In Progress</p>
          </div>
        </div>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search by name, phone, service, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          {statusOptions.map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="admin-empty">Loading leads...</div>
      ) : filteredLeads.length === 0 ? (
        <div className="admin-empty">No matching leads found.</div>
      ) : (
        <div className="leads-grid">
          {filteredLeads.map((lead) => (
            <div className="lead-card" key={lead._id}>
              <div className="lead-top">
                <div>
                  <h3>{lead.name}</h3>
                  <p>{lead.service}</p>
                </div>

                <span
                  className={`status-pill ${lead.status
                    ?.toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {lead.status || "New Lead"}
                </span>
              </div>

              <div className="lead-info">
                <p>
                  <strong>Phone:</strong> {lead.phone}
                </p>

                <p>
                  <strong>Message:</strong> {lead.message}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {lead.createdAt
                    ? new Date(lead.createdAt).toLocaleString()
                    : "Not available"}
                </p>
              </div>

              <div className="lead-status-box">
                <label>Update Status</label>

                <select
                  value={lead.status || "New Lead"}
                  onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lead-actions">
                <a
                  className="whatsapp-lead-btn"
                  href={`https://wa.me/91${lead.phone}?text=Hello ${lead.name}, I received your message for ${lead.service}.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  Reply
                </a>

                <button
                  className="delete-lead-btn"
                  onClick={() => deleteLead(lead._id)}
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FloatingActions() {
  const whatsappText =
    "Hello Creative Adil, I want to discuss a video editing project.";

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-actions">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          whatsappText,
        )}`}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} />
      </a>

      <button
        className="floating-top"
        onClick={handleScrollTop}
        aria-label="Back to top"
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  const [moreOpen, setMoreOpen] = useState(false);

  const mainLinks = ["home", "about", "projects", "services", "pricing"];

  const moreLinks = [
    "benefits",
    "tools",
    "process",
    "brief",
    "quote",
    "reviews",
    "faq",
    "cta",
    "contact",
  ];

  const closeMenus = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  return (
    <nav className="navbar">
      <a href="#home" className="logo" onClick={closeMenus}>
        Creative <span>Adil</span>
      </a>

      <div className={menuOpen ? "nav-links active" : "nav-links"}>
        {mainLinks.map((link) => (
          <a key={link} href={`#${link}`} onClick={closeMenus}>
            {link}
          </a>
        ))}

        <div className={moreOpen ? "more-menu active" : "more-menu"}>
          <button
            type="button"
            className="more-btn"
            onClick={() => setMoreOpen(!moreOpen)}
          >
            More
            <span>▾</span>
          </button>

          <div className="more-dropdown">
            {moreLinks.map((link) => (
              <a key={link} href={`#${link}`} onClick={closeMenus}>
                {link}
              </a>
            ))}
          </div>
        </div>

        <Link to="/admin" className="admin-nav-link" onClick={closeMenus}>
          Admin
        </Link>
      </div>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h2>
          Creative <span>Adil</span>
        </h2>

        <p>
          Professional video editing portfolio for creators, businesses,
          weddings, reels, YouTube, and advertisements.
        </p>
      </div>

      <div className="socials">
        <a href="#projects">
          <Camera />
        </a>

        <a href="#projects">
          <Video />
        </a>

        <a href="#services">
          <Briefcase />
        </a>

        <a href="#contact">
          <MessageCircle />
        </a>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} Creative Adil. All rights reserved.
      </p>
    </footer>
  );
}

export default App;

'use client';
import { useState, useRef, useEffect } from "react";

export default function HomePage() {
    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef<HTMLDivElement | null>(null);

    // Scroll to video when it's shown
    useEffect(() => {
        if (showVideo && videoRef.current) {
            videoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [showVideo]);
    return (
        <main>
            <div className="introBox">
                <h2>Brief intro to the web</h2>
                <p>
                    {`Hi, warriors!

            Welcome to your Smart Question Bank – your secret weapon for conquering the exams.

            Here you can find our original ib style questions and real past paper questions. It's also your personal training ground with smart diagnosis. Every question you practice is analyzed to pinpoint your exact strengths and weaknesses.

            Forget generic studying. Focus your energy where it matters most, turn weaknesses into strengths, and walk into your exams with unshakable confidence.

            Your journey to a 45 starts here. Let's get to work.`}
                </p>
            </div>

            <div className="thingsBox">
                <h2>⚠️ Something you need to know...</h2>
                <ol>
                    <li>
                        <button
                            onClick={() => setShowVideo(prev => !prev)}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer"
                            }}
                        >
                            Mobile display support
                        </button>
                    </li>
                    <li>
                        Click on
                        <img
                            src="/profile-user.png"
                            alt="icon"
                            style={{
                                width: "17px",
                                height: "17px",
                                verticalAlign: "middle",
                                marginLeft: "5px",
                                marginRight: "5px"
                            }}
                        />
                        you can see marked questions and practice analysis
                    </li>
                    <li>
                        Get started by clicking <strong>Chapter</strong>
                    </li>
                </ol>

                {/* 👇 Video inside green box with scroll target */}
                {showVideo && (
                    <div
                        ref={videoRef}
                        style={{ marginTop: "20px", textAlign: "center" }}
                    >
                        <p style={{ marginBottom: "10px", fontStyle: "italic", color: "#333" }}>
                            💡 On mobile devices, you can scroll sideways to view very long formulas.
                        </p>
                        <video
                            controls
                            autoPlay
                            muted
                            style={{ width: "80%", maxWidth: "600px", borderRadius: "8px" }}
                        >
                            <source src="/Demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
        </main>
    );
}

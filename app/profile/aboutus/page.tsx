"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ziji from '../../../public/ziji.jpg';
import Haren from '../../../public/Haren.jpg';
import jinkai from '../../../public/Jinkai.jpg';

const AboutUs = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Calculate if 3 columns of 180px + gaps + padding would fit
      const minWidthFor3Columns = (180 * 3) + (32 * 2) + (48 * 2) + (24 * 2); // images + gaps + padding + margin
      setIsMobile(window.innerWidth < minWidthFor3Columns);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const teamMembers = [
    {
      name: "Ziji Hu",
      role: "Director",
      bio: "Math Olympiad winner. Combinatorics enthusiast about creating interesting math puzzles. ",
      emoji: "",
      image: ziji
    },
    {
      name: "Haren Wang",
      role: "Developer",
      bio: "Software developer focused on automation and creating technology that simplies everyday tasks.",
      emoji: "",
      image: Haren
    },
    {
      name: "Jinkai Chen",
      role: "Developer",
      bio: "Software developer driven by problem solving, with a strong mathematical mindset and a focus on building technically robust solutions.",
      emoji: "",
      image: jinkai
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('zacharyhu321@gmail.com');
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  return (
    <div style={styles.container}>
      {/* 8rem blank space from the top */}
      <div style={{ height: '8rem' }}></div>
      
      <div style={styles.content}>
        <h1 style={isMobile ? styles.mobileTitle : styles.title}>
          About Our Learning Journey
        </h1>
        <p style={styles.subtitle}>Empowering students with quality educational resources</p>
        
        <div style={styles.teamSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Meet Our Team
              <span style={styles.teamEmoji}> 👨‍🏫👩‍💻</span>
            </h2>
            <div style={styles.titleUnderline}></div>
          </div>
          
          {isMobile ? (
            // Mobile slider view
            <div style={styles.sliderContainer}>
              <div style={styles.slider}>
                <div style={styles.slide}>
                  <div style={styles.memberImage}>
                    <Image 
                      src={teamMembers[currentSlide].image} 
                      alt={teamMembers[currentSlide].name}
                      width={180}
                      height={180}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={styles.memberEmoji}>{teamMembers[currentSlide].emoji}</div>
                  </div>
                  <div style={styles.memberInfo}>
                    <h3 style={styles.memberName}>{teamMembers[currentSlide].name}</h3>
                    <p style={styles.memberRole}>{teamMembers[currentSlide].role}</p>
                    <p style={styles.memberBio}>{teamMembers[currentSlide].bio}</p>
                  </div>
                </div>
              </div>
              
              <div style={styles.sliderControls}>
                <button style={styles.sliderButton} onClick={prevSlide}>◀</button>
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    style={index === currentSlide ? styles.activeDot : styles.dot}
                    onClick={() => goToSlide(index)}
                  />
                ))}
                <button style={styles.sliderButton} onClick={nextSlide}>▶</button>
              </div>
            </div>
          ) : (
            // Desktop grid view
            <div style={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <div key={index} style={styles.teamMember}>
                  <div style={styles.memberImage}>
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={180}
                      height={180}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={styles.memberEmoji}>{member.emoji}</div>
                  </div>
                  <div style={styles.memberInfo}>
                    <h3 style={styles.memberName}>{member.name}</h3>
                    <p style={styles.memberRole}>{member.role}</p>
                    <p style={styles.memberBio}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div style={styles.teamDescription}>
            <p style={styles.paragraph}>
              Welcome to SmartQB! We are a team of three students at University of Waterloo, dedicated to creating high-quality and free learning resources 
              for IB students. Our mission is to make studying more effective and enjoyable by providing 
              well-organized, curriculum-aligned IB style questions that help students master their subjects. 
            </p>
            <p style={styles.paragraph}>
              WANNA JOIN US? Contact me through the following email!
            </p>
          </div>
          
          <div style={styles.featuresGrid}>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>🎯</span>
              <span>Curriculum-Aligned</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>⚡</span>
              <span>Effective Learning</span>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>🤝</span>
              <span>Totally Free</span>
            </div>
          </div>
        </div>
        
        <div style={styles.contactSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Get in Touch
              <span style={styles.contactEmoji}> 💌</span>
            </h2>
            <div style={styles.titleUnderline}></div>
          </div>
          
          <p style={styles.contactText}>
            Wanna join my team? 
          </p>
          <p style={styles.contactText}>
            Wanna discuss math with me? 
          </p>
          <p style={styles.contactText}>
            Have questions or feedback? 
          </p>
          <p style={styles.contactText}>
            Feel free to reach out to us at any time! We would love to hear from you.
          </p>
          
          <div style={styles.emailContainer}>
            <div style={styles.emailIcon}>📧</div>
            <button 
              onClick={copyEmail}
              style={styles.emailLink}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.color = '#ff7b9c';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.color = '#4a6fa5';
              }}
            >
              zacharyhu321@gmail.com
            </button>
            {showCopied && (
              <div style={styles.copiedNotification}>
                Copied! ✓
              </div>
            )}
          </div>
          
          <p style={styles.responseNote}>
            We typically respond to all inquiries within 24 hours on weekdays.
          </p>
          
          <div style={styles.socialLinks}>
            <span style={styles.socialText}>Follow my insta: </span>
            <a href="https://www.instagram.com/ziji_hu321?igsh=N2xsaDVuOThldjZh" style={styles.socialLink}>@ziji_hu321</a>
          </div>
        </div>
        
        <div style={styles.funFact}>
          <div style={styles.funFactIcon}>💡学而不思则罔，思而不学则殆</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    fontFamily: "'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    minHeight: '100vh',
  },
  content: {
    paddingBottom: '3rem',
  },
  title: {
    textAlign: 'center' as const,
    color: '#4a6fa5',
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    fontWeight: '800',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  mobileTitle: {
    textAlign: 'center' as const,
    color: '#4a6fa5',
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    fontWeight: '800',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  titleEmoji: {
    fontSize: '2rem',
  },
  subtitle: {
    textAlign: 'center' as const,
    color: '#6c757d',
    fontSize: '1.2rem',
    marginBottom: '3rem',
    fontWeight: '400',
  },
  teamSection: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2.5rem',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
  },
  sectionHeader: {
    marginBottom: '2rem',
    textAlign: 'center' as const,
  },
  sectionTitle: {
    color: '#5d87bb',
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    fontWeight: '700',
  },
  teamEmoji: {
    fontSize: '1.5rem',
  },
  contactEmoji: {
    fontSize: '1.5rem',
  },
  titleUnderline: {
    height: '4px',
    width: '60px',
    backgroundColor: '#ffb8c6',
    borderRadius: '2px',
    margin: '0 auto',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    marginBottom: '2rem',
  },
  teamMember: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: '#f7f9ff',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  },
  memberImage: {
    width: '180px',
    height: '180px',
    backgroundColor: '#f0f4ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '4px solid #c2d0ff',
    color: '#8fa0c8',
    fontStyle: 'italic',
    textAlign: 'center' as const,
    padding: '0',
    boxSizing: 'border-box' as const,
    position: 'relative' as const,
    marginBottom: '1.5rem',
    overflow: 'hidden' as const,
  },
  memberEmoji: {
    position: 'absolute' as const,
    bottom: '-10px',
    right: '-10px',
    fontSize: '2rem',
    backgroundColor: '#fff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontStyle: 'normal',
  },
  memberInfo: {
    textAlign: 'center' as const,
  },
  memberName: {
    color: '#4a6fa5',
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  memberRole: {
    color: '#ff7b9c',
    fontWeight: '500',
    marginBottom: '0.8rem',
    fontSize: '0.95rem',
  },
  memberBio: {
    color: '#6c757d',
    lineHeight: '1.5',
    fontSize: '0.9rem',
  },
  sliderContainer: {
    position: 'relative' as const,
    marginBottom: '2rem',
  },
  slider: {
    overflow: 'hidden',
    borderRadius: '12px',
  },
  slide: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: '#f7f9ff',
    borderRadius: '12px',
  },
  sliderControls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.5rem',
    gap: '0.8rem',
  },
  sliderButton: {
    backgroundColor: '#5d87bb',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    border: 'none',
    cursor: 'pointer',
  },
  activeDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#5d87bb',
    border: 'none',
    cursor: 'pointer',
  },
  teamDescription: {
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  },
  paragraph: {
    marginBottom: '1.2rem',
    fontSize: '1.1rem',
    lineHeight: '1.7',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  featureItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '0.8rem',
    backgroundColor: '#f7f9ff',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
  },
  contactSection: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  contactText: {
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  emailContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: '1rem 1.8rem',
    borderRadius: '50px',
    margin: '1rem 0',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
  },
  emailIcon: {
    fontSize: '1.5rem',
    marginRight: '0.8rem',
  },
  emailLink: {
    color: '#4a6fa5',
    fontSize: '1.2rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    font: 'inherit',
  },
  copiedNotification: {
    position: 'absolute' as const,
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '500',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    animation: 'fadeInOut 2s ease-in-out',
  },
  responseNote: {
    fontStyle: 'italic',
    color: '#6c757d',
    marginTop: '1.5rem',
    fontSize: '0.95rem',
  },
  socialLinks: {
    marginTop: '1.5rem',
  },
  socialText: {
    marginRight: '0.8rem',
    color: '#6c757d',
  },
  socialLink: {
    margin: '0 0.5rem',
    color: '#5d87bb',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  funFact: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff4e6',
    padding: '1.2rem',
    borderRadius: '12px',
    borderLeft: '4px solid #ffb8c6',
  },
  funFactIcon: {
    fontSize: '1.8rem',
    marginRight: '1rem',
  },
};

export default AboutUs;
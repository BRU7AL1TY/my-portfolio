import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import './App.css';

function App() {
    const [activeSection, setActiveSection] = useState(null);
    const [showCV, setShowCV] = useState(false);
    const [activeProject, setActiveProject] = useState(null);

    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleContactFormChange = (e) => {
        const {name, value} = e.target;
        setContactForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleContactFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', contactForm);
        setFormSubmitted(true);

        setContactForm({
            name: '',
            email: '',
            message: ''
        });

        setTimeout(() => setFormSubmitted(false), 5000);
    };

    const projects = [
        {id: 1, title: 'PROJECT 001', description: 'Details about Project 001 in the future.'},
        {id: 2, title: 'PROJECT 002', description: 'Details about Project 002 in the future.'},
        {id: 3, title: 'PROJECT 003', description: 'Details about Project 003 in the future.'},
    ];

    const scrollToSection = (offset) => {
        const sections = document.querySelectorAll('.section');
        let currentSectionIndex = 0;

        sections.forEach((section, index) => {
            if (section.getBoundingClientRect().top <= window.innerHeight / 2) {
                currentSectionIndex = index;
            }
        });

        const nextSectionIndex = currentSectionIndex + offset;
        if (nextSectionIndex >= 0 && nextSectionIndex < sections.length) {
            sections[nextSectionIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    const handleDotClick = (e, sectionId) => {
        e.preventDefault();
        const targetSection = document.getElementById(sectionId);
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section');
            const dots = document.querySelectorAll('.sidebar .dot');

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    setActiveSection(index);
                }
            });

            dots.forEach((dot, index) => {
                dot.style.backgroundColor = index === activeSection ? '#b8860b' : '#000';
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeSection]);

    useEffect(() => {
        const handleWheel = debounce((e) => {
            if (e.deltaY > 0) {
                scrollToSection(1);
            } else {
                scrollToSection(-1);
            }
        }, 100);

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const toggleCV = () => {
        setShowCV((prevState) => !prevState);
    };

    const openProjectModal = (project) => {
        setActiveProject(project);
    };

    const closeProjectModal = () => {
        setActiveProject(null);
    };

    useEffect(() => {
        if (showCV || activeProject) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [showCV, activeProject]);

    return (
        <div>
            {/* Sidebar */}
            <nav className="sidebar">
                <ul>
                    {['Home', 'About Me', 'Projects', 'Contact'].map((section, index) => (
                        <li key={section}>
                            <a
                                href={`#${section.toLowerCase().replace(' ', '')}`}
                                className="dot"
                                onClick={(e) => handleDotClick(e, section.toLowerCase().replace(' ', ''))}
                            ></a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Home Section */}
            <section id="home" className="section">
                <div className="description">
                    <h1>Donabursky</h1>
                    <p>Future Front End Developer</p>
                </div>
            </section>

            {/* About Me Section */}
            <section id="aboutme" className="section">
                <h2>About Me</h2>
                <div className="aboutme">
                    <p>
                        I am a student of computer science at Merito School of Banking, specializing in front-end development. I have experience in the IT industry, gained in various positions, from technical support to software development. I am currently working as an IT Specialist, where I deal with technical support and infrastructure maintenance. Previously, I gained work experience as a back-end developer intern and junior IT specialist.
                    </p>
                    <span
                        onClick={(e) => {
                            e.preventDefault(); // Zapobiega przewinięciu strony
                            toggleCV();
                        }}
                        className="aboutme-span"
                    >Curriculum Vitae</span>

                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section">
                <h2>Projects</h2>
                <div className="projects">
                    {projects.map((project) => (
                        <p key={project.id} className="project-item" onClick={() => openProjectModal(project)}>
                            {project.title}
                        </p>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section">
                <h3>Contact</h3>
                <div className="contact-container">
                    {/* Formularz kontaktowy */}
                    <form className="contact-form" onSubmit={handleContactFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={contactForm.name}
                                onChange={handleContactFormChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={contactForm.email}
                                onChange={handleContactFormChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={contactForm.message}
                                onChange={handleContactFormChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">Send Message</button>
                    </form>

                    {/* Linki do GitHub i LinkedIn */}
                    <div className="social-links">
                        <a
                            href="https://github.com/BRU7AL1TY"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <img src="/images/github.svg" alt="GitHub" className="social-icon" />
                            <span className="social-text">GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/donabursky/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <img src="/images/linkedin.svg" alt="LinkedIn" className="social-icon" />
                            <span className="social-text">LinkedIn</span>
                        </a>
                    </div>
                </div>
                <footer>© 2024 donabursky</footer>
            </section>

            {/* CV Modal */}
            {showCV && (
                <>
                    <div className="modal-overlay" onClick={toggleCV}></div>
                    <button className="close-button-fixed" onClick={toggleCV}>
                        &times;
                    </button>
                    <div className="modal">
                        <div className="cv-container">
                            <div className="header">
                                <h5>Maciej Donaburski</h5>
                            </div>
                            <div className="picture">
                                <img src="profile.jpeg" alt="profile"/>
                            </div>
                            <div className="section-profile">
                                <h6>Profil zawodowy</h6>
                                <p>
                                    Jestem studentem informatyki na Wyższej Szkole Bankowej Merito, specjalizującym się
                                    w front-end developmencie. Posiadam doświadczenie w branży IT, zdobyte na różnych
                                    stanowiskach, od obsługi technicznej po rozwój oprogramowania. Obecnie pracuję jako
                                    IT Specialist, gdzie zajmuję się wsparciem technicznym oraz utrzymaniem
                                    infrastruktury. Wcześniej zdobywałem doświadczenie zawodowe jako stażysta back-end
                                    developer oraz młodszy specjalista IT.
                                </p>
                            </div>
                            <div className="section-education">
                                <h6>Wykształcenie</h6>
                                <p>10.2022 – obecnie Wyższa Szkoła Bankowa Merito, Informatyka, Front-end Developer</p>
                                <p>09.2021 – 04.2022 Liceum Ogólnokształcące Niepubliczne Nr 16</p>
                                <p>09.2017 – 06.2021 Technikum Łączności im. prof. dr inż. Janusza Groszkowskiego,
                                    Informatyka</p>
                            </div>
                            <div className="section-work-experience">
                                <h6>Doświadczenie zawodowe</h6>
                                <p>IT Specialist (02.2023 – obecnie, Nanovo | Warszawa)</p>
                                <p>Staż Back-end Developer (07.2024 – 08.2024, Nanovo | Warszawa)</p>
                                <p>Junior IT Specialist (04.2023 – 01.2024, Nanovo | Warszawa)</p>
                                <p>Monter Urządzeń Energoelektronicznych (08.2022 – 03.2023, TRUMPF Huettinger |
                                    Warszawa)</p>
                                <p>Sprzedawca/ Obsługa klienta (08.2021 - 05.2022, eobuwie.pl | Warszawa)</p>
                                <p>Praktyka Monter sieci telekomunikacyjnych (07.2020 - 08.2020, TP Teltech |
                                    Warszawa)</p>
                            </div>
                            <div className="section-language">
                                <h6>Znajomość języków</h6>
                                <p>Angielski - B2+ średnio zaawansowany</p>
                                <p>Polski - C2 ojczysty</p>
                            </div>
                            <div className="section-courses">
                                <h6>Szkolenia, kursy, certyfikaty</h6>
                                <p>CISCO | Programming Essentials in C++ (2020)</p>
                            </div>
                            <div className="section-skills ">
                                <h6>Umiejętności i mocne strony</h6>
                                <p>Prawo jazdy kategorii B</p>
                                <p>Znajomość budowy komputera mechanicznie jak i oprogramowania</p>
                                <p>Biegłość w posługiwaniu się Windows</p>
                                <p>Znajomość programów Microsoft Office</p>
                                <p>Determinacja, kreatywność, samodzielność i niezawodność</p>
                            </div>
                            <div className="section-profile">
                                <h6>Profil zawodowy</h6>
                                <p>Od małego jestem fanem wszelakich gier planszowych z wiekiem również gier
                                    komputerowych. Jako, że nie miałem dobrego komputera, zacząłem się interesować co
                                    można z nim software’owo zrobić, żeby go „ulepszyć”, tak zaczęła się moja pasja do
                                    informatyki. Był to początek rozwoju kolejnych zainteresowań takich jak grafika
                                    komputerowa czy też nauka języków programowania. Interesuję się również nowymi
                                    technologiami, a szczególnie wszystkim co związane z szeroko pojętym IT. Uwielbiam
                                    aktywnie spędzać wolny czas, wszelkiego rodzaju aktywność fizyczna jak basen,
                                    ścianka wspinaczkowa, siłownia czy wyjście ze znajomymi na piłkę nożną sprawia mi
                                    masę przyjemności.</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Project Modal */}
            {activeProject && (
                <>
                    <div className="modal-overlay" onClick={closeProjectModal}></div>
                    <button className="close-button-fixed" onClick={closeProjectModal}>
                        &times;
                    </button>
                    <div className="modal">
                        <div className="cv-container">
                            <h4>{activeProject.title}</h4>
                            <p>{activeProject.description}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;

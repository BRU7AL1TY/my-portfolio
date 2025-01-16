import React from 'react';

function Sidebar({ activeSection }) {
    const sections = [
        { id: 'home', title: 'Home' },
        { id: 'aboutme', title: 'About Me' },
        { id: 'projects', title: 'Projects' },
        { id: 'contact', title: 'Contact' },
    ];

    return (
        <nav className="sidebar">
            <ul>
                {sections.map((section, index) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            className={`dot ${activeSection === index ? 'active' : ''}`}
                        >
                            <div className="tooltip">{section.title}</div>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Sidebar;
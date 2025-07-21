// src/pages/Home.jsx
import { useState } from 'react';
import { cookies } from '../utils/cookies';
//import './Home.scss';

const Home = ({ data }) => {
  const [selectedSkill, setSelectedSkill] = useState(0); // First skill selected by default
  
  // Sort skills by order property, fallback to original array order
  const skills = data?.skills ? 
    [...data.skills].sort((a, b) => parseInt(a.order) - parseInt(b.order)) : 
    [];

  const handleSkillClick = (index) => {
    setSelectedSkill(index);
  };

  return (
    <>
      {/* Banner Section */}
      <div className="banner__container">
        <div className="banner__image--code"></div>
      </div>

      <div className="content">
        {/* About Section */}
        <div className="section__container">
          <div className="section__content">
            <h2 className="section__title" id="section-about">About</h2>
            <hr className="section__rule--about" />
            <div className="flex-content flex__small--alt">
              <div className="flex__small--12 flex__large--6">
                <p>
                  Technical leader throughout project life cycles with expertise in designing, 
                  implementing, documenting, and testing systems in an Agile environment.
                </p>
                <p>
                  Capable engineer who coorperates across disciplines to collaborate with designers 
                  and non-technical developers in order to optimize development workflows and enhance 
                  overall productivity.
                </p>
                <p>
                  Adaptive problem solver for fluid project scope and requirements with a focus on 
                  maintaining the integrity of the overall creative vision.
                </p>
              </div>
              <div className="flex__small--12 flex__large--6 center">
                <img 
                  className="banner__portrait" 
                  src="/app/img/profile-image.jpg" 
                  alt="Patrick Petrushonis"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coffee Banner */}
        <div className="banner__container banner__container--slim hide-on-mobile">
          <div className="banner__image--coffee"></div>
        </div>

        {/* Skills Section */}
        <div className="section__container">
          <div className="section__content">
            <h2 className="section__title" id="section-skills">Skills</h2>
            <hr className="section__rule--skills" />
            
            {/* Skills Navigation */}
            <div className="flex-content flex__small--alt">
              {skills.map((skill, index) => (
                <div key={skill.id} className="flex__small--3 skill__item">
                  <a 
                    className={`skill__link${index === selectedSkill ? ' selected' : ''}`}
                    href="javascript:void(0);"
                    onClick={() => handleSkillClick(index)}
                  >
                    <img 
                      src={`/app/img/skill-${skill.id}.svg`} 
                      className="skill__image"
                      alt={skill.title}
                    />
                  </a>
                </div>
              ))}
            </div>

            {/* Skills Details */}
            {skills.map((skill, index) => (
              <div 
                key={`details-${skill.id}`}
                id={`skill-${skill.id}`}
                className={`skill__details${index === selectedSkill ? ' selected' : ''}`}
              >
                <h3>{skill.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: skill.details }} />
              </div>
            ))}
          </div>        
        </div>

        {/* Space Banner */}
        <div className="banner__container banner__container--slim hide-on-mobile">
          <div className="banner__image--space"></div>
        </div>

        {/* Resume Section */}
        <div className="section__container">
          <div className="section__content">
            <h2 className="section__title" id="section-resume">Résumé</h2>
            <hr className="section__rule--resume" />

            <div className="flex-content">
              <div className="flex__small--12">
                <iframe 
                  className="center" 
                  src="/app/pdfs/PatrickPetrushonis-Resume.pdf" 
                  title="resume" 
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
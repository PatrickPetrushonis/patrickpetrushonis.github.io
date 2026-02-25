import { useState } from 'react';
//import { cookies } from '../utils/cookies';

const Home = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(0); // First project selected by default
  
  // Sort projects by order property, fallback to original array order
  const projects = data?.projects ? 
    [...data.projects].sort((a, b) => parseInt(a.order) - parseInt(b.order)) : 
    [];

  const handleProjectClick = (index) => {
    setSelectedProject(index);
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
                  Senior gameplay engineer with 5+ years shipping AAA titles including 
                  Life is Strange: Double Exposure, Palia, and Ashes of Creation. Expertise 
                  spans narrative systems, multiplayer networking, and performance optimization 
                  across PC, console, and mobile platforms.
                </p>
                <p>
                  Translates creative vision into production-ready C++ systems and Blueprint frameworks. 
                  Developed custom editor tools that accelerated content iteration workflows at Intrepid Studios, 
                  Singularity6, and Deck Nine Games.
                </p>
                <p>
                  Delivers under shifting production timelines while maintaining code quality standards. 
                  Experience ranges from intimate narrative adventures to large-scale MMORPGs with 
                  thousands of concurrent players.
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

        {/* Projects Section */}
        <div className="section__container">
          <div className="section__content">
            <h2 className="section__title" id="section-projects">Projects</h2>
            <hr className="section__rule--projects" />
            
            {/* Projects Navigation */}
            <div className="flex-content flex__small--alt">
              {projects.map((project, index) => (
                <div key={project.id} className="flex__small--3 project__item">
                  <button 
                    className={`project__link${index === selectedProject ? ' selected' : ''}`}
                    onClick={() => handleProjectClick(index)}
                  >
                    <img 
                      src={`/app/img/project-${project.id}.webp`} 
                      className="project__image"
                      alt={project.title}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Projects Details */}
            {projects.map((project, index) => (
              <div 
                key={`details-${project.id}`}
                id={`project-${project.id}`}
                className={`project__details${index === selectedProject ? ' selected' : ''}`}
              >
                <h3>{project.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: project.details }} />
              </div>
            ))}
          </div>        
        </div>   
      </div>
    </>
  );
};

export default Home;